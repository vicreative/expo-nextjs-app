import React, { forwardRef } from 'react';
import { Animated } from 'react-native';
import { Button as RNButton } from 'native-base';

const Button = forwardRef(
  (
    { onPressIn = () => {}, onPressOut = () => {}, depth, containerStyle = {}, children, ...rest },
    ref
  ) => {
    const animation = new Animated.Value(0);
    const inputRange = [0, 1];
    const outputRange = [1, depth ? depth : 0.9];
    const scale = animation.interpolate({ inputRange, outputRange });

    const handlePressIn = () => {
      Animated.spring(animation, {
        toValue: 0.3,
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
        <RNButton ref={ref} onPressIn={handlePressIn} onPressOut={handlePressOut} {...rest}>
          {children}
        </RNButton>
      </Animated.View>
    );
  }
);

export default Button;
