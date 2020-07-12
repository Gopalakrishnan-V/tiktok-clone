import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PlatformHelper from '../../helpers/PlatformHelper';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Title} from 'react-native-paper';
import Colors from '../../styles/Colors';
import Dimensions from '../../styles/Dimensions';

const FeedTopBar = (props) => {
  return (
    <View style={[props.style, styles.container]}>
      <TouchableOpacity style={styles.menuItem}>
        <Title style={styles.text}>Following</Title>
        <View style={styles.badge} />
      </TouchableOpacity>

      <View style={styles.divider} />

      <TouchableOpacity style={styles.menuItem}>
        <Title style={[styles.text, styles.selectedText]}>For You</Title>
      </TouchableOpacity>
    </View>
  );
};

export default FeedTopBar;

const styles = StyleSheet.create({
  container: {
    width: PlatformHelper.getScreenWidth(),
    height: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: Colors.SUBTITLE,
    fontSize: Dimensions.FONT_SIZE_16,
  },
  selectedText: {
    color: Colors.WHITE,
    fontSize: Dimensions.FONT_SIZE_18,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    width: 8,
    height: 8,
    borderRadius: 8 / 2,
    marginLeft: 2,
    marginBottom: 12,
    backgroundColor: Colors.YELLOW,
  },
  divider: {
    width: 1,
    height: 12,
    backgroundColor: Colors.WHITE,
    opacity: 0.5,
    marginHorizontal: Dimensions.SPACING_SMALL,
  },
});
