import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';

export class HorizontalFeed extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <Text style={styles.cardTitle}>{this.props.title}</Text>
        <ScrollView style={[styles.scrollContainer, this.props.contentScrollStyle]} centerContent={this.props.centerContent} horizontal showsHorizontalScrollIndicator={false}>
          { this.props.children }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardTitle: {
    fontFamily: 'Aktiv Grotesk Medium',
    letterSpacing: 1,
    fontSize: 13,
  },
});
