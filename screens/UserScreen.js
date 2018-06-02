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
import { Header, Icon, Card, Button, Avatar } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import styles from '../assets/Styles';
import CreateScreen from '../screens/CreateScreen';
import AppAdminScreen from '../screens/AppAdminScreen';
import { HorizontalFeed } from '../components/HorizontalFeed';
import { SpaceAvatar } from '../components/SpaceAvatar';


class UserScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'User',
  };

  state = {
    user: this.props.screenProps.user,
    props: this.props,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      user: nextProps.screenProps.user,
    });

    if (nextProps !== this.state.props) {
      this.setState({ props: nextProps });
    }
  }

  _handlePress(key) {
    this.props.navigation.navigate('AppAdminScreen', { name: key });
  }

  render() {
    const {name} = this.state.user;
    const {data} = this.state.props.screenProps;
    let Spaces = [];
    // console.log(this.state.props.screenProps.data);
    if(!!this.state.user.spaces) {
      Spaces = Object.keys(this.state.user.spaces).map((key) => {
        const itemVal = data[key];
        const itemKey = key;
        if(!!itemVal) {
          return <SpaceAvatar data={itemVal} key={'spaces-' + itemKey} style={styles.scrollHorizontalItem} onPress={() => this._handlePress(itemKey)}/>;
        } else {
          return null;
        }
      });
    }
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
                <Text style={styles.headerTitle}>{name}</Text>
              </Text>
            }
            outerContainerStyles={styles.header}
          />
          <View style={styles.columnContainer}>
            {/*<Text>Spaces</Text>*/}
            <HorizontalFeed title="SPACES">
              {Spaces}
            </HorizontalFeed>
            {/*<Text>Details</Text>
            <Text>Orders</Text>*/}
            <Button title="Create a Grain" onPress={() => {this.props.navigation.navigate('CreateScreen')}}/>
          </View>

        </ScrollView>

      </View>
    );
  }
}

export default StackNavigator({
  UserScreen: {
    screen: UserScreen,
  },
  CreateScreen: {
    screen: CreateScreen,
  },
  AppAdminScreen: {
    screen: AppAdminScreen,
  },
});
