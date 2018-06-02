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
  TextInput,
} from 'react-native';
import { WebBrowser, Asset, Font, Constants } from 'expo';
import { ExpoLinksView } from '@expo/samples';
import { Header, Icon, Card, Button, Avatar } from 'react-native-elements';
import styles from '../assets/Styles';
import { StackNavigator } from 'react-navigation';
import SpaceScreen from '../screens/SpaceScreen';
import HomeScreen from '../screens/HomeScreen';
import { SpaceAvatar } from '../components/SpaceAvatar';
import S7MiGMK6tQM3 from '../api/o3my3-021891012b';
import S8OiGxK6t4X4 from '../api/o3my3-021841012b';

let searchTimeout;

class DiscoverScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Discover',
  };

  state = {
    searchResults: [],
    searchLoaded: false,
    index: [],
  }

  _search = (queryText) => {
    if(!!searchTimeout) {
      clearTimeout(searchTimeout);
    }
    // Clear search results array here
    this.setState({
      searchResults: [],
      searchLoaded: false,
    });

    if(!!queryText) {
      searchTimeout = setTimeout(() => {
        const index = this.state.index;
        this.setState({
          searchResults: Object.keys(index).filter((key) => {
            const reg = new RegExp(queryText,"gi");
            const value = index[key];
            return reg.test(value);
          }).map((value, key) => {
            return value;
          }),
        });

        let dataKeys = Object.keys(this.props.screenProps.data);
        let searchData = this.state.searchResults.filter(e => !dataKeys.includes(e));
        this.props.screenProps.getData(searchData).then(() => {
          this.setState({
            searchLoaded: true,
          });
        });
      }, 500);
    }
  }

  _handlePress = (key) => {
    this.props.navigation.navigate('SpaceStack', { name: key });
  }

  componentWillMount() {
    S8OiGxK6t4X4.ref().on('value', (snapshot) => {
      this.setState({
        index: snapshot.val(),
      });
    });
  }

  render() {
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
                <Text style={styles.headerTitle}>Discover</Text>
              </Text>
            }
            outerContainerStyles={styles.header}
          />
        <View style={[styles.columnContainer, {borderBottomWidth: 1, borderColor: '#ececec'}]}>
            <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row', backgroundColor: '#f5f5f5', borderRadius: 5}}>
              <Icon
                iconStyle={{ marginTop: 4, paddingLeft: 5,}}
                size={18}
                name='search'
                type='feather'
                color='#A3B7B1'
                />
              <TextInput
                style={[styles.textInput, styles.defaultFont, styles.searchInput]}
                placeholder="Search"
                onChangeText={(text) => {
                  this._search(text);
                }}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor={'#A3B7B1'}
                />
            </View>
          </View>
          <View>
            {this.state.searchLoaded && this.state.searchResults.map((value, key) => {
              return (
              <TouchableOpacity style={[styles.columnContainer, {paddingVertical: 10, flexDirection:'row', flexWrap:'wrap', flex: 1, alignItems: 'center', borderBottomWidth: 1, borderColor: '#ececec'}]} key={key} onPress={() => {this._handlePress(value)}}>
                <SpaceAvatar data={this.props.screenProps.data[value]} key={'spaces-' + key} style={{ marginRight: 10,}} />
                <Text>
                  {this.state.index[value]}
                </Text>
              </TouchableOpacity>
              );
            })}
          </View>

        </ScrollView>

      </View>
    );
  }
}

export default StackNavigator({
  DiscoverStack: {
    screen: DiscoverScreen,
  },
  SpaceStack: {
    screen: SpaceScreen,
  },
});
