function renderDictTable(data) {
  if (!data || data.length === 0) {
    return '';
  }

  const headers = ['Token Type', 'Token Name', 'Image'];
  const headerRow = '| ' + headers.join(' | ') + ' |';
  const separatorRow = '| ' + headers.map(() => '---').join(' | ') + ' |';

  const dataRows = data.map(item => {
    const tokenType = item.tokenType;
    const tokenName = item.tokenNfts.token.name;
    const imageUrl = item.tokenNfts.contentValue.image ? item.tokenNfts.contentValue.image.original : '';

    return `| ${tokenType} | ${tokenName} | [Image](${imageUrl}) |`;
  });

  const markdownTable = [headerRow, separatorRow, ...dataRows].join('\n');
  return markdownTable;
}



async function getTokenBalances(args) {
    const profileHandle = args.profileHandle;
    const query = `
    query staniLensSocialsAndNFTs {
        Wallet(input: {identity: "${profileHandle}", blockchain: polygon}) {
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
  
    const data = await response.json();
    const markdownTable = renderDictTable(data.data.Wallet.tokenBalances);
      
    return markdownTable;
}

// getTokenBalances('stani.lens').then((result) => {
//     console.log(result); 
//   });

module.exports = [getTokenBalances];


