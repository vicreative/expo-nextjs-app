import { Entypo } from '@expo/vector-icons';
import spacing from 'app/config/theme/spacing';
import { Icon } from 'native-base';
import { useRouter } from 'solito/router';
import Button from './Button';

export default function BackButton({
  variant = 'unstyled',
  colorScheme = 'secondary',
  mb = `${spacing[40]}`,
  onPress,
  ...rest
}) {
  const { back } = useRouter();

  const onGoBack = () => {
    if (typeof onPress === 'function') {
      onPress();
    } else {
      back();
    }
  };
  return (
    <Button
      variant={variant}
      colorScheme={colorScheme}
      size="sm"
      leftIcon={<Icon as={Entypo} name="chevron-left" size={'20px'} />}
      alignSelf="flex-start"
      mb={mb}
      p={0}
      onPress={onGoBack}
      {...rest}
    >
      Go Back
    </Button>
  );
}
