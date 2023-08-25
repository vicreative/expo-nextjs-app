import { Entypo } from '@expo/vector-icons';
import {
  BackButton,
  Button,
  LoadingState,
  Select,
  FormButtonContainer
} from 'app/components/index';
import { Box, Flex, Heading, Icon, Text, VStack, Hidden } from 'native-base';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import { useState } from 'react';
import { useFormik } from 'formik';
import RegistrationSchema from './schema';
import getFlagEmoji from 'app/utils/getFlagEmoji';
import useCountriesQuery from 'app/hooks/queries/useCountriesQuery';
import useAppContext from 'app/hooks/useAppContext';
import { Platform } from 'react-native';
import { useCreateUserMutation } from 'app/hooks/mutations/useCreateUser';
import { useRouter } from 'solito/router';
import useAsyncStorage from 'app/hooks/useAsyncStorage';
import { removePreviousRoute } from 'app/utils/auth';
import useDimensions from 'app/hooks/useDimensions';
import LightBulb from 'app/components/Icons/Bulb';

export default function Step6({ back, getState, resetState }) {
  const {
    window: { height: HEIGHT }
  } = useDimensions();

  const { previousPath } = useAsyncStorage();
  const { replace } = useRouter();
  const state = getState();
  const { state: userState, dispatch } = useAppContext('user');
  const { state: notificationState } = useAppContext('notification');
  const { createUser, createUserState } = useCreateUserMutation();

  const formik = useFormik({
    initialValues: {
      countryName: state.countryName || 'Nigeria',
      firstName: state.firstName || '',
      lastName: state.lastName || '',
      email: state.email || '',
      phoneCode: state.phoneCode || '',
      password: state.password || '',
      phoneNumber: state.phoneNumber || '',
      dob: state.dob || '',
      platform: Platform.OS.toUpperCase(),
      deviceToken: notificationState.pushToken
    },
    validationSchema: RegistrationSchema(6),
    onSubmit: payload => {
      const onSuccess = data => {
        dispatch({ ...userState, token: data.data.token, isLoggedIn: 'true' });
        resetState();

        if (previousPath !== null) {
          replace(previousPath, undefined, {
            experimental: {
              nativeBehavior: 'stack-replace'
            }
          });
          removePreviousRoute();
        } else {
          replace('/', undefined, {
            experimental: {
              nativeBehavior: 'stack-replace'
            }
          });
        }
      };

      const onError = error => {
        if (error.statusCode === 409) {
          resetState();
          replace('/login', undefined, {
            experimental: {
              nativeBehavior: 'stack-replace',
              isNestedNavigator: true
            }
          });
        }
      };

      createUser(payload, onSuccess, onError);
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
              onPress={formik.handleSubmit}
              isLoading={createUserState.isLoading}
              isDisabled={Object.keys(formik.errors).length !== 0 || createUserState.isLoading}
            >
              {en.register.next}
            </Button>
          </FormButtonContainer>
          <LocationCard />
        </VStack>
      </Hidden>
      {/* smaller device(mobile phones)for web & mobile app */}
      <Hidden from="md">
        <Flex justify="space-between" flexDirection="column" height="94%">
          <VStack mt={25}>
            <RenderInput formik={formik} />
            <LocationCard />
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
                onPress={back}
              >
                <Icon as={Entypo} name="chevron-up" size={'20px'} color="primary.600" />
              </Button>

              <Button
                onPress={formik.handleSubmit}
                isLoading={createUserState.isLoading}
                isDisabled={Object.keys(formik.errors).length !== 0 || createUserState.isLoading}
              >
                {en.register.next}
              </Button>
            </Flex>
          </FormButtonContainer>
        </Flex>
      </Hidden>
      {createUserState.isLoading && <LoadingState hasOpaqueBackground />}
    </>
  );
}

const RenderInput = ({ formik }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { data, isLoading } = useCountriesQuery(`supportedUsersCountries=true`);

  return (
    <VStack>
      <Text color="gray.300" pb={18} fontSize={`${spacing[14]}px`}>
        {en.register.steps.five.progress}
      </Text>
      <Heading fontSize={`${spacing[26]}px`} mb={26}>
        {en.register.steps.five.title}
      </Heading>
      <Box>
        <Select
          id="countryName"
          variant="outline"
          hideSearch // TODO: might remove this
          options={countries(data, isLoading)}
          placeholder={en.register.steps.five.placeholder}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          isLoading={isLoading}
          value={formik.values.countryName}
          onBlur={formik.handleBlur('countryName')}
          onChange={val => formik.setFieldValue('countryName', val)}
          isInvalid={formik.touched.countryName && Boolean(formik.errors.countryName)}
          errorMsg={formik.errors.countryName}
          isDisabled
          opacity={1}
        />
      </Box>
    </VStack>
  );
};

const LocationCard = () => (
  <Flex
    flexDirection="row"
    justifyContent="space-between"
    py={16}
    px={20}
    borderRadius={5}
    borderWidth={0.8}
    borderColor="gray.100"
    mt={`${spacing[55]}`}
  >
    <Box width="14%">
      <LightBulb width={`${spacing[24]}px`} height={`${spacing[24]}px`} />
    </Box>
    <VStack width="86%" space={`${spacing[8]}px`}>
      <Heading fontSize={`${spacing[16]}px`}>{en.register.steps.five.cardTitle}</Heading>
      <Text color="gray.400" fontSize={`${spacing[14]}px`}>
        {en.register.steps.five.cardContent}
      </Text>
    </VStack>
  </Flex>
);

const countries = (countries, isLoading) =>
  isLoading
    ? [
        {
          id: 0,
          label: `${getFlagEmoji('NG')} Nigeria`,
          value: 'Nigeria'
        }
      ]
    : countries
        ?.filter(country => country.name === 'Nigeria')
        ?.sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))
        ?.map(country => ({
          id: country.uuid,
          label: `${getFlagEmoji(country.code)} ${country.name}`,
          value: country.name
        }));
