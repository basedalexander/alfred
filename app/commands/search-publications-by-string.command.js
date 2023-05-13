export const semantic_search_post_table = {
    name: "semantic_search_post_table",
    args: "{search_term: str ,  extract_variables: list}",
    inputData: "",
    description: "This function takes a search string and a list of variables that need to be extracted for given search terms. It uses embeddings database to do the search and returns the rows that have high similarity wrt search term. Finally it keeps only the unique values for variables that we need to extract. The extract_variables can only take one of the following values ['content','post_id','profile_id','main_content_focus','language','block_timestamp','content_uri']",
    outputDescription: "List unique values of the variables to extract based on our semantic search criteria"
};

export const get_information_from_lens = {
    name: "get_information_from_lens",
    args: "{query_string: str}",
    inputData: "",
    description: "This function takes a query string and asks chatGPT to create a GraphQL query based on human language query. After that, it executes that query to fetch results from lens protocol.",
    outputDescription: "JSON object respresenting information resquested"
};

export const get_profile_information_from_lens = {
    name: "get_profile_information_from_lens",
    args: "{profile_id: str, information_required}",
    inputData: "",
    description: "This function takes a lens profile ID or address, and information required and then gets information required from all the information available about that profile on the lens protocol.",
    outputDescription: "JSON object respresenting profile information"
};

export const get_profile_information_from_airstack = {
    name: "get_profile_information_from_airstack",
    args: "{profile_id: str, information_required}",
    inputData: "",
    description: "This function takes a lens profile ID or address , and information required and then gets information required from all the information available about that profile on the airstack.",
    outputDescription: "JSON object respresenting profile information"
};

export const get_profile_information_from_the_graph = {
    name: "get_profile_information_from_the_graph",
    args: "{profile_id: str, information_required}",
    inputData: "",
    description: "This function takes a lens profile ID or address, and information required and then gets information required from all the information available about that profile on the the graph protocol.",
    outputDescription: "JSON object respresenting profile information"
};


