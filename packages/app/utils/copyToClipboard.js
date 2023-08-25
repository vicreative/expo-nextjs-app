import spacing from 'app/config/theme/spacing';
import * as Clipboard from 'expo-clipboard';
import en from 'app/i18n/index';
import { Box, Toast } from 'native-base';

const copyToClipboard = async (copyString, onCopy = () => {}, doSomethingAfterClick = () => {}) => {
  if (copyString !== '' && copyString !== undefined) {
    await Clipboard.setStringAsync(copyString);
    onCopy(true);
    Toast.show({
      render: () => {
        return (
          <Box
            bg="white"
            shadow={5}
            px={`${spacing[16]}px`}
            py={`${spacing[6]}px`}
            borderRadius="full"
          >
            {en.experiences.shareExperience.copied}
          </Box>
        );
      }
    });
    setTimeout(() => {
      onCopy(false);
      doSomethingAfterClick();
    }, 2000);
  }
};
export default copyToClipboard;
