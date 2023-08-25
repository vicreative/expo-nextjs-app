import { Box } from 'native-base';
import { Platform } from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import { InputAccessoryView } from 'react-native';
import useDimensions from 'app/hooks/useDimensions';

export default function FormButtonContainer({ children }) {
  const keyboard = useKeyboard();
  const {
    window: { height }
  } = useDimensions();

  return (
    <>
      {Platform.OS === 'ios' && (
        <InputAccessoryView nativeID="Next">
          <Box
            display={!keyboard.keyboardShown && 'none'}
            width="100%"
            px={`${height * 0.024}px`}
            pb={`${height * 0.02}px`}
            bg="white"
          >
            {children}
          </Box>
        </InputAccessoryView>
      )}

      {Platform.OS === 'ios' ? (
        !keyboard.keyboardShown && (
          <Box width="100%" pb={`${height * 0.02}px`}>
            {children}
          </Box>
        )
      ) : (
        <Box width="100%" pb={`${height * 0.02}px`}>
          {children}
        </Box>
      )}
    </>
  );
}
