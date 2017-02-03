import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
} from 'react-native';
import SettingsStore from '../services/settingsStore';
import DbConnector from '../services/dbConnector';

export default class SettingsScene extends Component {
  constructor(props) {
    super(props);
    this.settingsStore = SettingsStore.instance;
    this.state = {
      username: '',
      apiKey: '',
    };
    this._refreshStateFor('username');
    this._refreshStateFor('apiKey');
  }


  /**
  * Merge the key/value combination into the current state
  *
  * @param {string} key
  * @param {object} value
  */
  _setState(key, value) {
    let obj = {};
    obj[key] = value;
    this.setState(obj);
  }

  /**
  * Get the value from persistant settings store
  *
  * {string} key
  *
  */
  _refreshStateFor(key) {
    this
      .settingsStore
      ._readValue(key)
      .then(value => this._setState(key, value));
  }

  /**
  * Write value to persistant settings store and also set on state
  *
  * {string} key
  * {object} value
  *
  */
  _setValue(key, value) {
    this._setState(key, value);
    this.settingsStore._setValue(key, value);
  }

  render() {
    return (
      <View>
        <Text>
          Username:
        </Text>
        <TextInput
          onChangeText={(username) => this._setValue('username', username)}
          value={this.state.username}
        />
        <Text>
          API Key:
        </Text>
        <TextInput
          onChangeText={(key) => this._setValue('apiKey', key)}
          value={this.state.apiKey}
        />
        <Button
          title='Refresh DB connection'
          onPress={DbConnector.reset}
        />
      </View>
    );
  }
}
