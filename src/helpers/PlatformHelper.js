const {Dimensions} = require('react-native');

class PlatformHelper {
  getScreenWidth = () => {
    return Dimensions.get('screen').width;
  };

  getScreenHeight = () => {
    return Dimensions.get('screen').height;
  };
}

export default new PlatformHelper();
