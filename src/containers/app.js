import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import VoteScene from './voteScene';
import ResultsScene from './resultsScene'
import SettingsScene from './settingsScene';
import SettingsStore from '../services/settingsStore';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { scene: 'Settings' };
    this.sceneSetter = new SceneSetter(this);
  }

  render() {
    if (this.state.scene == 'Vote')
      return (<VoteScene sceneSetter={this.sceneSetter}/>);
    else if (this.state.scene == 'Results')
      return (<ResultsScene sceneSetter={this.sceneSetter}/>);
    else
      return (<SettingsScene sceneSetter={this.sceneSetter}/>);
  }
}

export class SceneSetter {
  constructor(app) {
    this.app = app;
  }

  current(name) {
    this.app.setState({scene: name});
  }
}
