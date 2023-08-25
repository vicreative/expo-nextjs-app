import { forwardRef } from 'react';
import ActionSheet from 'react-native-actions-sheet';

const BottomSheet = forwardRef(
  ({ gestureEnabled = true, closeAnimationDuration = 500, children, ...rest }, ref) => {
    return (
      <ActionSheet
        ref={ref}
        gestureEnabled={gestureEnabled}
        indicatorStyle={{ backgroundColor: 'white' }}
        closeAnimationDuration={closeAnimationDuration}
        {...rest}
      >
        {children}
      </ActionSheet>
    );
  }
);

export default BottomSheet;
