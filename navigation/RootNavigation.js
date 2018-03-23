import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import { Header, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { capitalize } from 'lodash';

import AuthenticationScreen from '../screens/AuthenticationScreen';
import BreweryDetailsScreen from '../screens/BreweryDetailsScreen';
import BreweryListScreen from '../screens/BreweryListScreen';
import BreweryMapScreen from '../screens/BreweryMapScreen';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import SettingsScreen from '../screens/SettingsScreen';

const ListStack = createStackNavigator(
  {
    list: {
      screen: BreweryListScreen,
    },
    details: {
      screen: BreweryDetailsScreen,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  }
);

const SettingsStack = createStackNavigator(
  {
    mainSettings: {
      screen: SettingsScreen,
    },
  },
  {
    navigationOptions: {
      title: 'Settings',
      headerTitleStyle: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 17,
        letterSpacing: -0.5,
        fontWeight: Platform.OS === 'android' ? '400' : 'normal',
      },
      headerStyle: {
        backgroundColor: '#fff',
        ...Platform.select({
          android: {
            paddingTop: Constants.statusBarHeight,
            height: Header.HEIGHT + Constants.statusBarHeight,
          },
        }),
      },
    },
  }
);

const TabLayout = createBottomTabNavigator(
  {
    list: {
      screen: ListStack,
    },
    map: {
      screen: BreweryMapScreen,
    },
    settings: {
      screen: SettingsStack,
    },
  },
  {
    navigationOptions: ({ navigation }) => {
      let { routeName } = navigation.state;
      let tabBarLabel = capitalize(routeName);
      if (tabBarLabel === 'List') {
        tabBarLabel = 'Brewery List';
      }
      return {
        tabBarLabel,
        tabBarIcon: ({ focused }) => {
          const { routeName } = navigation.state;
          let iconName;
          switch (routeName) {
            case 'list':
              iconName = Platform.OS === 'ios' ? 'ios-list' : 'md-list';
              break;
            case 'map':
              iconName = Platform.OS === 'ios' ? 'ios-map-outline' : 'md-map';
              break;
            case 'settings':
              iconName =
                Platform.OS === 'ios' ? 'ios-options-outline' : 'md-options';
          }
          return (
            <Ionicons
              name={iconName}
              size={Platform.OS === 'ios' ? 30 : 27}
              style={{ marginBottom: -3 }}
              color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
          );
        }
      };
    },
    tabBarOptions: {
      activeTintColor: Colors.tabIconSelected,
      inactiveTintColor: Colors.tabIconDefault,
    },
  }
);

export default createStackNavigator(
  {
    tabs: {
      screen: TabLayout,
    },
  },
  {
    headerMode: 'none',
    cardStyle: {
      backgroundColor: '#fff',
    },
  }
);
