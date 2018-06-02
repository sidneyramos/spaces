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

import ShopTemplate from '../templates/ShopTemplate';

import { Header, Icon, Card, Button, Avatar } from 'react-native-elements';

import styles from '../assets/Styles';

export default class SpaceScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Space',
    tabBarVisible: false,
    gesturesEnabled: false,
  };

  state = {
    data: this.props.screenProps.data[this.props.navigation.state.params.name],
  }

  componentWillReceiveProps(nextProps) {
    const {name} = this.props.navigation.state.params;
    if (JSON.stringify(this.state.data) !== JSON.stringify(nextProps.screenProps.data[name])) {
      this.setState({ data: nextProps.screenProps.data[name] });
    }
  }

  render() {
    // const {params} = this.props.navigation.state;
    // const data = this.state.props.screenProps.data[params.name];
    const data = this.state.data;

    switch(data.template.type) {
      case 'shop':
        return(<ShopTemplate screenProps={
          {data: data, 
          rootNavigation: this.props.navigation, 
          userKey: this.props.screenProps.userKey, 
          user: this.props.screenProps.user, 
          db: this.props.screenProps.db}} />);
        break;
      default:
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
                      <Text style={styles.headerTitle}>Invalid template</Text>
                    </Text>
                  }
                  outerContainerStyles={styles.header}
                />
              <View style={{ alignItems: 'center'}}>
                <Text style={{ fontSize: 17, marginTop: 20, marginBottom: 20}}>Template cannot be located. </Text>
                <Button
                onPress={() => {
                    this.props.navigation.goBack('Space');
                  }
                }
                buttonStyle={{ backgroundColor: 'green', padding: 10, borderRadius: 20, width: 150,}}
                title="Back to home"
                />
              </View>
            </ScrollView>
          </View>
        );
        break;
    }

  }
}
