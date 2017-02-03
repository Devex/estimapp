import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
} from 'react-native';
import DbConnector from '../services/dbConnector'

export default class ResultsScene extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      votes: [],
      dataSource: ds.cloneWithRows([{username: 'Test', vote: '3'}, {username: 'Bla', vote: '2'}]),
    };
    DbConnector.instance.on('read', (votes) => {
      this.setState({
        dataSource: ds.cloneWithRows(votes)
      });
    });

    // const votes = this.state.votes;
    // this.state = { dataSource: ds.cloneWithRows(votes) };
  }

  render() {
    return (
      <View>
        <ListView
          dataSource={this.state.dataSource}
          enableEmptySectionHeaders={true}
          renderRow={(vote) => <Text>{vote.username} - {vote.vote}</Text>}
        />
        <Button title='Reset' onPress={() => DbConnector.instance.flush()}/>
      </View>
    );
  }
}
