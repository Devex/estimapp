import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class  GoBack extends Component {
  render() {
    return (
      <TouchableHighlight onPress={() => this._goBack()}>
        <Text>Go to Settings</Text>
      </TouchableHighlight>
    );
  }

  _goBack() {
    this.props.sceneSetter.current('Settings');
  }
}
