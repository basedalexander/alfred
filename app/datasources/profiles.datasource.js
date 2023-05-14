const { LensClient, development } = require("@lens-protocol/client");

const lensClient = new LensClient({
  environment: development
});

class ProfilesDatasource {
    async getByIds (ids) {
        return await lensClient.profile.fetchAll({
            profileIds: ids
          });
    }

    async getByHandles (handles) {
        return await lensClient.profile.fetchAll({
            handles: handles
        });
    }
}

module.exports = ProfilesDatasource;