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
  FlatList
} from 'react-native';
import { WebBrowser, Asset, Font, Constants, Location, Permissions} from 'expo';

import { MonoText } from '../components/StyledText';
import { HorizontalFeed } from '../components/HorizontalFeed';
import { VerticalFeed } from '../components/VerticalFeed';
import { FeedCard } from '../components/FeedCard';
import { CouponCard } from '../components/CouponCard';
import { SpaceAvatar } from '../components/SpaceAvatar';

import { Header, Icon, Card, Button, Avatar } from 'react-native-elements';

import {
  StackNavigator,
} from 'react-navigation';

import SpaceScreen from '../screens/SpaceScreen';

import styles from '../assets/Styles';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    props: this.props,
  }

  constructor(props) {
    super(props);

    this._handlePress = this._handlePress.bind(this);
  }

  _handlePress = (key) => {
    this.props.navigation.navigate('SpaceStack', { name: key });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.state.props) {
      this.setState({ props: nextProps });
    }
  }

  render() {
    // console.log(this.state.props);
    const {data} = this.state.props.screenProps;
    let Favourites = [];
    if(!!this.state.props.screenProps.user.favourites) {
      Favourites = this.state.props.screenProps.user.favourites.map((key) => {
        const itemVal = data[key];
        const itemKey = key;
        if(!!itemVal) {
          return <SpaceAvatar data={itemVal} key={'spaces-' + itemKey} style={styles.scrollHorizontalItem} onPress={() => this._handlePress(itemKey)}/>;
        } else {
          return null;
        }
      });
    }

    const Nearby = Object.entries(data).map((item) => {
      // TODO: Filter out nearby spaces for user
      const itemVal = item[1];
      const itemKey = item[0];
      return <SpaceAvatar data={itemVal} key={'spaces-' + itemKey} style={styles.scrollHorizontalItem} onPress={() => this._handlePress(itemKey)}/>;
    });

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
                  <Text style={styles.headerTitle}>Dashboard</Text>
                </Text>
              }
              outerContainerStyles={styles.header}
            />
          <View style={styles.columnContainer}>
            <HorizontalFeed title="FAVOURITES">
              {/*!Favourites.length && <ActivityIndicator style={{height: 50, width: 50}} color="#1a936f"/>*/}
              {(!!this.state.props.screenProps.user && !this.state.props.screenProps.user.favourites) &&
                <View style={{flexWrap: 'wrap', alignItems: 'flex-start', flexDirection:'row'}}>
                  <Icon
                    iconStyle={{ paddingTop: 3,}}
                    name='star'
                    type='feather'
                    color='#A3B7B1'
                    />
                  <Text style={{color: '#A3B7B1', width: 200, paddingLeft: 10}}>Add a space to your favourites to see them here!</Text>
                </View>
              }
              {Favourites}
            </HorizontalFeed>
          </View>
          <View style={styles.columnContainer}>
            <HorizontalFeed title="NEARBY">
              {!Nearby.length && <ActivityIndicator style={{height: 50, width: 50}} color="#1a936f"/>}
              {Nearby}
            </HorizontalFeed>
          </View>
          <View style={styles.columnContainer}>
            <FlatList
              key={"shortcut-list"}
              data={[
                {
                  image: {
                    url : "https://assets.mystarbucks.com.au/imagecache/bestfit/288x288/_files/Beverages/cold-brew.png",
                  },
                  space: {
                    name: 'starbucks'
                  }
                },
                {
                  image: {
                    url : "https://assets.mystarbucks.com.au/imagecache/bestfit/288x288/_files/Beverages/processed-2013/icedamericano.jpg",
                  },
                  space: {
                    name: 'starbucks',
                  }
                },
                {
                  image: {
                    url : "https://store.storeimages.cdn-apple.com/8750/as-images.apple.com/is/image/AppleInc/aos/published/images/m/bp/mbp13touch/gray/mbp13touch-gray-select-201610?wid=904&hei=840&fmt=jpeg&qlt=80&op_sharpen=0&resMode=bicub&op_usm=0.5,0.5,0,0&iccEmbed=0&layer=comp&.v=1495842447612",
                  },
                  space: {
                    name: 'apple',
                  }
                },
              ]}
              renderItem={
                ({item, index}) =>{
                  let avatarUrl = '';
                  if(data[item.space.name]) {
                    avatarUrl = data[item.space.name].logoUrl;
                  }
                  return (
                  <TouchableOpacity key={"item-touch-" + index} style={{ flex: 0.32}}>
                    <Card key={"item-card-" + index} containerStyle={{ borderWidth: 1, shadowOpacity: 0, margin: 0, marginTop: 15, width: "100%"}} imageStyle={{height: 100}} wrapperStyle={{padding: 0, }} image={{uri: item.image.url }}>
                      <View key={"item-view-" + index} style={{
                          marginTop: -45 ,
                          marginLeft: 0
                        }}>
                        <Avatar
                          medium
                          rounded
                          source={ data[item.space.name] ? {uri: avatarUrl } : null}
                          imageProps={(!!data[item.space.name] && !!data[item.space.name].resizeLogo) ? { resizeMode: data[item.space.name].resizeLogo.type, height: (data[item.space.name].resizeLogo.height - 8), width: (data[item.space.name].resizeLogo.width)} : {height: 40, width: 40}}
                          containerStyle={[styles.scrollHorizontalItem, {backgroundColor: 'white', height: 40, width: 40}]}
                        />
                      </View>
                    </Card>
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

export default StackNavigator({
  HomeStack: {
    screen: HomeScreen,
  },
  SpaceStack: {
    screen: SpaceScreen,
  },
});
