import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import VoteScene from './voteScene';
import SettingsScene from './settingsScene'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { scene: 'Settings' };
  }
  render() {
    if (this.state.scene == 'Vote')
      return (<VoteScene />);
    else
      return (<SettingsScene />);
  }
}

