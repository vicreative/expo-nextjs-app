import { Entypo } from '@expo/vector-icons';
import { BackButton, Button, DatePicker, Input, FormButtonContainer } from 'app/components/index';
import { Box, Flex, Heading, Hidden, Icon, Text, VStack } from 'native-base';
import en from 'app/i18n/index';
import { Keyboard } from 'react-native';
import { useKeyboard } from '@react-native-community/hooks';
import spacing from 'app/config/theme/spacing';
import { useState } from 'react';
import { useFormik } from 'formik';
import RegistrationSchema from './schema';
import Modal from 'app/components/Modal';
import { autoCapitalizeFirstLetter } from 'app/utils/index';
import useDimensions from 'app/hooks/useDimensions';

export default function Step4({ back, next, getState, saveState }) {
  const keyboard = useKeyboard();
  const state = getState();
  const {
    window: { height: HEIGHT },
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const formik = useFormik({
    initialValues: {
      name: state.firstName && state.lastName ? `${state.firstName} ${state.lastName}` : ''
    },
    validationSchema: RegistrationSchema(4),
    onSubmit: payload => {
      const data = {
        firstName: autoCapitalizeFirstLetter(payload.name.split(' ')[0]),
        lastName: autoCapitalizeFirstLetter(payload.name.split(' ')[1])
      };

      saveState({
        ...state,
        ...data
      });
      next();
    }
  });

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only={['base', 'sm']}>
        <VStack width="100%" space={`${spacing[24]}`}>
          <BackButton onPress={back} />
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
            {SCREEN_HEIGHT < 840 && keyboard.keyboardShown ? null : (
              <Box>
                <Heading fontSize={26} mb={26} opacity={0.2}>
                  {en.register.steps.four.dob.title}
                </Heading>
                <Box height={22}>
                  <DatePicker
                    variant="outline"
                    placeholder={en.register.steps.four.dob.placeholder}
                    isDisabled
                  />
                </Box>
              </Box>
            )}
            <Flex
              flexDirection="row"
              width="100%"
              justifyContent="space-between"
              bg="white"
              pt={HEIGHT * 0.024}
            >
              <Button
                variant="outline"
                p={0}
                _web={{ width: '55px', height: '55px', borderWidth: 1.5 }}
                width={HEIGHT * 0.067}
                height={HEIGHT * 0.067}
                borderRadius="full"
                borderWidth={2}
                onPress={back}
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
  const [showModal, setShowModal] = useState(false);
  const {
    window: { height: HEIGHT }
  } = useDimensions();

  return (
    <VStack>
      <Text color="gray.300" pb={18} fontSize={`${spacing[14]}px`}>
        {en.register.steps.four.progress}
      </Text>
      <Heading fontSize={`${spacing[26]}px`} mb={26}>
        {en.register.steps.four.title}
      </Heading>
      <Box>
        <Input
          id="name"
          autoFocus
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
          placeholder={en.register.steps.four.name.placeholder}
          tip={en.register.steps.four.tip}
          value={formik.values.name}
          onBlur={formik.handleBlur('name')}
          onChangeText={formik.handleChange('name')}
          isInvalid={formik.touched.name && Boolean(formik.errors.name)}
          errorMsg={formik.errors.name}
          inputAccessoryViewID="Next"
          tipBtn={
            <>
              {/* larger device(tablet & desktop) for web only */}
              <Hidden only={'base'}>
                <Text
                  fontSize={`${spacing[14]}px`}
                  color="primary.600"
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowModal(true);
                  }}
                  textDecorationLine="underline"
                >
                  {en.register.steps.four.tipBtnText}
                </Text>
              </Hidden>
              {/* smaller device(mobile phones)for web & mobile app */}
              <Hidden from="sm">
                <Text
                  fontSize={`${spacing[14]}px`}
                  color="primary.600"
                  onPress={() => {
                    Keyboard.dismiss();
                    setShowModal(true);
                  }}
                  textDecorationLine="underline"
                >
                  {en.register.steps.four.tipBtnText}
                </Text>
              </Hidden>
            </>
          }
        />
      </Box>

      <Modal
        closeOnOverlayClick
        bg="transparent"
        animationType="fade"
        visible={showModal}
        onClose={() => setShowModal(false)}
        maxWidth={{ base: '100%', sm: '424px' }}
        px={0}
        alignItems="center"
        justifyContent={{ base: 'flex-end', sm: 'center' }}
      >
        <VStack
          width="100%"
          overflow="scroll"
          bg="white"
          p={`${spacing[24]}px`}
          borderTopRadius={`${spacing[20]}px`}
          borderBottomRadius={{ base: 0, sm: `${spacing[20]}px` }}
        >
          <Heading fontSize={24}>{en.register.steps.four.bottomSheetTitle}</Heading>
          <Text color="gray.300" pt={7} pb={HEIGHT * 0.0559} fontSize={18}>
            {en.register.steps.four.bottomSheetContent}
          </Text>
          <Button
            variant="solid"
            colorScheme="secondary"
            w="100%"
            onPress={() => setShowModal(false)}
          >
            {en.register.steps.four.bottomSheetBtnText}
          </Button>
        </VStack>
      </Modal>
    </VStack>
  );
};
