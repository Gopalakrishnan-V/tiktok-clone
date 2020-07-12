import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../../styles/Colors';
import Video from 'react-native-video';
import PlatformHelper from '../../helpers/PlatformHelper';
import Footer from './Footer';
import ActionsView from './ActionsView';

class PostSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPaused: false,
    };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    if (nextProps.canPlay !== this.props.canPlay) {
      return true;
    } else if (nextState.isPaused !== this.state.isPaused) {
      return true;
    } else if (nextProps.isLiked !== this.props.isLiked) {
      return true;
    }

    return false;
  };

  render = () => {
    const {
      id,
      videoUrl,
      description,
      sound,
      author,
      likesCount,
      commentsCount,
      canPlay,
      isLiked,
      onLike,
    } = this.props;

    const paused = !canPlay || this.state.isPaused;

    return (
      <View style={styles.container}>
        <Video
          ref={(ref) => (this._video = ref)}
          source={{uri: videoUrl}}
          paused={paused}
          style={styles.video}
          resizeMode="cover"
          repeat={true}
        />
        <View style={styles.overlay}>
          <ActionsView
            postId={id}
            author={author}
            likesCount={likesCount}
            commentsCount={commentsCount}
            style={styles.actionsView}
            isLiked={isLiked}
            onLike={onLike}
          />
          <Footer
            author={author}
            description={description}
            sound={sound}
            style={styles.footer}
          />
        </View>
      </View>
    );
  };
}

export default PostSlide;

PostSlide.propTypes = {
  id: PropTypes.string.isRequired,
  videoUrl: PropTypes.string.isRequired,
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
  likesCount: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,

  canPlay: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

PostSlide.defaultProps = {};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  video: {
    width: PlatformHelper.getScreenWidth(),
    height: PlatformHelper.getScreenHeight(),
  },
  overlay: {
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    bottom: 0,
    width: PlatformHelper.getScreenWidth(),
    height: PlatformHelper.getScreenHeight() - 54,
    backgroundColor: 'transparent',
    opacity: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  actionsView: {
    alignSelf: 'flex-end',
  },
  footer: {},
});
