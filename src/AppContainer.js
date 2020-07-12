/* eslint-disable react/no-did-mount-set-state */
/**
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StatusBar, YellowBox, View, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme,
  ActivityIndicator,
} from 'react-native-paper';
import Axios from 'axios';
import AppStack from './navigation/RootNavigator';
import * as Apis from './constants/Apis';
import {getThemeMode, setThemeMode} from './helpers/ThemeHelper';
import {ThemeMode} from './constants';
import globalStyles from './styles/global';
import StorageHelper from './helpers/StorageHelper';
import {fetchMe} from './reducers/user';
import {bindActionCreators} from 'redux';

const CustomDefaultTheme = {...DefaultTheme};
const CustomDarkTheme = {
  ...DarkTheme,
  color: {...DarkTheme, placeholder: 'rgba(255,255,255,0.54)'},
};
YellowBox.ignoreWarnings([
  'Warning: componentWillUpdate',
  'Warning: componentWillReceiveProps',
  'Sending `onAnimatedValueUpdate`',
  'VirtualizedLists should never be nested',
]);

class AppContainer extends Component {
  state = {
    isLoading: true,
    isDark: false,
  };

  componentDidMount = async () => {
    let isDark = false;
    try {
      isDark = (await getThemeMode()) === ThemeMode.dark;
    } catch (e) {}
    this.setState({isDark, isLoading: false});
  };

  toggleTheme = () => {
    const isDark = !this.state.isDark;
    this.setState({isDark});

    const mode = isDark ? ThemeMode.dark : ThemeMode.light;
    setThemeMode(mode);
  };

  render = () => {
    const {isLoading, isDark} = this.state;
    const {isLoggedIn} = this.props;

    if (isLoading) {
      return (
        <View style={globalStyles.container}>
          <ActivityIndicator size={32} />
        </View>
      );
    }

    let theme = isDark ? CustomDarkTheme : CustomDefaultTheme;
    theme = {...theme, toggleTheme: this.toggleTheme};
    const statusBarColor = isDark ? '#000000' : '#3B008E';

    return (
      <>
        <PaperProvider theme={theme}>
          <StatusBar
            backgroundColor={statusBarColor}
            barStyle="light-content"
          />
          <NavigationContainer toggleTheme={this.toggleTheme}>
            <AppStack isLoggedIn={isLoggedIn} />
          </NavigationContainer>
        </PaperProvider>
      </>
    );
  };
}

export default connect(
  ({user}) => ({isLoggedIn: user.isLoggedIn}),
  (dispatch) => ({actions: bindActionCreators({fetchMe}, dispatch)}),
)(AppContainer);
