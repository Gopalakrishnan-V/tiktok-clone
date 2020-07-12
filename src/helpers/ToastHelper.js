import {Platform, ToastAndroid} from 'react-native';

class ToastHelper {
  show = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  };
}

export default new ToastHelper();
