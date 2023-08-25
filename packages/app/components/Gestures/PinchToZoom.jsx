import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const PinchToZoom = ({ children }) => {
  let baseScale = new Animated.Value(1);
  let pinchScale = new Animated.Value(1);
  let scale = Animated.multiply(baseScale, pinchScale);
  let lastScale = 1;

  const onPinchGestureEvent = Animated.event([{ nativeEvent: { scale: pinchScale } }], {
    useNativeDriver: true
  });
  const onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale *= event.nativeEvent.scale;
      baseScale.setValue(lastScale);
      pinchScale.setValue(1);
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchGestureEvent}
      onHandlerStateChange={onPinchHandlerStateChange}
    >
      <Animated.View
        style={[
          styles.pinchableImage,
          {
            transform: [{ perspective: 1 }, { scale: scale }]
          }
        ]}
      >
        {children}
      </Animated.View>
    </PinchGestureHandler>
  );
};
export default PinchToZoom;
const styles = StyleSheet.create({
  pinchableImage: {
    width: '100%',
    height: '100%'
  }
});
