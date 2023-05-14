const analyseLensProfileTopics = require('./analytise-lens-profile-topics');
const getPostsByContent = require('./get-posts-by-content');
const getPostsByContentAndType = require('./get-posts-by-content-type');
const summariseLensProfile = require('./summarise-lens-profile');

module.exports.commandFunctions = [
    analyseLensProfileTopics,
    getPostsByContent,
    getPostsByContentAndType,
    summariseLensProfile
]