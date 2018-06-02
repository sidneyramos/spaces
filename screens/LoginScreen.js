import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { WebBrowser, Asset, Font, Constants } from 'expo';
import { ExpoLinksView } from '@expo/samples';
import { Header, Icon, Card, Button, Avatar } from 'react-native-elements';
import styles from '../assets/Styles';

export default class LoginScreen extends React.Component {

  render() {
    return (
      <View style={styles.container, {paddingTop: 30}}>
        <Text> User not logged in</Text>
      </View>
    );
  }
}
