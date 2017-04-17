'use babel';

import Registry from './registry';

export default {
  activate() {
    this.registry = new Registry();
    this.tasks = [];

    this.registry.on('did-add', ::this.beginTask);
    this.registry.on('did-remove', ::this.endTask);
    this.registry.on('did-clear', ::this.clear);
  },

  consumeBusy(registry) {
    this.provider = registry;
  },

  providerRegistry() {
    return this.registry;
  },

  beginTask({title, priority}) {
    this.tasks.push(title);
    this.provider.begin(title, title);
  },

  endTask(title) {
    this.provider.end(title);
  },

  clear() {
    for (task of this.tasks) {
      this.endTask(task);
    }

    this.tasks = [];
  }
};
