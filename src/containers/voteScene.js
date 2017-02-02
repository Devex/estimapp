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
          <View style={styles.numberBox}>
            <Text style={styles.number}> 1 </Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.number}> 2 </Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.number}> 3 </Text>
          </View>
        </View>
        <View style={styles.horizontalContainerBox}>
          <View style={styles.numberBox}>
            <Text style={styles.number}> 5 </Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.number}> 8 </Text>
          </View>
          <View style={styles.numberBox}>
            <Text style={styles.number}> 13 </Text>
          </View>
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
