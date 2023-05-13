class CommandRegistry {
    registry = [];

    register(func, metadata) {
        this.registry.push({
            func,
            metadata
        });
    }

    getAllMetadatas() {
        return this.registry.map(r => r.metadata);
    }

    getFuncByName(name) {
        const registryData = this.registry.find(r => r.metadata.name === name);
        return registryData.func;
    }
}

const registry = new CommandRegistry();

module.exports = registry;