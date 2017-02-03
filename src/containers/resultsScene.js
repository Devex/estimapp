import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';
import DbConnector from '../services/dbConnector'

export default class ResultsScene extends Component {
  constructor(props) {
    super(props);
    DbConnector.instance.on('read', (votes) => this.setState({votes: votes}));
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    // const votes = this.state.votes;
    // this.state = { dataSource: ds.cloneWithRows(votes) };
  }

  render() {
    return (
      <View>
        <Text>Results</Text>
      </View>
    );
  }
}
