import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import PlatformHelper from '../../helpers/PlatformHelper';
import PropTypes from 'prop-types';
import {Paragraph, Caption} from 'react-native-paper';
import TextTicker from 'react-native-text-ticker';
import LottieView from 'lottie-react-native';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import Colors from '../../styles/Colors';
import Dimensions from '../../styles/Dimensions';

const speakerAnimation = require('../../assets/animations/speakers-music.json');

export default class Footer extends PureComponent {
  componentDidMount = () => {};

  render() {
    const {description, sound, author} = this.props;
    const containerStyle = [styles.container, this.props.style];
    return (
      <View style={containerStyle}>
        <Paragraph style={styles.authorName}>{`@${author.name}`}</Paragraph>
        <Caption style={styles.description}>{description}</Caption>
        <View style={styles.bottomRow}>
          <View style={styles.bottomRowLeft}>
            <EntypoIcon
              name="music"
              size={Dimensions.ICON_SMALL}
              color={Colors.WHITE}
              style={styles.musicIcon}
            />
            <TextTicker
              duration={6000}
              loop
              bounce
              repeatSpacer={24}
              marqueeDelay={1000}
              style={styles.soundName}>
              {sound.title}
            </TextTicker>
          </View>

          <View style={styles.bottomRowRight}>
            <LottieView
              ref={(animation) => (this._animation = animation)}
              source={speakerAnimation}
              autoPlay
              loop
              style={styles.animatedView}
            />
          </View>
        </View>
      </View>
    );
  }
}

Footer.propTypes = {
  description: PropTypes.string.isRequired,
  sound: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
  }).isRequired,
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: PlatformHelper.getScreenWidth() - Dimensions.SPACING_SMALL * 2,
    backgroundColor: 'transparent',
    marginHorizontal: Dimensions.SPACING_SMALL,
    marginBottom: Dimensions.SPACING_MID,
  },
  authorName: {
    color: Colors.WHITE,
    fontSize: Dimensions.FONT_SIZE_14,
  },
  description: {
    color: Colors.SUBTITLE,
    fontSize: Dimensions.FONT_SIZE_14,
    marginTop: Dimensions.SPACING_TINY,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Dimensions.SPACING_TINY,
  },
  bottomRowLeft: {
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  musicIcon: {
    marginRight: Dimensions.SPACING_MINIMUM,
  },
  bottomRowRight: {
    position: 'relative',
    flex: 5,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  soundName: {
    marginTop: Dimensions.SPACING_MINIMUM,
    color: Colors.SUBTITLE,
    fontSize: Dimensions.FONT_SIZE_14,
  },
  animatedView: {
    position: 'absolute',
    alignSelf: 'flex-end',
    bottom: -Dimensions.SPACING_SMALL,
    right: -Dimensions.SPACING_MINIMUM,
    width: 80,
    height: 80,
  },
});
