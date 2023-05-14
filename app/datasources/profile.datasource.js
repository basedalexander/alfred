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

function checkStringEndsWithLens(str) {
    return str.endsWith('.lens');
  }

class ProfileDatasource {
    async getByIdOrHandle(ioh) {
        if (checkStringEndsWithLens(ioh)) {
            return await this.getByHandle(ioh);
        } else {
            return await this.getById(ioh);
        }
    }

    async getById (id) {
        return await lensClient.profile.fetch({
            profileId: id
        });
    }

    async getByHandle(handle) {
        // return await lensClient.profile.fetch({
        //     handle: handle
        // })

        return await getProfileByHandleGraphQl(handle);
    }
}

async function getProfileByHandleGraphQl (handle) {
    const queryStr = `
    query Profile($handle: Handle!){
        profile(request: { handle: $handle }) {
          id
          name
          bio
          attributes {
            displayType
            traitType
            key
            value
          }
          followNftAddress
          metadata
          isDefault
          picture {
            ... on NftImage {
              contractAddress
              tokenId
              uri
              verified
            }
            ... on MediaSet {
              original {
                url
                mimeType
              }
            }
            __typename
          }
          handle
          coverPicture {
            ... on NftImage {
              contractAddress
              tokenId
              uri
              verified
            }
            ... on MediaSet {
              original {
                url
                mimeType
              }
            }
            __typename
          }
          ownedBy
          dispatcher {
            address
            canUseRelay
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
            ... on FeeFollowModuleSettings {
              type
              amount {
                asset {
                  symbol
                  name
                  decimals
                  address
                }
                value
              }
              recipient
            }
            ... on ProfileFollowModuleSettings {
              type
            }
            ... on RevertFollowModuleSettings {
              type
            }
          }
        }
      }
    `;

    const query = gql(queryStr);
    const response = await client.query({ query: query, variables: { handle } });
    return response;
}

module.exports = ProfileDatasource;