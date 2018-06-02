import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Avatar, Card } from 'react-native-elements'; // 0.18.5

export default class FeedCard extends Component {
  render() {
    return (
      <Card containerStyle={styles.feedCard}>
        <View style={styles.flexRow}>
          <Avatar
            small
            rounded
            source={{uri: this.props.avatarLink }}
            // onPress={() => console.log("Works!")}
            imageProps={this.props.avatarImageProps}
            activeOpacity={0.7}
          />
          <Text style={styles.promotionTitle}>
            {this.props.title}
          </Text>
        </View>
        <Image
          style={{width: '100%', height: 250}}
          source={{uri: this.props.imageUrl}}
        />
        <Text style={styles.promotionCardText}>
          {this.props.cardText}
        </Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  promotionCardText: {
    marginTop: 10,
    marginBottom: 10,
  },
  feedCard: {
    // width: 250
  },
  promotionTitle: {
    marginLeft: 8, 
    marginTop: 8,
  },
});
