import { LensClient, development } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: development
});

class FollowersDatasource {
    // if using a handle, requires a profile ID.
    async get(profileId) {
        return await lensClient.profile.allFollowers({
            profileId: profileId,
        });
    }
}

module.exports = { FollowersDatasource }
