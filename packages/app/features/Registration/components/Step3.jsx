import { Entypo } from '@expo/vector-icons';
import { BackButton, Button, Input, FormButtonContainer } from 'app/components/index';
import { Box, Flex, Heading, Hidden, Icon, Text, VStack } from 'native-base';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import { Platform } from 'react-native';
import { useFormik } from 'formik';
import RegistrationSchema from './schema';
import useDimensions from 'app/hooks/useDimensions';

export default function Step3({ next, getState, setCurrentStep, saveState }) {
  const state = getState();
  const {
    window: { height: HEIGHT }
  } = useDimensions();

  const onGoBack = () => {
    saveState(state);
    setCurrentStep(0);
  };

  const formik = useFormik({
    initialValues: {
      email: state.email || '',
      password: state.password || ''
    },
    validationSchema: RegistrationSchema(3),
    onSubmit: payload => {
      saveState({
        ...state,
        ...payload
      });
      next();
    }
  });

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only={['base', 'sm']}>
        <VStack width="100%" space={`${spacing[24]}`}>
          <BackButton onPress={onGoBack} />
          <RenderInput formik={formik} />
          <FormButtonContainer>
            <Button
              isDisabled={Object.keys(formik.errors).length !== 0}
              onPress={formik.handleSubmit}
            >
              {en.register.next}
            </Button>
          </FormButtonContainer>
        </VStack>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="md">
        <Flex justify="space-between" flexDirection="column" height="94%">
          <VStack mt={25}>
            <RenderInput formik={formik} />
          </VStack>
          <FormButtonContainer>
            <Flex flexDirection="row" width="100%" justifyContent="space-between">
              <Button
                variant="outline"
                p={0}
                _web={{ width: '55px', height: '55px', borderWidth: 1.5 }}
                width={HEIGHT * 0.067}
                height={HEIGHT * 0.067}
                borderRadius="full"
                borderWidth={2}
                onPress={onGoBack}
              >
                <Icon as={Entypo} name="chevron-up" size={'20px'} color="primary.600" />
              </Button>

              <Button
                isDisabled={Object.keys(formik.errors).length !== 0}
                onPress={formik.handleSubmit}
              >
                {en.register.next}
              </Button>
            </Flex>
          </FormButtonContainer>
        </Flex>
      </Hidden>
    </>
  );
}

const RenderInput = ({ formik }) => {
  return (
    <VStack>
      <Text color="gray.300" pb={18} fontSize={`${spacing[14]}px`}>
        {en.register.steps.three.progress}
      </Text>
      <Heading fontSize={`${spacing[26]}px`} mb={26}>
        {en.register.steps.three.title}
      </Heading>
      <Box mb={24}>
        <Input
          autoFocus
          id="email"
          type="email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          placeholder={en.register.steps.three.email.placeholder}
          value={formik.values.email}
          onBlur={formik.handleBlur('email')}
          onChangeText={formik.handleChange('email')}
          isInvalid={formik.touched.email && Boolean(formik.errors.email)}
          errorMsg={formik.errors.email}
          inputAccessoryViewID="Next"
        />
      </Box>
      <Box>
        <Input
          id="password"
          type="password"
          autoCapitalize="sentences"
          autoComplete={Platform.OS === 'android' ? 'password-new' : 'new-password'}
          textContentType="newPassword"
          placeholder={en.register.steps.three.password.placeholder}
          tip={en.register.steps.three.tip}
          value={formik.values.password}
          onBlur={formik.handleBlur('password')}
          onChangeText={formik.handleChange('password')}
          isInvalid={formik.touched.password && Boolean(formik.errors.password)}
          errorMsg={formik.errors.password}
          inputAccessoryViewID="Next"
        />
      </Box>
    </VStack>
  );
};
