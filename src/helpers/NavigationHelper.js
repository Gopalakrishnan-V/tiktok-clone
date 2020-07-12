class NavigationHelper {
  gotoHomeScreen = (navigation, params = {}) => {
    navigation.navigate('Home', params);
  };
}

export default new NavigationHelper();
