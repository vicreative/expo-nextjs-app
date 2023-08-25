import { AntDesign, Feather } from '@expo/vector-icons';
import { Button, FormButtonContainer, Input } from 'app/components/index';
import Modal from 'app/components/Modal';
import spacing from 'app/config/theme/spacing';
import { useFormik } from 'formik';
import useAppContext from 'app/hooks/useAppContext';
import en from 'app/i18n/index';
import { Text, Icon, HStack, Box, Stack, Heading, Flex } from 'native-base';
import { useState } from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { autoCapitalizeFirstLetter } from 'app/utils/index';
import { AddParticipantSchema } from './schema';
import useDimensions from 'app/hooks/useDimensions';

const initialState = {
  firstName: '',
  lastName: '',
  email: ''
};

export default function AddParticipant() {
  const { state, dispatch } = useAppContext('experienceDetails');
  const { state: userState } = useAppContext('user');

  const [showModal, setShowModal] = useState(false);

  const {
    screen: { height: SCREEN_HEIGHT }
  } = useDimensions();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: AddParticipantSchema,
    onSubmit: payload => handleSubmit(payload)
  });

  const handleSubmit = payload => {
    const data = {
      name: `${autoCapitalizeFirstLetter(payload.firstName)} ${autoCapitalizeFirstLetter(
        payload.lastName
      )}`,
      email: payload.email
    };
    state.participants.push(data);
    setShowModal(false);
    formik.resetForm();
  };

  return (
    state.noOfAdults > 1 && (
      <>
        <Stack mb={`${spacing[40]}px`} space={`${spacing[18]}px`}>
          <Heading fontSize={`${spacing[20]}px`}>
            {en.experiences.bookExperience.participants.title}
          </Heading>
          <Stack space={`${spacing[18]}px`}>
            <ParticipantCard
              title={`${userState.user?.firstName} ${userState.user?.lastName}`}
              rightElement={<Box height={{ base: SCREEN_HEIGHT * 0.0492, sm: '44px' }} />}
            />

            {/* Add Participants */}
            {Array.from(
              Array(
                state.noOfAdults - 1 > state.participants?.length
                  ? state.noOfAdults - state.participants?.length - 1
                  : 0
              ),
              (_, i) => (
                <ParticipantCard
                  key={i}
                  title={en.experiences.bookExperience.participants.heading}
                  rightElement={
                    <Button
                      colorScheme="secondary"
                      variant="outline"
                      size="md"
                      px={`${spacing[14]}px`}
                      onPress={() => setShowModal(true)}
                    >
                      {en.experiences.bookExperience.participants.add}
                    </Button>
                  }
                />
              )
            )}

            {/* Existing Participants */}
            {state.participants.length > 0 &&
              state.participants.map((participant, i) => {
                return (
                  <ParticipantCard
                    key={i}
                    title={participant.name}
                    rightElement={
                      <Button
                        colorScheme="secondary"
                        variant="outline"
                        size="md"
                        px={`${spacing[14]}px`}
                        onPress={() => {
                          state.participants.splice(i, 1);
                          dispatch({ noOfAdults: state.noOfAdults - 1 });
                        }}
                      >
                        {en.experiences.bookExperience.participants.remove}
                      </Button>
                    }
                  />
                );
              })}
          </Stack>
        </Stack>

        <Modal
          isDrawer
          closeOnOverlayClick
          animationType="fade"
          visible={showModal}
          onClose={() => setShowModal(false)}
          bg="transparent"
          statusBarBackgroundColor="transparent"
          justifyContent="flex-end"
          pt={0}
          maxWidth={{ base: '100%', sm: '400px' }}
        >
          <Box
            bg="white"
            borderTopRadius={`${spacing[20]}px`}
            height={{ base: 'auto', sm: '100%' }}
            maxHeight={{ base: SCREEN_HEIGHT * 0.8, sm: '100%' }}
            shadow={5}
          >
            <HStack
              justifyContent="space-between"
              px={`${spacing[24]}px`}
              pt={`${spacing[38]}px`}
              pb={`${spacing[24]}px`}
              width="100%"
              borderBottomWidth={1}
              borderBottomColor="gray.100"
            >
              <Heading fontSize={`${spacing[24]}px`}>
                {en.experiences.bookExperience.participants.heading}
              </Heading>

              <Button onPress={() => setShowModal(false)} size="sm" variant="unstyled" p={0}>
                <Icon
                  as={AntDesign}
                  name="closecircleo"
                  size={`${spacing[30]}px`}
                  color={'gray.500'}
                />
              </Button>
            </HStack>

            <Flex
              justifyContent="space-between"
              w="100%"
              h="88%"
              px={`${spacing[24]}px`}
              pb={{ base: `${spacing[40]}px`, sm: `${spacing[24]}px` }}
            >
              <KeyboardAwareScrollView
                keyboardShouldPersistTaps="always"
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="interactive"
              >
                <Stack space={`${spacing[20]}px`} pt={`${spacing[24]}px`} pb={`${spacing[40]}px`}>
                  <Input
                    id="firstName"
                    placeholder={en.experiences.bookExperience.participants.firstName.placeholder}
                    autoComplete={Platform.OS === 'ios' ? 'given-name' : 'name-given'}
                    textContentType="givenName"
                    value={formik.values.firstName}
                    onBlur={formik.handleBlur('firstName')}
                    onChangeText={formik.handleChange('firstName')}
                    isInvalid={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    errorMsg={formik.errors.firstName}
                    inputAccessoryViewID="Next"
                  />
                  <Input
                    id="lastName"
                    placeholder={en.experiences.bookExperience.participants.lastName.placeholder}
                    autoComplete={Platform.OS === 'ios' ? 'family-name' : 'name-family'}
                    textContentType="familyName"
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur('lastName')}
                    onChangeText={formik.handleChange('lastName')}
                    isInvalid={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    errorMsg={formik.errors.lastName}
                    inputAccessoryViewID="Next"
                  />
                  <Input
                    placeholder={en.experiences.bookExperience.participants.email.placeholder}
                    type="email"
                    id="email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={formik.values.email}
                    onBlur={formik.handleBlur('email')}
                    onChangeText={formik.handleChange('email')}
                    isInvalid={formik.touched.email && Boolean(formik.errors.email)}
                    errorMsg={formik.errors.email}
                    tip={en.experiences.bookExperience.participants.email.tip}
                    inputAccessoryViewID="Next"
                  />
                </Stack>
              </KeyboardAwareScrollView>
              <FormButtonContainer>
                <Button
                  colorScheme="secondary"
                  onPress={formik.handleSubmit}
                  isDisabled={Object.keys(formik.errors).length !== 0}
                >
                  {en.experiences.bookExperience.participants.save}
                </Button>
              </FormButtonContainer>
            </Flex>
          </Box>
        </Modal>
      </>
    )
  );
}

const ParticipantCard = ({ title, rightElement }) => {
  return (
    <HStack
      py={{ base: `${spacing[16]}px`, sm: `${spacing[24]}px` }}
      px={{ base: `${spacing[16]}px`, sm: `${spacing[32]}px` }}
      alignItems="center"
      justifyContent="space-between"
      borderWidth={1}
      borderColor="gray.100"
      borderRadius={`${spacing[10]}px`}
    >
      <HStack space={`${spacing[12]}px`} alignItems="center">
        <Icon as={Feather} name="user-plus" size={`${spacing[20]}px`} color="gray.500" />
        <Text fontFamily="Satoshi-Medium">{title}</Text>
      </HStack>
      {rightElement}
    </HStack>
  );
};
