/**
* Singleton service to provide the settings data
*/

import {AsyncStorage, } from 'react-native';

let instance = null;
let singletonEnforcer = null;
const asyncStoreName = 'EstimAppSettings';

export default class SettingsStore {
  constructor(enforcer) {
    if (enforcer || enforcer !== singletonEnforcer) {
      throw 'Use `SettingsStore.instance` to get the object instance';
    }
    singletonEnforcer = 'instantiated';
    this.store = {
      username: null,
      apiKey: null,
    }
    this._readValue('username');
    this._readValue('apiKey');
  }

  /**
  * Method to retrieve or instantiate the singleton object
  */
  static get instance() {
    if (!instance) {
      instance = new SettingsStore(singletonEnforcer);
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
      await AsyncStorage.setItem('@' + asyncStoreName + ':' + key, value);
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
    try {
      const value = await AsyncStorage.getItem('@' + asyncStoreName + ':' + key);
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
