'use babel';

import Registry from './registry';

export default {
  activate() {
    this.registry = new Registry()

    this.registry.on('did-add', ::this.beginTask);
    this.registry.on('did-remove', ::this.endTask);
  },

  consumeBusy(registry) {
    this.provider = registry;
  },

  providerRegistry() {
    return this.registry;
  },

  beginTask({title, priority}) {
    this.provider.begin(title, title);
  },

  endTask(title) {
    this.provider.end(title);
  }
};
