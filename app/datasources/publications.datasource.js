import { LensClient, development } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: development
});

const EMBEDDING_DB_SERVICE_ENDPOINT = 'http://15.236.137.230:5555/search';


class PublicationsDatasource {
    // embeddings call
    // @params: { query: string, limit: number, metadata: array https://docs.trychroma.com/usage-guide }
    async getByQuery(params) {
        const result = await fetch(EMBEDDING_DB_SERVICE_ENDPOINT, {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const foundResult = res.json();
        return foundResult;
    }
    
    async getByAuthor(handle) {
        const pubRequestObj = {};
        return await lensClient.publication.fetchAll(pubRequestObj);
    }

    async getByProfileId(id) {
        // todo implement
        const pubRequestObj = {
            profileId: id
        };
        return await lensClient.publication.fetchAll(pubRequestObj);
    }

    async getByIds(ids) {
        const pubRequestObj = {
            profileIds: ids
        };
        return await lensClient.publication.fetchAll(pubRequestObj);
    }
}

module.exports = { PublicationsDatasource }