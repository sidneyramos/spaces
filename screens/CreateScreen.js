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
  TouchableOpacity
} from 'react-native';
import { WebBrowser, Asset, Font, Constants } from 'expo';
import { ExpoLinksView } from '@expo/samples';
import { Feather } from '@expo/vector-icons';
import { Header, Icon, Card, Button, Avatar } from 'react-native-elements';
import { TabNavigator, TabBarTop } from 'react-navigation';
import styles from '../assets/Styles';
import Colors from '../constants/Colors';

export default class FormCreateScreen extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Quick',
  };
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
                    <Text style={styles.headerTitle}>Build</Text>
                  </Text>
              }
              outerContainerStyles={styles.header}
            />
          <View style={styles.columnContainer}>
            <FlatList
              key={"shortcut-list"}
              data={[
                {
                  type: "Personal",
                },
                {
                  type: "Business"
                },
                {
                  type: "Creative"
                },
              ]}
              renderItem={
                ({item, index}) =>{
                  return (
                  <TouchableOpacity key={"item-touch-" + index} style={{ flex: 0.32, backgroundColor: '#1A936F', padding: 10, borderRadius: 20}}>
                    <Text>{item.type}</Text>
                  </TouchableOpacity>);
                }
              }
              keyExtractor={(item, index) => index}
              numColumns={3}
              columnWrapperStyle={{justifyContent: 'space-between'}}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
