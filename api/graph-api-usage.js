return async function () {
    const hashtags = params.hashtags;

    const API_URL = 'https://api.lens.dev'
    const client = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache()
    })

    const queryStr = `
    query Search ($searchStr: Search!){
        search(request: {
          query: $searchStr,
          type: PUBLICATION,
          limit: 10
        }) {
          ... on PublicationSearchResult {
             __typename 
            items {
              __typename 
              ... on Comment {
                ...CommentFields
              }
              ... on Post {
                ...PostFields
              }
            }
            pageInfo {
              prev
              totalCount
              next
            }
          }
          ... on ProfileSearchResult {
            __typename 
            items {
              ... on Profile {
                ...ProfileFields
              }
            }
            pageInfo {
              prev
              totalCount
              next
            }
          }
        }
      }
      
      fragment MediaFields on Media {
        url
        mimeType
      }
      
      fragment MirrorBaseFields on Mirror {
        id
        profile {
          ...ProfileFields
        }
        stats {
          ...PublicationStatsFields
        }
        metadata {
          ...MetadataOutputFields
        }
        createdAt
        collectModule {
          ...CollectModuleFields
        }
        referenceModule {
          ...ReferenceModuleFields
        }
        appId
      }
      
      fragment ProfileFields on Profile {
        profileId: id,
        name
        bio
        attributes {
           displayType
           traitType
           key
           value
        }
        isFollowedByMe
        isFollowing(who: null)
        metadataUrl: metadata
        isDefault
        handle
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              ...MediaFields
            }
          }
        }
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              ...MediaFields
            }
          }
        }
        ownedBy
        dispatcher {
          address
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ...FollowModuleFields
        }
      }
      
      fragment PublicationStatsFields on PublicationStats { 
        totalAmountOfMirrors
        totalAmountOfCollects
        totalAmountOfComments
        totalUpvotes
        totalDownvotes
      }
      
      fragment MetadataOutputFields on MetadataOutput {
        name
        description
        content
        media {
          original {
            ...MediaFields
          }
        }
        attributes {
          displayType
          traitType
          value
        }
      }
      
      fragment Erc20Fields on Erc20 {
        name
        symbol
        decimals
        address
      }
      
      fragment PostFields on Post {
        id
        profile {
          ...ProfileFields
        }
        stats {
          ...PublicationStatsFields
        }
        metadata {
          ...MetadataOutputFields
        }
        createdAt
        collectModule {
          ...CollectModuleFields
        }
        referenceModule {
          ...ReferenceModuleFields
        }
        appId
        hidden
        reaction(request: null)
        mirrors(by: null)
        hasCollectedByMe
      }
      
      fragment CommentBaseFields on Comment {
        id
        profile {
          ...ProfileFields
        }
        stats {
          ...PublicationStatsFields
        }
        metadata {
          ...MetadataOutputFields
        }
        createdAt
        collectModule {
          ...CollectModuleFields
        }
        referenceModule {
          ...ReferenceModuleFields
        }
        appId
        hidden
        reaction(request: null)
        mirrors(by: null)
        hasCollectedByMe
      }
      
      fragment CommentFields on Comment {
        ...CommentBaseFields
        mainPost {
          ... on Post {
            ...PostFields
          }
          ... on Mirror {
            ...MirrorBaseFields
            mirrorOf {
              ... on Post {
                 ...PostFields          
              }
              ... on Comment {
                 ...CommentMirrorOfFields        
              }
            }
          }
        }
      }
      
      fragment CommentMirrorOfFields on Comment {
        ...CommentBaseFields
        mainPost {
          ... on Post {
            ...PostFields
          }
          ... on Mirror {
             ...MirrorBaseFields
          }
        }
      }
      
      fragment FollowModuleFields on FollowModule {
        ... on FeeFollowModuleSettings {
          type
          amount {
            asset {
              name
              symbol
              decimals
              address
            }
            value
          }
          recipient
        }
        ... on ProfileFollowModuleSettings {
          type
          contractAddress
        }
        ... on RevertFollowModuleSettings {
          type
          contractAddress
        }
        ... on UnknownFollowModuleSettings {
          type
          contractAddress
          followModuleReturnData
        }
      }
      
      fragment CollectModuleFields on CollectModule {
        __typename
        ... on FreeCollectModuleSettings {
          type
          followerOnly
          contractAddress
        }
        ... on FeeCollectModuleSettings {
          type
          amount {
            asset {
              ...Erc20Fields
            }
            value
          }
          recipient
          referralFee
        }
        ... on LimitedFeeCollectModuleSettings {
          type
          collectLimit
          amount {
            asset {
              ...Erc20Fields
            }
            value
          }
          recipient
          referralFee
        }
        ... on LimitedTimedFeeCollectModuleSettings {
          type
          collectLimit
          amount {
            asset {
              ...Erc20Fields
            }
            value
          }
          recipient
          referralFee
          endTimestamp
        }
        ... on RevertCollectModuleSettings {
          type
        }
        ... on TimedFeeCollectModuleSettings {
          type
          amount {
            asset {
              ...Erc20Fields
            }
            value
          }
          recipient
          referralFee
          endTimestamp
        }
        ... on UnknownCollectModuleSettings {
          type
          contractAddress
          collectModuleReturnData
        }
      }
      
      fragment ReferenceModuleFields on ReferenceModule {
        ... on FollowOnlyReferenceModuleSettings {
          type
          contractAddress
        }
        ... on UnknownReferenceModuleSettings {
          type
          contractAddress
          referenceModuleReturnData
        }
        ... on DegreesOfSeparationReferenceModuleSettings {
          type
          contractAddress
          commentsRestricted
          mirrorsRestricted
          degreesOfSeparation
        }
      }
    `
    
    const query = gql(queryStr);

    // 2. create array result []
    const searchPromises = [];

    // 3. for each word in the params - conduct a search and append results into "result" array.
    hashtags.forEach(hashtag => {
        const promise = client.query({
            query: query,
            variables: {
                searchStr: hashtag
            }
        })
        searchPromises.push(promise);
    });

    function sortByDate(arr) {
        return arr.sort((a, b) => {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
      }

    const searchResults = await Promise.all(searchPromises);
    const itemsArrays = searchResults.map(r => r.data.search.items);
    // join publications together
    let result = [];

    itemsArrays.forEach(array => {
        result = result.concat(array);
    });

    // sort by "createdAt" field
    const sortedResult = sortByDate(result);
    
    return sortedResult;
}
