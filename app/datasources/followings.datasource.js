const { LensClient, development } = require("@lens-protocol/client");

const lensClient = new LensClient({
  environment: development
});

class FollowingsDatasource {
    // if using a handle, requires a profile ID.
    async get(profileId) {
        return await lensClient.profile.allFollowing({
            address: profileId
        });
    }
}

module.exports = { FollowingsDatasource }