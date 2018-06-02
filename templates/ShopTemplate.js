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
} from 'react-native';
import { WebBrowser, Asset, Font, Constants } from 'expo';
import { Icon, Card, Button, Avatar } from 'react-native-elements';
import { DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MonoText } from '../components/StyledText';
import { HorizontalFeed } from '../components/HorizontalFeed';
import { VerticalFeed } from '../components/VerticalFeed';
import { FeedCard } from '../components/FeedCard';
import { CouponCard } from '../components/CouponCard';
import { SpaceHeader } from '../components/SpaceHeader';
import { SpaceItemCollection } from '../components/SpaceItemCollection';
import { SpacePromotionCollection } from '../components/SpacePromotionCollection';

class BodyTemplate extends React.Component {

  render() {
    const {data, navigation, rootNavigation, page, categoryKey} = this.props;

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="black"
         />
        <View style={styles.statusBar} />
        <ScrollView style={styles.container}>
          <SpaceHeader
            data={data.template.header}
            navigation={navigation}
          />
          { page === 'main' && <SpacePromotionCollection
            data={data.template.promotions}
          /> }
          { page === 'items' && <SpaceItemCollection
            data={data.template.items}
            categoryKey={categoryKey}
          /> }
        </ScrollView>
      </View>
    );
  }
}

class MainScreen extends React.Component {
  // static navigationOptions = {
    // drawerLabel: 'Home',
    // drawerIcon: ({ tintColor }) => (
    //   <MaterialIcons
    //     name="home"
    //     size={24}
    //     style={{ color: tintColor }}
    //   />
    // ),
  // };

  render() {
    const {data, rootNavigation} = this.props.screenProps;
    const {navigation} = this.props;
    return (<BodyTemplate page={'main'} data={data} navigation={navigation} rootNavigation={rootNavigation}/>);
  }
}

class ItemsScreen extends React.Component {
  // static navigationOptions = {
    // drawerLabel: 'Items',
    // drawerIcon: ({ tintColor }) => (
    //   <MaterialIcons name="drafts" size={24} style={{ color: tintColor }} />
    // ),
  // };

  render() {
    const {data, rootNavigation} = this.props.screenProps;
    const {navigation, categoryKey} = this.props;
    return (<BodyTemplate page={'items'} data={data} navigation={navigation} rootNavigation={rootNavigation} categoryKey={categoryKey} />);
  }
}

class DrawerContentComponent extends React.Component {

  state =  {
    favourites: (!!this.props.screenProps.user.favourites ? this.props.screenProps.user.favourites : []),
  }

  _toggleFavourite = (userKey, spaceName, spaceInFavourites) => {
    const {db} = this.props.screenProps;
    const app = this;
    let newFavourites = this.state.favourites;
    if (spaceInFavourites) {
      newFavourites.splice(newFavourites.indexOf(spaceName), 1);
    } else {
      newFavourites.push(spaceName);
    }
    this.setState({
      favourites: newFavourites,
    });
    db.ref('/users/' + userKey).update({
      favourites: app.state.favourites,
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return false;
  // }

  render() {
    const {template} = this.props.screenProps.data;
    const {rootNavigation, userKey, db} = this.props.screenProps;
    const spaceName = rootNavigation.state.params.name;
    if(!template.menu) {
      return null;
    }

    const spaceInFavourites = this.state.favourites.includes(spaceName);

    return (
      <View style={[styles.menuBarContainer, template.menu.container]}>
        <View style={{flex: 1}}>
          <DrawerItems {...this.props} {...template.menu.items} />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Button
            containerViewStyle={styles.homeFooterButtonContainer}
            onPress={() => {
                const resetAction = NavigationActions.reset({
                  index: 0,
                  key: null,
                  actions: [
                    NavigationActions.navigate({ routeName: 'Main'})
                  ]
                });
                rootNavigation.dispatch(resetAction);
              }
            }
            icon={{name: 'grid', type: 'feather', style: {paddingLeft: 10}}}
            backgroundColor="rgba(0,0,0,0.2)"
            rounded
          />
          <Button
            containerViewStyle={styles.homeFooterButtonContainer}
            onPress={() => {
                // rootNavigation.navigate('Home');
                this._toggleFavourite(userKey, spaceName, spaceInFavourites);
              }
            }
            icon={{name: 'star', type: (spaceInFavourites ? 'font-awesome' : 'feather'), style: {paddingLeft: 10, color: (spaceInFavourites ? 'yellow' : 'white')}}}
            backgroundColor="rgba(0,0,0,0.2)"
            rounded
          />
        </View>
      </View>
    );
  }
}

const getDrawerTemplate = (screenProps) => {
  const {data} = screenProps;
  const screens = {
    Main: {
      path: '/',
      screen: ({navigation}) => {
        return <MainScreen navigation={navigation} screenProps={screenProps}/>;
      },
      navigationOptions: {
        drawerLabel: 'Home',
      }
    },
  };

  data.template.items.map((item, index) => {
    screens['item-' + index] = {
      path: `/items/${index}`,
      screen: ({navigation}) => {
        return <ItemsScreen navigation={navigation} screenProps={screenProps} categoryKey={index}/>;
      },
      navigationOptions: {
        drawerLabel: item.name,
      }
    };
  });

  let drawerOptions = {};
  if (!!screenProps.data.template.menu.drawerOptions) {
    drawerOptions = screenProps.data.template.menu.drawerOptions;
  }

  return DrawerNavigator(
    screens,
    Object.assign({
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      initialRouteName: 'Main',
      contentComponent: DrawerContentComponent,
      drawerPosition: 'left',
    }, drawerOptions)
  );
}

class ShopTemplate extends React.Component {
  state = {
    props: this.props.screenProps,
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (JSON.stringify(this.state.props.data) !== JSON.stringify(nextProps.screenProps.data));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      props: nextProps.screenProps,
    });
  }

  render() {
    const screenProps = this.state.props;
    const Drawer = getDrawerTemplate(screenProps);
    return (
    <View style={{height: "100%", }}>
      <Drawer screenProps={screenProps} />
    </View>
    );
  }
}

export default ShopTemplate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  flexColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  menuBarContainer: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  statusBar: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
  },
  columnContainer: {
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  header: {
    backgroundColor: 'black',
    height: 90 - Constants.statusBarHeight,
  },
  headerTitle: {
    fontSize: 23,
    color: '#fff',
    fontFamily: 'barlow-medium',
  },
  headerDot: {
    color: '#0E7C7B',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'barlow-medium',
  },
  scrollHorizontalItem: {
    marginLeft: 5,
    marginRight: 5,
  },
  homeFooterButtonContainer: {
    marginBottom: 15,
    // alignItems: 'flex-start',
    width: 42
  }
});
