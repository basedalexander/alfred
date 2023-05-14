const ProfileDatasource = require('../datasources/profile.datasource');
const PublicationDatasource = require('../datasources/publications.datasource');
const OpenAI = require('../commands-compositor/open-ai-service');
const profileDatasource = new ProfileDatasource();
const pub = new PublicationDatasource();
const openai = new OpenAI("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");


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
        result.push(posts[i].page_content);
    }
    return result.join('\n\n');
}

async function summariseLensProfile(args) {

    console.log(args);
    // 1. Get lens profile by id
    const lensProfile = await profileDatasource.getByHandle(args.profileHandle);  

    let prof = lensProfile.data.profile;
    console.log(prof);


    // 2. Get all posts by lens profile id
    const posts = await pub.getByIds([prof.id]);
    let post_text = collectPosts(posts);
    console.log(post_text);

    // 3. Generate prompt based on posts
    const prompt = generateSummaryPrompt(post_text, lensProfile);
    const result = await openai.ask(prompt);
    console.log(result);
    // 4. Return summarised posts

}

summariseLensProfile({ "profileHandle": "stani.lens" })

module.exports = summariseLensProfile;