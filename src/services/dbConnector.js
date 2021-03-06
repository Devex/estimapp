/**
* Singleton service to provide access to the PouchDB database
*/

import PouchDB from 'pouchdb-react-native';
import SettingsStore from './settingsStore';

let instance = null;
let singletonEnforcer = null;
let isSetUp = false;

export default class DbConnector {
  constructor(enforcer) {
    if (enforcer || enforcer !== singletonEnforcer) {
      throw 'Use `SettingsStore.instance` to get the object instance';
    }
    singletonEnforcer = 'instantiated';
    this._setup();
    this.readCallbacks = [];
  }

  /**
  * Method to retrieve or instantiate the singleton object
  */
  static get instance() {
    if (!instance) {
      instance = new DbConnector(singletonEnforcer);
    }
    return instance;
  }

  /**
  * Reset the singleton instance, used when api  changes
  */
  static async reset() {
    isSetUp = false;
    try {
      await instance._setup();
    } catch (error) {
      console.warn('Error resetting the DB connection: ', error);
    }
  }

  async _setup() {
    if (isSetUp) {return};
    isSetUp = true;
    const cloudantAccount = 'nicolas-fricke';
    const dbUser = 'seentablacdouggaideptere';
    const dbKey = await SettingsStore.instance._readValue('apiKey');
    if (!dbKey || dbKey === '') {
      return;
    };
    const dbUrl = 'https://' + dbUser +  ':' + dbKey + '@' + cloudantAccount +
                  '.cloudant.com/estimapp';

    this.db = new PouchDB('estimapp');
    this.remoteDb = new PouchDB(dbUrl);


    try {
      this.db.sync(this.remoteDb, {live: true, retry: true});

      this
        .db
        .changes({live: true, include_docs: true})
        .on('change', this.read.bind(this));
    } catch (error) {
      console.warn('Error setting up DB sync: ', error);
    }
  }

  /**
  * Register a callback that gets triggered on a certain event
  *
  * Supported events:
  *   - 'read', triggers `callback(votes)` after each `read` operation
  *
  * @param {string} eventName
  * @param {function} callback
  */
  on(eventName, callback) {
    if (eventName !== 'read') {
      throw 'Event "' + eventName + '" is not supported';
    }
    this.readCallbacks.push(callback);
  }

  /**
  * Write a vote to the DB
  *
  * @param {string} username
  * @param {string} vote
  * @async
  */
  async write(vote) {
    const username = SettingsStore.instance.store.username;
    const voteDoc = {
      'username': username,
      'vote': vote,
      'createdAt': new Date()
    };
    try {
      await this._setup();
      let result = await this.db.post(voteDoc);
      this.read();
    } catch (error) {
      throw error
      console.warn('Error writing record (', voteDoc, ') to DB: ', error);
    }
  }

  /**
  * Read all votes from DB
  *
  * @async
  * @returns {Array<object>}
  */
  async read() {
    try {
      await this._setup();
      let dbResult = await this.db.allDocs({include_docs : true});
      let votes = dbResult.rows.map(row => row.doc);
      this.readCallbacks.forEach((callback) => callback(votes));
      return votes;
    } catch (error) {
      console.warn('Error reading from DB: ', error);
    }
  }

  /**
  * Remove one vote from the DB
  *
  * @param {object} vote - vote object which has to have an _id
  * @async
  */
  async remove(vote) {
    try {
      await this._setup();
      let result = await this.db.remove(vote)
      this.read();
    } catch (error) {
      console.warn('Error removing vote "', vote, '" from DB: ', error);
    }
  }

  /**
  * Delete all votes from DB
  */
  async flush() {
    try {
      let votes = await this.read();
      votes.forEach((vote) => this.remove(vote));
    } catch (error) {
      console.warn('Error flushing all votes:', error);
    }
  }
}
