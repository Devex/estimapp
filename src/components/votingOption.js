import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 100,
    width: 100,
    overflow: 'hidden',
    borderRadius: 4,
    backgroundColor: '#70b5cc'
  },
  text: {
    fontSize: 64,
    color: 'white'
  }
});

export default class VotingOption extends Component {
  render() {
    return(
      <Button
        containerStyle={styles.container}
        style={styles.text}
        onPress={() => this.props.onPress(this.props.value)}>
        {this.props.value}
      </Button>
    );
  }
}
