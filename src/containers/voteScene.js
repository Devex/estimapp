import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import VotingOption from '../components/votingOption';
import GoBack from '../components/goBack';
import DbConnector from '../services/dbConnector';

const styles = StyleSheet.create({
  verticalContainerBox: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  horizontalContainerBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default class VoteScene extends Component {

  render() {
    return(
      <View style={styles.verticalContainerBox}>
        <GoBack sceneSetter={this.props.sceneSetter}/>
        <View style={styles.horizontalContainerBox}>
          <VotingOption value='1' onPress={this._handleVote.bind(this)}/>
          <VotingOption value='2' onPress={this._handleVote.bind(this)}/>
          <VotingOption value='3' onPress={this._handleVote.bind(this)}/>
        </View>
        <View style={styles.horizontalContainerBox}>
          <VotingOption value='5' onPress={this._handleVote.bind(this)}/>
          <VotingOption value='8' onPress={this._handleVote.bind(this)}/>
          <VotingOption value='13' onPress={this._handleVote.bind(this)}/>
        </View>
        <View style={styles.horizontalContainerBox}>
          <VotingOption value='∞' onPress={this._handleVote.bind(this)}/>
          <VotingOption value='?' onPress={this._handleVote.bind(this)}/>
        </View>
     </View>
    );
  }

  _handleVote(vote) {
    DbConnector.instance.write(vote);
    this.props.sceneSetter.current('Results');
  }
}
