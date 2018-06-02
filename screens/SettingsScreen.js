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
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { WebBrowser, Asset, Font, Constants } from 'expo';
import { ExpoConfigView } from '@expo/samples';
import { Header, Icon, Card, Button, Avatar } from 'react-native-elements';
import styles from '../assets/Styles';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Settings',
  };

  render() {
    const {logout} = this.props.screenProps;
    // console.log(logout);
    return (
        <View style={styles.container}>
            <StatusBar
              barStyle="light-content"
              backgroundColor="black"
             />
            <View style={styles.statusBar} />
            <ScrollView style={styles.container}>
              <Header
                leftComponent={
                  <Text>
                    <Text style={styles.headerTitle}>Settings</Text>
                  </Text>
                }
                outerContainerStyles={styles.header}
              />
              {/* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */}
              {/* <ExpoConfigView /> */}
              <Button
                containerViewStyle={{width: 42}}
                onPress={() => {
                    logout();
                  }
                }
                icon={{name: 'log-out', type: 'feather', style: {paddingLeft: 10}}}
                backgroundColor="rgba(0,0,0,0.2)"
                rounded
              />
            {/*<Button title="Log out" onPress={() => {
                  logout();
              }}></Button>*/}

            </ScrollView>

        </View>);
  }
}
