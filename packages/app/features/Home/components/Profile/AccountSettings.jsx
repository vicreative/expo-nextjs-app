import React, { useState, useEffect } from 'react';
import { Box, Divider, Heading, Hidden, HStack, Icon, ScrollView, Stack, Text } from 'native-base';
import spacing from 'app/config/theme/spacing';
import en from 'app/i18n/index';
import { Button, Container, DatePicker, Input, Select } from 'app/components/index';
import useAppContext from 'app/hooks/useAppContext';
import { Feather } from '@expo/vector-icons';
import { useFormik } from 'formik';
import useGenderQuery from 'app/hooks/queries/useGenderQuery';
import { dateCompare, resolveFileUrl } from 'app/utils/index';
import { useUpdateUserMutation } from 'app/hooks/mutations/useUserProfile';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import UploadModal from 'app/components/Modal/UploadModal';
import uploadToAws from 'app/utils/uploadToAws';
import { UpdateAccountSchema } from './components/schema';
import AccountLayout from 'app/components/Layout/AccountLayout';

const maxDate = new Date(moment(new Date()).subtract(18, 'years'));

const genderList = genders =>
  genders &&
  genders.map(gender => {
    return {
      id: gender.uuid,
      label: gender.name,
      value: gender.uuid
    };
  });

