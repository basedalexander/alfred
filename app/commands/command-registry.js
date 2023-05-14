class CommandRegistry {
    registry = [];

    register(func) {
        this.registry.push({
            func
        });
    }

    getAllFuncNames() {
        return this.registry.map(r => r.func.name);
    }

    getFuncByName(name) {
        const registryData = this.registry.find(r => r.func.name === name);
        return registryData.func;
    }
}

const registry = new CommandRegistry();

module.exports = registry;