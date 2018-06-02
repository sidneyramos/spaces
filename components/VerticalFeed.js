import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

export default class VerticalFeed extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <Text>{this.props.title}</Text>
        <ScrollView style={styles.iconContainer}>
          { this.props.children }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    // backgroundColor: '#555',
    // paddingTop: 10,
    // paddingBottom: 10,
    marginTop: 0,
  },
});
