import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  PanResponder,
  Animated,
  Dimensions,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { WebBrowser, Asset, Font, Constants } from 'expo';
import { ExpoLinksView } from '@expo/samples';
import { Feather } from '@expo/vector-icons';
import { Header, Icon, Card, Button, Avatar } from 'react-native-elements';
import { TabNavigator, TabBarTop } from 'react-navigation';
import styles from '../assets/Styles';
import Colors from '../constants/Colors';
import S8OiGxK6t4X4 from '../api/o3my3-021841012b';

export default class FormCreateScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Admin',
  };

  state = {
    data: this.props.screenProps.data[this.props.navigation.state.params.name],
    index: [],
    items: [],
  }

  componentWillMount() {
    S8OiGxK6t4X4.ref().on('value', (snapshot) => {
      this.setState({
        index: snapshot.val(),
      });
    });
    const {items} = this.state.data.template;
    if(items) {
      const categoryElements = [];
      for (let category of items) {
        const itemElements = category.items.map((item) => {
          return (
            <View>
              <Text>{item.name}</Text>
              <Text>{item.image.url}</Text>
              <Text>{item.price}</Text>
            </View>
          );
        });

        categoryElements.push(
          <View>
            <Text style={styles.adminCategoryStyle}>{category.name}</Text>
            {itemElements}
          </View>
        );
      }

      this.setState({
        items: categoryElements,
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    const {name} = this.props.navigation.state.params;
    if (JSON.stringify(this.state.data) !== JSON.stringify(nextProps.screenProps.data[name])) {
      this.setState({ data: nextProps.screenProps.data[name] });
    }
  }

  handleTextChange(text, db, key) {
    // this.setState(obj);
    let obj = {};
    let stateObj = this.state[db];
    stateObj[key] = text;
    obj[db] = stateObj;
    this.setState(obj);
  }

  handleSubmit() {
    const {name} = this.props.navigation.state.params;
    S8OiGxK6t4X4.ref('/' + name).set(this.state.index[name]);
  }

  render() {
    const {name} = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="black"
         />
        <View style={styles.statusBar} />
        <ScrollView style={styles.container}>
          <View style={{paddingLeft: 15, paddingRight: 15}}>
            {/*<Text style={styles.headerTitle}>{this.state.index[name]}</Text>*/}
            <TextInput
              style={[styles.textInput, styles.headerTitle, styles.adminHeaderInput]}
              onChangeText={(text) => {this.handleTextChange(text, "index", name)}}
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.index[name]}
            />
          </View>
          <View style={styles.columnContainer}>
            <View>
              {/*<Text style={styles.headingTitle}>NAME</Text>*/}

              <Text style={styles.headingTitle}>TEMPLATE</Text>
              <Text style={styles.headingTitle}>ITEMS</Text>
              {this.state.items}
              {/*<Text style={styles.headingTitle}>ORDERS</Text>*/}


              <TouchableOpacity style={[styles.appButton, {
                borderRadius: 20,
                padding: 10,
                width: 100,
                alignItems: 'center',
                backgroundColor: Colors.tintColor
              }]} onPress={() => {this.handleSubmit()}}>
                <Text style={{color: 'white',}}>Submit</Text>
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
