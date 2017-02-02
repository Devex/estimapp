import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import VotingOption from '../components/votingOption'

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
        <View style={styles.horizontalContainerBox}>
          <VotingOption value='1' />
          <VotingOption value='2' />
          <VotingOption value='3' />
        </View>
        <View style={styles.horizontalContainerBox}>
          <VotingOption value='5' />
          <VotingOption value='8' />
          <VotingOption value='13' />
        </View>
        <View style={styles.horizontalContainerBox}>
          <View style={styles.numberBox}>
            <Text style={styles.number}> ∞ </Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.number}> ? </Text>
          </View>
        </View>
     </View>
    );
  }
}