function AccountSettings() {
  const queryClient = useQueryClient();
  const [isFocused, setIsFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { state } = useAppContext('user');
  const { data: genders, isLoading } = useGenderQuery();
  const { updateUser, updateUserState } = useUpdateUserMutation();

  const initialValues = {
    firstName: state.user?.firstName || '',
    lastName: state.user?.lastName || '',
    email: state.user?.email || '',
    phoneNumber: state.user?.phoneNumber ? `+${state.user?.phoneNumber}` : '',
    genderId: state.user?.genderId || '',
    dob: state.user?.dob ? new Date(state.user?.dob) : '',
    avatar: state.user?.avatar || null,
    image: null
  };

  const updateProfile = avatar => {
    const data = {
      genderId: formik.values.genderId,
      avatar: avatar,
      dob: moment(new Date(formik.values.dob)).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    };

    const onSuccess = () => {
      queryClient.invalidateQueries(['profile']);
      setIsSubmitting(false);
    };

    const onError = () => {
      setIsSubmitting(false);
    };

    updateUser(data, onSuccess, onError);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (formik.values.image) {
      await uploadToAws(formik.values.image, data => updateProfile(data.fileName));
    } else {
      updateProfile(formik.values.avatar);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: UpdateAccountSchema,
    onSubmit: handleSubmit
  });

  useEffect(() => {
    if (state.user) {
      formik.setValues(initialValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);

  const handleUpload = image => {
    formik.setFieldValue('image', image, true);
  };

  return (
    <>
      {/* larger device(tablet & desktop) for web only */}
      <Hidden only="base">
        <AccountLayout>
          <Box mt="46px" px={{ base: '20px', md: '50px', lg: '98px' }}>
            <Box>
              <Heading fontSize={`${spacing[18]}px`} mb={`${spacing[4]}px`}>
                {en.profile.account.info.update.heading}
              </Heading>
              <Text fontSize={`${spacing[14]}px`} color="gray.300">
                {en.profile.account.info.update.subheading}
              </Text>
            </Box>

            <Divider bg="gray.100" thickness="1" mt="20px" mb="40px" />

            {/* Name */}
            <HStack justifyContent="space-between" mr={{ base: 0, lg: '80px' }}>
              <Box width="25%">
                <Text fontSize={`${spacing[14]}px`} fontFamily="Satoshi-Medium">
                  {en.profile.account.info.name.heading}
                </Text>
              </Box>
              <Box width="73%">
                <HStack justifyContent="space-between" maxWidth="512px">
                  <Box width="48%">
                    <Input
                      id="firstName"
                      value={formik.values.firstName}
                      onBlur={formik.handleBlur('firstName')}
                      onChangeText={formik.handleChange('firstName')}
                      label={en.profile.account.info.name.firstname.label}
                      placeholder={en.profile.account.info.name.firstname.label}
                      isDisabled
                      width="100%"
                      InputRightElement={<Icon as={Feather} name={'lock'} size={'16px'} />}
                    />
                  </Box>
                  <Box width="48%">
                    <Input
                      id="lastName"
                      value={formik.values.lastName}
                      onBlur={formik.handleBlur('lastName')}
                      onChangeText={formik.handleChange('lastName')}
                      label={en.profile.account.info.name.lastname.label}
                      placeholder={en.profile.account.info.name.lastname.label}
                      isDisabled
                      width="100%"
                      InputRightElement={<Icon as={Feather} name={'lock'} size={'16px'} />}
                    />
                  </Box>
                </HStack>
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" my="20px" />

            {/* Email */}
            <HStack justifyContent="space-between" mr={{ base: 0, lg: '80px' }}>
              <Box width="25%">
                <Text fontSize={`${spacing[14]}px`} fontFamily="Satoshi-Medium">
                  {en.profile.account.info.email.heading}
                </Text>
              </Box>
              <Box width="73%">
                <Input
                  id="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur('email')}
                  onChangeText={formik.handleChange('email')}
                  label={en.profile.account.info.email.label}
                  placeholder={en.profile.account.info.email.label}
                  isDisabled
                  width="100%"
                  maxWidth="512px"
                  InputRightElement={<Icon as={Feather} name={'lock'} size={'16px'} />}
                />
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" my="20px" />

            {/* Photo */}
            <HStack justifyContent="space-between" mr={{ base: 0, lg: '80px' }}>
              <Box width="25%">
                <Text fontSize={`${spacing[14]}px`} fontFamily="Satoshi-Medium">
                  {en.profile.account.info.photo.heading}
                </Text>
                <Text fontSize={`${spacing[14]}px`}>
                  {en.profile.account.info.photo.subheading}
                </Text>
              </Box>
              <Box width="73%">
                <Box maxWidth="512px">
                  <UploadModal
                    showColumns
                    size={`${spacing[64]}px`}
                    file={state.user?.avatar ? { uri: resolveFileUrl(state.user?.avatar) } : null}
                    onUpload={handleUpload}
                    disableDelete={state.user?.avatar !== null && formik.values.image === null}
                    uploadLabel={en.profile.account.info.photo.upload.label}
                    uploadInfo={en.profile.account.info.photo.upload.content}
                  />
                </Box>
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" my="20px" />

            {/* Phone number */}
            <HStack justifyContent="space-between" mr={{ base: 0, lg: '80px' }}>
              <Box width="25%">
                <Text fontSize={`${spacing[14]}px`} fontFamily="Satoshi-Medium">
                  {en.profile.account.info.phonenumber.heading}
                </Text>
              </Box>
              <Box width="73%">
                <Input
                  id="phoneNumber"
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur('phoneNumber')}
                  onChangeText={formik.handleChange('phoneNumber')}
                  label={en.profile.account.info.phonenumber.label}
                  placeholder={en.profile.account.info.phonenumber.label}
                  width="100%"
                  maxWidth="512px"
                  isDisabled
                  InputRightElement={<Icon as={Feather} name={'lock'} size={'16px'} />}
                />
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" my="20px" />

            {/* Gender */}
            <HStack justifyContent="space-between" mr={{ base: 0, lg: '80px' }}>
              <Box width="25%">
                <Text fontSize={`${spacing[14]}px`} fontFamily="Satoshi-Medium">
                  {en.profile.account.info.gender.heading}
                </Text>
              </Box>
              <Box width="73%">
                <Box maxWidth="512px">
                  <Select
                    id="genderId"
                    variant="outline"
                    hideSearch
                    options={genderList(genders)}
                    label={en.profile.account.info.gender.label}
                    placeholder={en.profile.account.info.gender.placeholder}
                    isFocused={isFocused}
                    setIsFocused={setIsFocused}
                    isLoading={isLoading}
                    value={formik.values.genderId}
                    onBlur={formik.handleBlur('genderId')}
                    onChange={val => formik.setFieldValue('genderId', val)}
                    isInvalid={formik.touched.genderId && Boolean(formik.errors.genderId)}
                    errorMsg={formik.errors.genderId}
                  />
                </Box>
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" my="20px" />

            {/* Date of birth */}
            <HStack justifyContent="space-between" mr={{ base: 0, lg: '80px' }}>
              <Box width="25%">
                <Text fontSize={`${spacing[14]}px`} fontFamily="Satoshi-Medium">
                  {en.profile.account.info.dob.heading}
                </Text>
              </Box>
              <Box width="73%">
                <DatePicker
                  variant="outline"
                  maxWidth="512px"
                  placeholder={en.profile.account.info.dob.placeholder}
                  label={en.profile.account.info.dob.label}
                  tip={en.register.steps.four.dob.tip}
                  value={formik.values.dob}
                  onBlur={formik.handleBlur('dob')}
                  onChange={date => formik.setFieldValue('dob', date)}
                  isInvalid={
                    (formik.touched.dob && Boolean(formik.errors.dob)) ||
                    maxDate < new Date(formik.values.dob)
                  }
                  errorMsg={formik.errors.dob}
                  maxDate={new Date(maxDate)}
                />
              </Box>
            </HStack>

            <Divider bg="gray.100" thickness="1" my="20px" />

            {/* Buttons */}
            <HStack space="20px" alignSelf="flex-end">
              <Button
                variant="outline"
                colorScheme="secondary"
                size="md"
                fontFamily="Satoshi-Medium"
                px="18px"
                onPress={() => formik.setValues(initialValues)}
              >
                {en.profile.account.info.cancel}
              </Button>
              <Button
                variant="solid"
                colorScheme="secondary"
                size="md"
                fontFamily="Satoshi-Medium"
                px="18px"
                type="submit"
                isDisabled={
                  Object.keys(formik.errors).length !== 0 ||
                  (formik.values.genderId === state.user?.genderId &&
                    formik.values.image === null &&
                    dateCompare(formik.values.dob, state.user?.dob)) ||
                  isLoading ||
                  updateUserState.isLoading ||
                  isSubmitting
                }
                isLoading={updateUserState.isLoading || isSubmitting}
                onPress={formik.handleSubmit}
              >
                {en.profile.account.info.save}
              </Button>
            </HStack>
          </Box>
        </AccountLayout>
      </Hidden>

      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="sm">
        <Container pt={0} px={0} headerTitle={en.profile.account.info.heading}>
          <Box maxH="84%" h="100%" _web={{ overflowY: 'scroll', height: '88vh' }}>
            <ScrollView
              pt={`${spacing[40]}px`}
              px={`${spacing[24]}px`}
              showsVerticalScrollIndicator={false}
            >
              <Box mb={`${spacing[20]}px`}>
                <Heading fontSize={`${spacing[20]}px`} mb={`${spacing[4]}px`}>
                  {en.profile.account.info.update.heading}
                </Heading>
                <Text fontSize={`${spacing[14]}px`} color="gray.300">
                  {en.profile.account.info.update.subheading}
                </Text>
              </Box>
              <Stack space={`${spacing[24]}px`}>
                <Input
                  id="firstName"
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur('firstName')}
                  onChangeText={formik.handleChange('firstName')}
                  placeholder={en.profile.account.info.name.firstname.label}
                  isDisabled
                  width="100%"
                  InputRightElement={<Icon as={Feather} name={'lock'} size={'16px'} />}
                />
                <Input
                  id="lastName"
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur('lastName')}
                  onChangeText={formik.handleChange('lastName')}
                  placeholder={en.profile.account.info.name.lastname.label}
                  isDisabled
                  width="100%"
                  InputRightElement={<Icon as={Feather} name={'lock'} size={'16px'} />}
                />
                <Input
                  id="phoneNumber"
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur('phoneNumber')}
                  onChangeText={formik.handleChange('phoneNumber')}
                  placeholder={en.profile.account.info.phonenumber.label}
                  width="100%"
                  isDisabled
                  InputRightElement={<Icon as={Feather} name={'lock'} size={'16px'} />}
                />
                <Input
                  id="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur('email')}
                  onChangeText={formik.handleChange('email')}
                  placeholder={en.profile.account.info.email.label}
                  isDisabled
                  width="100%"
                  InputRightElement={<Icon as={Feather} name={'lock'} size={'16px'} />}
                />
                <Select
                  hideSearch
                  id="genderId"
                  variant="outline"
                  options={genderList(genders)}
                  placeholder={en.profile.account.info.gender.placeholder}
                  isFocused={isFocused}
                  setIsFocused={setIsFocused}
                  isLoading={isLoading}
                  value={formik.values.genderId}
                  onBlur={formik.handleBlur('genderId')}
                  onChange={val => formik.setFieldValue('genderId', val)}
                  isInvalid={formik.touched.genderId && Boolean(formik.errors.genderId)}
                  errorMsg={formik.errors.genderId}
                />
                <DatePicker
                  variant="outline"
                  placeholder={en.profile.account.info.dob.placeholder}
                  tip={en.register.steps.four.dob.tip}
                  value={formik.values.dob}
                  onBlur={formik.handleBlur('dob')}
                  onChange={date => formik.setFieldValue('dob', date)}
                  isInvalid={
                    (formik.touched.dob && Boolean(formik.errors.dob)) ||
                    maxDate < new Date(formik.values.dob)
                  }
                  errorMsg={formik.errors.dob}
                  maxDate={new Date(maxDate)}
                />
              </Stack>
            </ScrollView>
          </Box>
          <Box
            h="16%"
            w="100%"
            bg="white"
            px={`${spacing[24]}px`}
            pt={`${spacing[20]}px`}
            _web={{ position: 'fixed', bottom: 0, py: `${spacing[20]}px` }}
          >
            <Button
              colorScheme="secondary"
              fontFamily="Satoshi-Medium"
              size="xl"
              isDisabled={
                Object.keys(formik.errors).length !== 0 ||
                (formik.values.genderId === state.user?.genderId &&
                  dateCompare(formik.values.dob, state.user?.dob)) ||
                isLoading ||
                updateUserState.isLoading ||
                isSubmitting
              }
              isLoading={updateUserState.isLoading || isSubmitting}
              onPress={formik.handleSubmit}
            >
              {en.profile.account.info.save}
            </Button>
          </Box>
        </Container>
      </Hidden>
    </>
  );
}

export default AccountSettings;
