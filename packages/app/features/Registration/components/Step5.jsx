import { Entypo } from '@expo/vector-icons';
import { BackButton, Button, DatePicker, FormButtonContainer } from 'app/components/index';
import { Flex, Heading, Hidden, Icon, VStack } from 'native-base';
import en from 'app/i18n/index';
import spacing from 'app/config/theme/spacing';
import { useFormik } from 'formik';
import RegistrationSchema from './schema';
import moment from 'moment';
import useDimensions from 'app/hooks/useDimensions';

const maxDate = new Date(moment(new Date()).subtract(18, 'years'));

export default function Step5({ back, next, getState, saveState }) {
  const state = getState();
  const {
    window: { height: HEIGHT }
  } = useDimensions();

  const formik = useFormik({
    initialValues: {
      dob: state.dob || new Date(maxDate)
    },
    validationSchema: RegistrationSchema(5),
    onSubmit: payload => {
      saveState({
        ...state,
        dob: moment(new Date(payload.dob)).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
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
                isDisabled={
                  Object.keys(formik.errors).length !== 0 || maxDate < new Date(formik.values.dob)
                }
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
      <Heading fontSize={`${spacing[26]}px`} mb={26}>
        {en.register.steps.four.dob.title}
      </Heading>
      <DatePicker
        variant="outline"
        placeholder={en.register.steps.four.dob.placeholder}
        tip={en.register.steps.four.dob.tip}
        value={new Date(formik.values.dob)}
        onBlur={formik.handleBlur('dob')}
        onChange={date => formik.setFieldValue('dob', date)}
        isInvalid={
          (formik.touched.dob && Boolean(formik.errors.dob)) ||
          maxDate < new Date(formik.values.dob)
        }
        errorMsg={formik.errors.dob}
        maxDate={new Date(maxDate)}
      />
    </VStack>
  );
};
