'use babel';

import Provider from './provider';

import EventEmitter from 'events';

export default class Registry extends EventEmitter{
  constructor() {
    super();
  }

  // Public method
  create(): Provider {
    const provider = new Provider()

    provider.onDidAdd((status) => {
      this.emit('did-add', status);
    })

    provider.onDidRemove((title) => {
      this.emit('did-remove', title);
    })

    provider.onDidClear(() => {
      this.emit('did-clear');
    })

    return provider
  }
}
