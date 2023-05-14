const { LensClient, development } = require("@lens-protocol/client");
const { ApolloClient, InMemoryCache, gql } = require('@apollo/client');


const API_URL = 'https://api.lens.dev'
    const client = new ApolloClient({
        uri: API_URL,
        cache: new InMemoryCache()
})

const lensClient = new LensClient({
  environment: development
});

const EMBEDDING_DB_SERVICE_ENDPOINT = 'http://15.236.137.230:5555/search';

class PublicationsDatasource {
    // embeddings call
    // @params: { query: string, limit: number, metadata: array https://docs.trychroma.com/usage-guide }
    async getByQuery(params) {
        const result = await fetch(EMBEDDING_DB_SERVICE_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const foundResult = res.json();
        return foundResult;
    }
    
    async getByAuthor(handle) {
        const pubRequestObj = {};
        return await lensClient.publication.fetchAll(pubRequestObj);
    }

    async getByProfileId(id) {
        // todo implement
        const pubRequestObj = {
            profileId: id
        };
        return await lensClient.publication.fetchAll(pubRequestObj);
    }

    async getByIds(ids) {
        const pubRequestObj = {
            profileIds: ids
        };
        return await lensClient.publication.fetchAll(pubRequestObj);
    }

    async getByIdsGraphQL(profileId) {
        const queryStr = `
        query Publications ($profileId: ProfileId!){
            publications(request: {
              profileId: $profileId,
              publicationTypes: [POST, COMMENT, MIRROR],
              limit: 50
            }) {
              items {
                __typename 
                ... on Post {
                  ...PostFields
                }
                ... on Comment {
                  ...CommentFields
                }
                ... on Mirror {
                  ...MirrorFields
                }
              }
              pageInfo {
                prev
                next
                totalCount
              }
            }
          }
          
          fragment MediaFields on Media {
            url
            mimeType
          }
          
          fragment ProfileFields on Profile {
            id
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
            followNftAddress
            metadata
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
            hidden
            reaction(request: null)
            hasCollectedByMe
          }
          
          fragment MirrorFields on Mirror {
            ...MirrorBaseFields
            mirrorOf {
             ... on Post {
                ...PostFields          
             }
             ... on Comment {
                ...CommentFields          
             }
            }
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
          
    `;

    const query = gql(queryStr);
    const response = await client.query({ query: query, variables: { profileId } });
    return response.data.publications.items;
    }
}

module.exports = PublicationsDatasource;