// Functions for searching
const semanticSearchPostTable = {
    name: "semanticSearchPostTable",
    args: "{searchTerm: str ,  extractVariables: list}",
    inputData: "",
    description: "This function takes a search string and a list of variables that need to be extracted for given search terms. It uses embeddings database to do the search and returns the rows that have high similarity wrt search term. Finally it keeps only the unique values for variables that we need to extract. The extract_variables can only take one of the following values ['content','post_id','profile_id','main_content_focus','language','block_timestamp','content_uri']",
    outputDescription: "List unique values of the variables to extract based on our semantic search criteria"
};



// Functions for getting data
const getInformationFromLens = {
    name: "getInformationFromLens",
    args: "{queryString: str}",
    inputData: "",
    description: "This function takes a query string and asks chatGPT to create a GraphQL query based on human language query. After that, it executes that query to fetch results from lens protocol.",
    outputDescription: "JSON object respresenting information resquested"
};

const getProfileInformationFromLens = {
    name: "getProfileInformationFromLens",
    args: "{profileId: str, informationRequired}",
    inputData: "",
    description: "This function takes a lens profile ID or address, and information required and then gets information required from all the information available about that profile on the lens protocol.",
    outputDescription: "JSON object respresenting profile information"
};

const getProfileInformationFromAirstack = {
    name: "getProfileInformationFromAirstack",
    args: "{profileId: str, informationRequired}",
    inputData: "",
    description: "This function takes a lens profile ID or address , and information required and then gets information required from all the information available about that profile on the airstack.",
    outputDescription: "JSON object respresenting profile information"
};

const getProfileInformationFromTheGraph = {
    name: "getProfileInformationFromTheGraph",
    args: "{profileId: str, informationRequired}",
    inputData: "",
    description: "This function takes a lens profile ID or address, and information required and then gets information required from all the information available about that profile on the the graph protocol.",
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
const filterFollowersOfProfileId = {
    name: "filterFollowersOfProfileId",
    args: "{profileId: str, listOfProfiles: []}",
    inputData: "",
    description: "This functions filters through listOfProfiles to keep only those profile which follow profileId",
    outputDescription: "Profiles that follow profileId"
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
    getInformationFromLens,
    getProfileInformationFromLens,
    getProfileInformationFromAirstack,
    getProfileInformationFromTheGraph,
    getFollowersOfProfileId,
    filterFollowersOfProfileId,
    summarizeProfileData,
    
]