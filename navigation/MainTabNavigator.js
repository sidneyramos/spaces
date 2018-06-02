import React from 'react';
import { Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UserScreen from '../screens/UserScreen';

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Discover: {
      screen: DiscoverScreen,
    },
    User: {
      screen: UserScreen,
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = 'grid';
            break;
          case 'Discover':
            iconName = 'compass';
            break;
          case 'User':
            iconName = 'user';
            break;
          case 'Settings':
            iconName ='settings';
        }
        return (
          <Feather
            name={iconName}
            size={25}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarOptions: {
      labelStyle: {
        fontSize: 12,
        paddingBottom: 2,
        fontFamily: 'Aktiv Grotesk',
      },
      style: {
        borderTopWidth: 0,
        backgroundColor: '#F4F7F6',
        height: 45,
      },
      showLabel: false,
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    // swipeEnabled: true,
  }
);
