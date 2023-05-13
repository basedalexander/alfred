import { LensClient, development } from "@lens-protocol/client";

const lensClient = new LensClient({
  environment: development
});

class ProfileDatasource {
    async getById (id) {
        return await lensClient.profile.fetch({
            profileId: id
        });
    }

    async getByHandle (handle) {
        return await lensClient.profile.fetch({
            handle: handle
        })
    }
}

module.exports = { ProfileDatasource }