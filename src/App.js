import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import SignInScreen from './SignInScreen';
import NewsScreen from './NewsScreen';
import DetailScreen from './DetailScreen';

import MarketplaceScreen from './MarketplaceScreen';
import MarketplaceScreenSubmitter from './MarketplaceScreenSubmitter';
import LeaseScreen from './LeaseScreen';
import LeaseScreenSubmitter from './LeaseScreenSubmitter';
import SettingsScreen from './SettingsScreen';

// import VideoScreen from './VideoScreen';
// import EVGallery from './EVGallery';


import styles from './styles'

class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const email = await AsyncStorage.getItem('email');
    // AsyncStorage.removeItem('email');
    // AsyncStorage.removeItem('listingType')

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(email ? 'App' : 'Auth');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: 'white'}}>
        
      </View>
    );
  }
}

const AuthStack = createStackNavigator({ SignIn: SignInScreen}, { headerMode: 'none' } );


const LeaseStack = createStackNavigator({ Lease: LeaseScreen, Details: DetailScreen, Submit: LeaseScreenSubmitter }, { headerMode: 'none', navigationOptions: ({navigation}) => ({ title: 'Lease Deals', tabBarIcon: ({focused}) => { return focused ? <Icon name="ios-notifications" size={20} color="#4F8EF7" /> : <Icon name="ios-notifications" size={20} color="grey" /> } }) })
const MarketStack = createStackNavigator({ Used: MarketplaceScreen, Details: DetailScreen, Submit: MarketplaceScreenSubmitter }, { headerMode: 'none', navigationOptions: ({navigation}) => ({ title: 'Buy & Sell', tabBarIcon: ({focused}) => { return focused ? <Icon name="ios-swap" size={20} color="#4F8EF7" /> : <Icon name="ios-swap" size={20} color="grey" /> } }) })
const NewsStack = createStackNavigator({ News: NewsScreen, Details: DetailScreen }, { headerMode: 'none', navigationOptions: ({navigation}) => ({ title: 'Newsfeed', tabBarIcon: ({focused}) => { return focused ? <Icon name="ios-paper" size={20} color="#4F8EF7" /> : <Icon name="ios-paper" size={20} color="grey" /> } }) })
const SettingsStack = createStackNavigator({ SettingsScreen: SettingsScreen }, { headerMode: 'none', navigationOptions: ({navigation}) => ({ title: 'Settings', tabBarIcon: ({focused}) => { return focused ? <Icon name="ios-settings" size={25} color="#4F8EF7" /> : <Icon name="ios-settings" size={25} color="grey" /> } }) })

// const VideoStack = createStackNavigator({ Video: VideoScreen, Details: DetailScreen}, { headerMode: 'none', navigationOptions: ({navigation}) => ({ title: 'Daily Videos', tabBarIcon: ({focused}) => { return focused ? <Icon name="ios-videocam" size={25} color="#4F8EF7" /> : <Icon name="ios-videocam" size={25} color="grey" /> } })  })
// const ShareStack = createStackNavigator({ Gallery: EVGallery, Details: DetailScreen, Submit: SubmitScreen}, { headerMode: 'none', navigationOptions: ({navigation}) => ({ title: 'EV Gallery', tabBarIcon: ({focused}) => { return focused ? <Icon name="ios-photos" size={25} color="#4F8EF7" /> : <Icon name="ios-photos" size={25} color="grey" /> } })  })



const AppTabs = createBottomTabNavigator(
  { LeaseStack, MarketStack, NewsStack, SettingsStack },
  {
    initialRouteName: 'LeaseStack',
    animationEnabled: false,
    swipeEnabled: false,
    lazyLoad: true,
    tabBarOptions: {
      activeTintColor: 'dodgerblue',
      inactiveTintColor: 'grey',
      showIcon: true,
      showLabel: true,
      lazyLoad: true,
      style: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
      }
    }
  }
)



const App = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppTabs,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));

export default App;