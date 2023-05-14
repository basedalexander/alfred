async function summariseLensProfile(args) {

    // 1. Get lens profile by id
    const lensProfile = await lensProfileDatasource.getById(args);  



    // 2. Get all posts by lens profile id
    const posts = await postsDatasource.getByLensProfileId(args);
    

    // 3. Summarise all posts
    const summarisedPosts = summarisePosts(posts);
    
    // 4. Return summarised posts

}

module.exports = summariseLensProfile;