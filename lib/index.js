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
    console.log("begin"+title);
    this.tasks.push(title);
    this.provider.begin(title, title);
  },

  endTask(title) {
    console.log("end"+title);
    this.provider.end(title);
  },

  clear() {
    console.log("clear");
    console.log(this.tasks);
    for (task of this.tasks) {
      this.endTask(task);
    }

    this.tasks = [];
  }
};
