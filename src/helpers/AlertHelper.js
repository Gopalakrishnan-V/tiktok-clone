import {Alert} from 'react-native';

class AlertHelper {
  alert = (title, message, buttons, options) => {
    return Alert.alert(
      title,
      message,
      buttons || [
        {
          text: 'OK',
          style: 'cancel',
        },
      ],
      options || {cancelable: true},
    );
  };
}

export default new AlertHelper();
