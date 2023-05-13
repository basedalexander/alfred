// Functions for searching
const semanticSearchPostTable = {
    name: "semanticSearchPostTable",
    args: "{searchTerm: str ,  extractVariables: list}",
    inputData: "",
    description: "This function takes a search string and a list of variables that need to be extracted for given search terms. It uses embeddings database to do the search and returns the rows that have high similarity wrt search term. Finally it keeps only the unique values for variables that we need to extract. The extract_variables can only take one of the following values ['content','post_id','profile_id','main_content_focus','language','block_timestamp','content_uri']",
    outputDescription: "List unique values of the variables to extract based on our semantic search criteria"
};



// Functions for getting data
const getSpecificInformationUsingGraphQL = {
    name: "getSpecificInformationUsingGraphQL",
    args: "{queryString: str}",
    inputData: "",
    description: "Takes a complex query and then uses ChatGPT to write GraphQL query for that. Fetches data based on that query from Lens Protocol.",
    outputDescription: "JSON object respresenting information resquested"
};

const getProfileInformation = {
    name: "getProfileInformation",
    args: "{profileId: str, informationRequired}",
    inputData: "",
    description: "Fetches information like bio, publications, comments, ownerships etc about a user profile from different data sources like Lens, Airstack and GraphQL",
    outputDescription: "JSON object respresenting profile information"
};

const getFollowersOfProfileId = {
    name: "getFollowersOfProfileId",
    args: "{profileId: str}",
    inputData: "",
    description: "Returns all the followers of a given Profile ID",
    outputDescription: "List of all the followers of the profile id"
};



// Functions for Filtering
const filterProfilesListByFollowers = {
    name: "filterFollowersOfProfileId",
    args: "{profileId: str, profilesList: []}",
    inputData: "",
    description: "This functions filters through profilesList to keep only those profile which follow profileId",
    outputDescription: "Profiles in profilesList that follow profileId"
};

const summarizeProfileData = {
    name: "summarizeProfileData",
    args: "{profileData: str}",
    inputData: "",
    description: "Gets a profile data in JSON format and asks chatGPT to summarizes it in detail and provide insights like what the user talks about and what kind of things he own etc.",
    outputDescription: "Human readable insigts about the provided profile data."
};





module.exports = [
    semanticSearchPostTable, 
    getSpecificInformationUsingGraphQL,
    getProfileInformation,
    getFollowersOfProfileId,
    filterProfilesListByFollowers,
    summarizeProfileData

    
]