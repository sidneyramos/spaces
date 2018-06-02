import React from 'react';
import { Platform, StatusBar, StyleSheet, View, Text, AsyncStorage, ScrollView, TextInput, TouchableOpacity, Animated , Easing, ActivityIndicator} from 'react-native';
import { AppLoading, Asset, Font, Location, Permissions } from 'expo';
import { Ionicons, Foundation, Feather, FontAwesome, MaterialIcons, Octicons, EvilIcons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import RootNavigation from './navigation/RootNavigation';
import LoginScreen from './screens/LoginScreen';
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";
import RNShakeEvent from 'react-native-shake-event';
import styles from './assets/Styles';
import Colors from './constants/Colors';
import S7MiGMK6tQM3 from './api/o3my3-021891012b';

var database = S7MiGMK6tQM3;

bcrypt.setRandomFallback((len) => {
  const buf = new Uint8Array(len);

  return buf.map(() => Math.floor(isaac.random() * 256));
});

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
    data: {},
    location: null,
    errorMessage: null,
    userLoggedIn: false,
    usernameInput: '',
    passwordInput: '',
    fullNameInput: '',
    invalidInput: false,
    invalidInputRegistration: false,
    invalidPasswordRegistration: false,
    invalidInputTakenAcct: false,
    successRegistration: false,
    hasFinishedAsync: true,
    userKey: null,
    userScreen: 'login',
  };

  componentWillMount() {

    const app = this;
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }

    // database.ref('/spaces/').once('value').then(function(snapshot) {
    //   app.setState({
    //     data : snapshot.val()
    //   });
    // });


    // database.ref('/spaces/').on('value', function(snapshot) {
    //   app.setState({
    //     data : snapshot.val()
    //   });
    // });

    RNShakeEvent.addEventListener('shake', () => {
      console.log('Device shake!');
    });
  }

  componentWillUnmount() {
    RNShakeEvent.removeEventListener('shake');
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.watchPositionAsync({}, res => {
      this.setState({
        location: res,
      });
    });
  };

  _distance = (lat1, lon1, lat2, lon2) => {
    const p = 0.017453292519943295;    // Math.PI / 180
    const c = Math.cos;
    const a = 0.5 - c((lat2 - lat1) * p)/2 +
            c(lat1 * p) * c(lat2 * p) *
            (1 - c((lon2 - lon1) * p))/2;

    return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
  }

  _login = (SuMQehNb900q, EnCt284553e1f394525056e8560604ee5336) => {
    const app = this;
    app.setState({
      hasFinishedAsync: false,
    });

    if(!(SuMQehNb900q.replace(/\s/g, "")) || !EnCt284553e1f394525056e8560604ee5336) {
      app.setState({
        userLoggedIn: false,
        invalidInput: true,
      });
      return;
    }
    database.ref('/users/' + SuMQehNb900q).once('value').then(function(snapshot) {
      let invalidInput = false;
      let userLoggedIn = false;
      const user = snapshot.val();
      if(!!user) {
        if(bcrypt.compareSync(EnCt284553e1f394525056e8560604ee5336, user.EnCt284553e1f394525056e8560604ee5336)){
          userLoggedIn = true;
          AsyncStorage.setItem('userKey', SuMQehNb900q);
          app.setState({
            user: user,
          });
          let totalSet = new Set();
          const favouritesSet = new Set(user.favourites);
          let spacesSet = new Set();
          if(!!user.spaces) {
            spacesSet = new Set(Object.keys(user.spaces));
            totalSet = new Set([...favouritesSet, ...spacesSet]);
          } else {
            totalSet = favouritesSet;
          }
          app._getData([...totalSet]);
        } else {
          invalidInput = true;
        }
      } else {
        invalidInput = true;
      }

      app.setState({
        userLoggedIn: userLoggedIn,
        invalidInput: invalidInput,
        hasFinishedAsync: true,
      });
    });
  }

  _logout = () => {
    AsyncStorage.clear();
    this.setState({
      userLoggedIn: false,
      usernameInput: '',
      passwordInput: '',
      invalidInput: false,
      userKey: null,
      user: {},
      data: {},
    });
  }

  _register = (username, password, fullName) => {
    const isPasswordValid = (pass) => {
      return !(pass.length < 8 || !(/^[a-z0-9]+$/i.test(pass)));
    }

    if((!(username.replace(/\s/g, "")) || username.includes(" ")) || !isPasswordValid(password) || !(fullName.replace(/\s/g, ""))) {
      let invalidPass = false;
      let invalidInput = false;
      if(!isPasswordValid(password)) {
        invalidPass = true;
      } else {
        invalidInput = true;
      }
      this.setState({
        userLoggedIn: false,
        invalidInputRegistration: invalidInput,
        invalidPasswordRegistration: invalidPass,
      });
      return;
    }
    const app = this;
    database.ref('/users/' + username).once('value').then(function(snapshot) {
      if(!snapshot.val()){
        var salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        database.ref('/users/' + username).set({
            EnCt284553e1f394525056e8560604ee5336: hash,
            name: fullName,
          }).then(() => {
            app._login(username, password);
          });
      } else {
        app.setState({
          invalidInputTakenAcct: true,
        });
      }

    });
  }

  _getData = (favourites) => {
    const app = this;
    const dataObj = {};
    if(!!favourites) {
      const dataPromiseMap = favourites.map((key) => {
        return new Promise((resolve, reject) => {
          database.ref('/spaces/' + key).on('value', function(snapshot) {
            dataObj[key] = snapshot.val();
            app.setState({
              data: Object.assign(app.state.data, dataObj),
            });
            resolve();
          });
        });
      });
      return Promise.all(dataPromiseMap);
    } else {
      return null;
    }
    // return Promise.all(dataPromiseMap).then((values) => {
    //   // console.log(values);
    //   // console.log(dataObj);
    //   app.setState({
    //     data: dataObj,
    //   });
    // });
  }


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen ) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      if(this.state.userLoggedIn && !!this.state.user) {
        return (
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            {Platform.OS === 'android' && <View style={styles.statusBarUnderlay} />}
            <RootNavigation location={this.state.location} data={this.state.data} user={this.state.user} db={database} userKey={this.state.userKey} logout={this._logout} getData={this._getData}/>
          </View>
        );
      } else {
        return(
          <View style={styles.container, {paddingTop: 30, alignItems: 'center', justifyContent: 'center', height: '100%', paddingLeft: 15, paddingRight: 15}}>
            <View style={{flexDirection:'row', flexWrap:'wrap', padding: 15}}>
              <TouchableOpacity style={[this.state.userScreen === 'login' && styles.selectedBorder]} onPress={() => {
                  this.setState({
                    userScreen: 'login',
                    invalidInput: false,
                    invalidInputRegistration: false,
                    invalidPasswordRegistration: false,
                    successRegistration: false,
                    usernameInput: '',
                    passwordInput: '',
                    fullNameInput: '',
                  });
              }}>
                <Text
                  style={[styles.defaultFont,
                    this.state.userScreen === 'login' && styles.selectedFont,
                    !(this.state.userScreen === 'login') && styles.inactiveFont,
                    {fontSize: 15}]}>
                  Log in
                </Text>
              </TouchableOpacity>
              <Text style={[styles.defaultFont, {color: '#4c4c4c'}, {fontSize: 15}]}> or </Text>
              <TouchableOpacity style={[this.state.userScreen === 'register' && styles.selectedBorder]} onPress={() => {
                  this.setState({
                    userScreen: 'register',
                    invalidInput: false,
                    invalidInputRegistration: false,
                    invalidPasswordRegistration: false,
                    successRegistration: false,
                    usernameInput: '',
                    passwordInput: '',
                  });
              }}>
                <Text style={[styles.defaultFont,
                    this.state.userScreen === 'register' && styles.selectedFont,
                    !(this.state.userScreen === 'register') && styles.inactiveFont,
                    {fontSize: 15}]}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.invalidInput &&
              <Text style={[{color: 'red', padding: 15}, styles.defaultFont]}>
                Invalid username/password! Please try again.
              </Text>
            }
            {this.state.invalidInputRegistration &&
              <Text style={[{color: 'red', padding: 15}, styles.defaultFont]}>
                Invalid input! Please try again.
              </Text>
            }
            {this.state.invalidPasswordRegistration &&
              <Text style={[{color: 'red', padding: 15}, styles.defaultFont]}>
                Please ensure that your password has at least 8 <Text style={{textDecorationLine: 'underline', fontFamily: 'Aktiv Grotesk Medium'}}>alphanumerical</Text> characters.
              </Text>
            }
            {this.state.invalidInputTakenAcct &&
              <Text style={[{color: 'red', padding: 15}, styles.defaultFont]}>
                Username already taken! Please try again.
              </Text>
            }
            {this.state.successRegistration &&
              <Text style={[{color: '#4AAD59', padding: 15}, styles.defaultFont]}>
                Successfully registered!
              </Text>
            }
            {
              !this.state.hasFinishedAsync &&
              <ActivityIndicator size="small" color={Colors.tintColor} style={{
                position: 'relative',
                top: 40,
                marginTop: -20,
                left: '35%',
                zIndex: 1,
              }}/>
            }
            <TextInput
              style={[styles.textInput, styles.defaultFont, {zIndex: 0}]}
              placeholder="Username"
              onChangeText={(text) => this.setState({usernameInput: text, invalidInput: false, invalidInputRegistration: false, invalidPasswordRegistration: false, invalidInputTakenAcct: false, successRegistration: false,})}
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.usernameInput}
            />

            <TextInput
              style={[styles.textInput, styles.defaultFont, {zIndex: 0}]}
              placeholder="Password"
              onChangeText={(text) => this.setState({passwordInput: text, invalidInput: false, invalidInputRegistration: false, invalidPasswordRegistration: false, invalidInputTakenAcct: false, successRegistration: false,})}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              value={this.state.passwordInput}
            />
            {this.state.userScreen === 'register' &&
              <TextInput
                style={[styles.textInput, styles.defaultFont]}
                placeholder="Full name"
                onChangeText={(text) => this.setState({fullNameInput: text, invalidInput: false, invalidInputRegistration: false, invalidPasswordRegistration: false, invalidInputTakenAcct: false, successRegistration: false,})}
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.fullNameInput}
              />
            }
            { this.state.userScreen === 'login' &&
              <Button rounded containerViewStyle={styles.appButton} onPress={() => {
                  this._login(this.state.usernameInput, this.state.passwordInput);
                }}
                icon={{name: 'chevron-right', type: 'feather', style: {paddingLeft: 10}}}
                backgroundColor={'#1A936F'}
              />
            }
            { this.state.userScreen === 'register' &&
              <Button rounded containerViewStyle={styles.appButton} onPress={() => {
                  this._register(this.state.usernameInput, this.state.passwordInput, this.state.fullNameInput);
                }}
                icon={{name: 'chevron-right', type: 'feather', style: {paddingLeft: 10}}}
                backgroundColor={'#1A936F'}
              />
            }
            { this.state.userScreen === 'login' &&
              <Text style={[{padding: 15, paddingTop: 0, fontSize: 12}, styles.defaultFont]}>Forgot password?</Text>
            }
          </View>
        );
      }
    }
  }

  _loadResourcesAsync = async () => {
    const app = this;
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        'barlow': require('./assets/fonts/Barlow-Regular.otf'),
        'barlow-medium': require('./assets/fonts/Barlow-Medium.otf'),
        'barlow-bold': require('./assets/fonts/Barlow-Bold.otf'),
        'Rubik': require('./assets/fonts/Rubik-Regular.ttf'),
        'Rubik Medium': require('./assets/fonts/Rubik-Medium.ttf'),
        'Rubik Bold': require('./assets/fonts/Rubik-Bold.ttf'),
        'Aktiv Grotesk': require('./assets/fonts/AktivGrotesk-Regular.ttf'),
        'Aktiv Grotesk Light': require('./assets/fonts/AktivGrotesk-Light.ttf'),
        'Aktiv Grotesk Thin': require('./assets/fonts/AktivGrotesk-Thin.ttf'),
        'Aktiv Grotesk Medium': require('./assets/fonts/AktivGrotesk-Medium.ttf'),
        'Aktiv Grotesk Bold': require('./assets/fonts/AktivGrotesk-Bold.ttf'),
        'Aktiv Grotesk Black': require('./assets/fonts/AktivGrotesk-Black.ttf'),
        'EvilIcons': require('./assets/fonts/icons/EvilIcons.ttf'),
        'Entypo': require('./assets/fonts/icons/Entypo.ttf'),
        'Feather': require('./assets/fonts/icons/Feather.ttf'),
        'FontAwesome': require('./assets/fonts/icons/FontAwesome.ttf'),
        'Ionicons': require('./assets/fonts/icons/Ionicons.ttf'),
        'Material Icons': require('./assets/fonts/icons/MaterialIcons.ttf'),
        'Material Design Icons': require('./assets/fonts/icons/MaterialCommunityIcons.ttf'),
        'Octicons': require('./assets/fonts/icons/Octicons.ttf'),
        'simple-line-icons': require('./assets/fonts/icons/SimpleLineIcons.ttf'),
        'zocial': require('./assets/fonts/icons/Zocial.ttf'),
        'Freight Sans Black': require('./assets/fonts/FreightSansBlackSC.otf'),
        'Aktiv Grotesk': require('./assets/fonts/AktivGrotesk-Regular.ttf'),
        'Aktiv Grotesk Light': require('./assets/fonts/AktivGrotesk-Light.ttf'),
        'Aktiv Grotesk Thin': require('./assets/fonts/AktivGrotesk-Thin.ttf'),
        'Aktiv Grotesk Medium': require('./assets/fonts/AktivGrotesk-Medium.ttf'),
        'Aktiv Grotesk Bold': require('./assets/fonts/AktivGrotesk-Bold.ttf'),
        'San Francisco': require('./assets/fonts/SFMono-Regular.ttf'),
        'San Francisco Medium': require('./assets/fonts/SFMono-Medium.otf'),
        'San Francisco Light': require('./assets/fonts/SFMono-Light.ttf'),
        'San Francisco Bold': require('./assets/fonts/SFMono-Bold.ttf'),
        'San Francisco Thin': require('./assets/fonts/SFMono-Thin.ttf'),
      }),
      // database.ref('/spaces/').once('value').then(function(snapshot) {
      //   app.setState({
      //     data : snapshot.val()
      //   });
      // }),
      new Promise(function(resolve, reject) {
        AsyncStorage.getItem('userKey').then((res) => {
          const userKey = res;
          app.setState({
            userLoggedIn: !!userKey,
            userKey: userKey,
          });
          database.ref('/users/' + userKey).on('value', function(snapshot) {
            const user = snapshot.val();
            app.setState({
              user: user
            });
            if(!!user) {
              let totalSet = new Set();
              const favouritesSet = new Set(user.favourites);
              let spacesSet = new Set();
              if(!!user.spaces) {
                spacesSet = new Set(Object.keys(user.spaces));
                totalSet = new Set([...favouritesSet, ...spacesSet]);
              } else {
                totalSet = favouritesSet;
              }
              app._getData([...totalSet]);
            }
            resolve('Database loading done');
          });
        });
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
