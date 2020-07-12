import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Paragraph} from 'react-native-paper';
import Image from 'react-native-fast-image';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Colors from '../../styles/Colors';
import Dimensions from '../../styles/Dimensions';
import TextHelper from '../../helpers/TextHelper';

export default class ActionsView extends Component {
  shouldComponentUpdate = (nextProps, nextState) => {
    return true;
  };

  handleLikePress = () => {
    const {postId, isLiked, onLike} = this.props;
    onLike(postId, !isLiked);
  };

  render() {
    const {author, likesCount, commentsCount, isLiked} = this.props;
    const containerStyle = [styles.container, this.props.style];

    return (
      <View style={containerStyle}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image source={{uri: author.avatar}} style={styles.avatar} />
          <TouchableOpacity style={styles.followButton}>
            <EntypoIcon name="plus" size={20} color={Colors.WHITE} />
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action} onPress={this.handleLikePress}>
          <EntypoIcon
            name="heart"
            size={Dimensions.ICON_MEDIUM}
            color={isLiked ? Colors.ROSE : Colors.WHITE}
          />
          <Paragraph style={styles.actionText}>
            {TextHelper.formatNumber(likesCount, 2)}
          </Paragraph>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action}>
          <IonIcon
            name="chatbubble-ellipses-sharp"
            size={Dimensions.ICON_MEDIUM}
            color={Colors.WHITE}
          />
          <Paragraph style={styles.actionText}>
            {String(commentsCount)}
          </Paragraph>
        </TouchableOpacity>

        <TouchableOpacity style={styles.action}>
          <IonIcon
            name="arrow-redo"
            size={Dimensions.ICON_MEDIUM}
            color={Colors.WHITE}
          />
          <Paragraph style={styles.actionText}>{'Share'}</Paragraph>
        </TouchableOpacity>
      </View>
    );
  }
}

ActionsView.propTypes = {
  postId: PropTypes.string.isRequired,
  author: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }).isRequired,
  likesCount: PropTypes.number.isRequired,
  commentsCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  onLike: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: 250,
    marginBottom: 40,
    marginRight: Dimensions.SPACING_SMALL,
  },
  avatarContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Dimensions.SPACING_MID,
  },
  avatar: {
    width: Dimensions.ICON_LARGE,
    height: Dimensions.ICON_LARGE,
    borderRadius: Dimensions.ICON_LARGE / 2,
    borderColor: Colors.WHITE,
    borderWidth: 1,
  },
  followButton: {
    position: 'absolute',
    bottom: -10,
    width: Dimensions.SPACING_MEDIUM,
    height: Dimensions.SPACING_MEDIUM,
    borderRadius: Dimensions.SPACING_MEDIUM / 2,
    backgroundColor: Colors.ROSE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  actionText: {
    color: Colors.WHITE,
    marginTop: -Dimensions.SPACING_MINIMUM,
    fontSize: Dimensions.FONT_SIZE_14,
  },
});
