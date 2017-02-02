/**
* Singleton service to provide the settings data
*/

import {AsyncStorage, } from 'react-native';

let instance = null;
const asyncStoreName = 'EstimAppSettings';

export default class SettingsStore {
  constructor() {
    this.asyncStorage = AsyncStorage;
    this.store = {
      username: null,
      apiKey: null,
    }
    this._readValue('username');
    this._readValue('apiKey');
  }

  static get instance() {
    if (!instance) {
      instance = new SettingsStore();
    }
    return instance;
  }

  /**
  * Write value to persistant store and also set on state
  *
  * @param {string} key
  * @param {object} value
  *
  */
  async _setValue(key, value) {
    try {
      this.store[key] = value;
      await this.asyncStorage.setItem('@' + asyncStoreName + ':' + key, value);
    } catch (error) {
      console.warn('Error saving data:', error);
    }
  }

  /**
  * Read value from persistant store
  *
  * @param {string} key - name of the param to read
  */
  async _readValue(key) {
    console.log('this.asyncStorage: ', this.asyncStorage);
    console.log('this.asyncStorage.getItem: ', this.asyncStorage.getItem);
    try {
      const value = await this.asyncStorage.getItem('@' + asyncStoreName + ':' + key);
      if (value !== null){
        // We have data!!
        this.store[key] = value;
      }
      return value;
    } catch (error) {
      console.warn('Error retrieving data - key:', key, 'error: ', error);
    }
  }
}
