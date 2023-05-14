
async function getTokenBalances(identity) {
    const query = `
    query staniLensSocialsAndNFTs {
        Wallet(input: {identity: "${identity}", blockchain: polygon}) {
          socials {
            dappName
            profileName
          }
          tokenBalances {
            tokenType
            tokenNfts {
              contentValue {
                image {
                  original
                  extraSmall
                  large
                  medium
                  small
                }
              }
              token {
                name
              }
            }
          }
        }
      }
    `;
    
    const response = await fetch('https://api.airstack.xyz/gql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', "authorization":"98074c673ecb4aafb7d623c37fc5ba51"},
        body: JSON.stringify({query: query, variables: {limit: 10,offset: 0}})
      });
      
      return JSON.stringify(await response.json());
}

getTokenBalances('stani.lens').then((result) => {
    console.log(result); 
  });

module.exports = [getTokenBalances];


