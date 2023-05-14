const { LensClient, development } = require("@lens-protocol/client");

const lensClient = new LensClient({
  environment: development
});

function checkStringEndsWithLens(str) {
    return str.endsWith('.lens');
  }

class ProfileDatasource {
    async getByIdOrHandle(ioh) {
        if (checkStringEndsWithLens(ioh)) {
            return await this.getByHandle(ioh);
        } else {
            return await this.getById(ioh);
        }
    }

    async getById (id) {
        return await lensClient.profile.fetch({
            profileId: id
        });
    }

    async getByHandle(handle) {
        return await lensClient.profile.fetch({
            handle: handle
        })
    }
}

module.exports = ProfileDatasource ;