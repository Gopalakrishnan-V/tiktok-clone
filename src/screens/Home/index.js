import React, {Component} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {withTheme} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ViewPager from '@react-native-community/viewpager';
import Colors from '../../styles/Colors';
import LottieView from 'lottie-react-native';
import PostSlide from '../../components/PostSlide';
import {fetchPosts, updatePostLike} from '../../reducers/posts';
import PlatformHelper from '../../helpers/PlatformHelper';
import FeedTopBar from '../../components/FeedTopBar';

const loaderAnimation = require('../../assets/animations/tiktok-loader.json');

const SCREEN_WIDTH = PlatformHelper.getScreenWidth();
const SCREEN_HEIGHT = PlatformHelper.getScreenHeight();

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      isTopBarVisible: true,
    };
    this.isUnMounted = false;
  }

  componentDidMount = async () => {
    await this.props.actions.fetchPosts();

    setTimeout(() => {
      if (!this.isUnMounted) {
        this.setState({isTopBarVisible: false});
      }
    }, 3000);
  };

  componentWillUnmount = () => {
    this.isUnMounted = true;
  };

  handleLikePress = (postId, flag) => {
    this.props.actions.updatePostLike(postId, flag);
  };

  renderPost = (post, postIndex) => {
    const {id} = post;
    const canPlay = this.state.position === postIndex;

    return (
      <PostSlide
        key={id}
        {...post}
        canPlay={canPlay}
        onLike={this.handleLikePress}
      />
    );
  };

  onPageSelected = (e) => {
    const {position} = e.nativeEvent;
    this.setState({position});
  };

  renderLoader = () => {
    return (
      <View style={styles.loaderContainer}>
        <LottieView
          ref={(animation) => (this._animation = animation)}
          source={loaderAnimation}
          autoPlay
          loop
          style={styles.loader}
        />
      </View>
    );
  };

  render() {
    const {isTopBarVisible} = this.state;
    const {isLoading, postsList} = this.props;

    return (
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />

        {isLoading ? (
          this.renderLoader()
        ) : (
          <>
            <ViewPager
              style={styles.viewPager}
              orientation="vertical"
              initialPage={0}
              onPageSelected={this.onPageSelected}>
              {postsList.map(this.renderPost)}
            </ViewPager>
            {isTopBarVisible && <FeedTopBar style={styles.topbar} />}
          </>
        )}
      </View>
    );
  }
}

export default connect(
  ({posts}) => ({postsList: posts.postsList, isLoading: posts.isLoading}),
  (dispatch) => ({
    actions: bindActionCreators(
      {
        fetchPosts,
        updatePostLike,
      },
      dispatch,
    ),
  }),
)(withTheme(HomeScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: Colors.BLACK,
  },
  viewPager: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  post: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    fontSize: 32,
    color: Colors.WHITE,
  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  video: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    width: 80,
    height: 80,
  },
  topbar: {
    position: 'absolute',
    top: 32,
  },
});
