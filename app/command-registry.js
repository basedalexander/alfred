class CommandRegistry {
    registry = [];

    register(func, metadata) {
        this.register.push({
            func,
            metadata
        });
    }

    getAllMetadatas() {
        return this.registry.map(r => r.metadata);
    }

    getFuncByName(name) {
        const func = this.registry.find(r => r.metadata.name === name);
        return func;
    }
}

export const registry = new CommandRegistry();