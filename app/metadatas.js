

// Call Embedding API endpoint to get relevant posts
// step 1: Call Embeddings endpoint to fetch data based on query parameters
const semanticSearchOverPosts = {
    name: "semanticSearchOverPosts",
    args: "{query: str , returnMetadataFields: list}",
    inputData: "",
    description: "Search for the posts with the most similar text content to the given query. `returnMetadataFields` is a list of fields that should be returned for each post: it can be any of ['content','post_id','profile_id','main_content_focus','language','block_timestamp','content_uri']",
    outputDescription: "Extracted data based on  semantic search criteria"
};


// Uses GraphQL to fetch complicated data from Lens Protocol GraphQL API
// step 1: Prompt LLM to generate GraphQL query string based on Lens Protocol documentation
// step 2: Call Lens protocol API to fetch the data based on graphQL query 
const getSpecificInformationUsingGraphQL = {
    name: "getSpecificInformationUsingGraphQL",
    args: "{queryString: str}",
    inputData: "",
    description: "Takes a complex query and then uses ChatGPT to write GraphQL query for that. Fetches data based on that query from Lens Protocol.",
    outputDescription: "JSON object respresenting information resquested"
};


// Get all the requested information about the profile
// step 1: Infer what  informations are required through informationRequired input (bio, followers, posts, comments, NFTs, Tokens etc)
// step 2: Query relevant API's like Lens, Airstack, TheGraph to fetch the data
// step 3: Compile all the received data into a list
// step 4 (optional): Ask LLM to consolidate all that information into a single JSON by promting it something like "There are some duplicate data, try to merge information etc etc"
const getProfileInformation = {
    name: "getProfileInformation",
    args: "{profileId: str, informationRequired: list}",
    inputData: "",
    description: "Fetches information like bio, publications, comments, ownerships etc about a user profile from different data sources like Lens, Airstack and GraphQL",
    outputDescription: "JSON object respresenting profile information"
};



// Uses LLM to summarize 
// step 1: Prompt LLM to summarize the input profileData, and ask it to generate useful insights  
// step 2: Returns the LLM output
const summarizeProfileData = {
    name: "summarizeProfileData",
    args: "{profileData: str}",
    inputData: "",
    description: "Prompts chatGPT to summarize profileData detail and provide insights like what the user talks about and what kind of things he own etc.",
    outputDescription: "Human readable insigts about the provided profile data."
};


// Uses LLM to filter 
// step 1: Prompt LLM to filter data based on given prompt and information sources
// step 2: Returns the LLM output
const filterLLM = {
    name: "filterLLM",
    args: "{informationSource1: str, informationSource2: str, filterCommand: str}",
    inputData: "",
    description: "Filters specific information from informationSource1 using data from informationSource2 based on filterCommands",
    outputDescription: "Filtered Data"
} 

// step 1: Keep only profile ids in profile_ids that are followers of profile_id
const keepOnlyFollowers = {
    name: "keepOnlyFollowers",
    args: "{profile_id: str , profile_ids: list}",
    inputData: "",
    description: "Filters to keep only profile ids in profile_ids that are followers of profile_id",
    outputDescription: "List of profile IDS filtered"
};


// step 1: Keep only profile ids in profile_ids that are being followed by profile_id
const keepOnlyFollowing = {
    name: "keepOnlyFollowing",
    args: "{profile_id: str , profile_ids: list}",
    inputData: "",
    description: "Filters to keep only profile ids in profile_ids that are being followed by profile_id",
    outputDescription: "List of profile IDS filtered"
};

// step 1: Keep only profile ids in profile_ids that are being followed by profile_id
const filterByValue = {
    name: "filterByValue",
    args: "{data: json , filter: string}",
    inputData: "",
    description: "Filters the data based on specific criteria",
    outputDescription: "List of data filtered"
};

const mds = [
    semanticSearchOverPosts, 
    getSpecificInformationUsingGraphQL,
    getProfileInformation,
    summarizeProfileData,
    filterLLM,
    keepOnlyFollowers,
    keepOnlyFollowing,
    filterByValue

];


// console.log(createPrompt(mds, "Give me all the people talking about longevity in the workplace"));
module.exports = mds;
