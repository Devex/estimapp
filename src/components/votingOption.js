import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

const styles = StyleSheet.create({
  number: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 64,
  },
  numberBox: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
  },
});

export default class VotingOption extends Component {
  render() {
    return(
        <View style={styles.numberBox}>
        <Text style={styles.number}> { this.props.value } </Text>
        </View>
    );
  }
}
