const ProfileDatasource = require('../datasources/profile.datasource');
const PublicationDatasource = require('../datasources/publications.datasource');
const OpenAI = require('../commands-compositor/open-ai-service');
const profileDatasource = new ProfileDatasource();
const publicationsDatasource = new PublicationDatasource();
require('dotenv').config();
const openai = new OpenAI(process.env.OPENAI_API_KEY);

function generateSummaryPrompt(posts, profile) {
    return `
    Based on the following list of posts by this profile, give me your 
    best guess as to what this lens profile is about and summarise all the
    information about it.
    
    Profile: ${JSON.stringify(profile)}

    Posts:
    ${posts}

    `;

}

function collectPosts(posts) {
    const result = [];
    for (let i = 0; i < posts.length; i++) {
        result.push(posts[i].metadata.content);
    }
    return result.join('\n\n');
}

async function summariseLensProfile(args) {
    // 1. Get lens profile by id
    const lensProfile = await profileDatasource.getByHandle(args.profileHandle);  

    let prof = lensProfile.data.profile;

    // 2. Get all posts by lens profile id
    const posts = await publicationsDatasource.getByIdsGraphQL(prof.id);

    let post_text = collectPosts(posts);

    const prompt = generateSummaryPrompt(post_text, lensProfile);
    const result = await openai.ask(prompt);
    return result;
}

// summariseLensProfile({ "profileHandle": "stani.lens" })

module.exports = summariseLensProfile;