import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar, Card } from 'react-native-elements'; // 0.18.5

export class CouponCard extends Component {
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
  },
  promotionCardText: {
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Aktiv Grotesk Light',
  },
  feedCard: {
    width: 250,
    marginTop: 0,
    backgroundColor: '#E4FDE1',
  },
  promotionTitle: {
    marginLeft: 8, 
    marginTop: 8,
    fontFamily: 'Aktiv Grotesk',
  },
});
