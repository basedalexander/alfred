const Publication = require('../datasources/publications-datasource');
const pub = new Publication();

const POST_TEMPLATE = `**{title}**`.format(title)

function createPostTemplate(publication) {
    const template = `
        ${publication.page_content}
        by ${publication.profile_id} at ${publication.block_timestamp}
    `;
    return template;
}

async function getPostsByContentAndType(args) {
    let pubs = await pub.getByQuery(args);
    let result = [];
    for (let i = 0; i < pubs.length; i++) {
        result.push(createPostTemplate(pubs[i]));
    }
    // join all posts
    result = result.join('\n\n');
    return result;
}

module.exports = getPostsByContentAndType;