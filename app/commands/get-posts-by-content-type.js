const Publication = require('../datasources/publications.datasource');
const pub = new Publication();

function createPostTemplate(publication) {
    const template = `${publication.page_content.trim()}
   (by ${publication.metadata.profile_id} at ${publication.metadata.block_timestamp})`;
    return template;
}

async function getPostsByContent(args) {
    let pubs = await pub.getByQuery(args);
    let result = [];
    for (let i = 0; i < pubs.length; i++) {
        result.push(createPostTemplate(pubs[i]));
    }

    result = result.join('\n-----------------------\n');
    return result;
}

function getPostsByContentAndType(args) {
    return getPostsByContent(args);
}

// getPostsByContentAndType({ "query": "posts about space", "type": "video"})


module.exports = [getPostsByContent, getPostsByContentAndType];