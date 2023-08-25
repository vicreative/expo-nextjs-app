import { Pressable } from 'native-base';
import React from 'react';
import { Animated } from 'react-native';

const Touchable = ({
  onPressIn = () => {},
  onPressOut = () => {},
  depth,
  containerStyle = {},
  children,
  ...rest
}) => {
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, depth ? depth : 0.97];
  const scale = animation.interpolate({ inputRange, outputRange });

  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true
    }).start();
    onPressIn();
  };
  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true
    }).start();
    onPressOut();
  };

  return (
    <Animated.View style={[{ transform: [{ scale }] }, containerStyle]}>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut} {...rest}>
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default Touchable;
