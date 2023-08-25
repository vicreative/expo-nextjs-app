import { PHONE_REGEX } from 'app/constants';
import moment from 'moment';
import * as Yup from 'yup';

const RegistrationSchema = currentStep => {
  switch (currentStep) {
    case 1:
      return Yup.object().shape({
        phoneCode: Yup.string().required('Phone code is required'),
        phoneNumber: Yup.string()
          .required('Phone number is required')
          .matches(PHONE_REGEX, 'Phone number is not valid')
          .min(10, 'Phone number is not valid')
          .max(11, 'Phone number is not valid'),
        notificationType: Yup.string().required('Notification type is required')
      });
    case 2:
      return Yup.object().shape({
        token: Yup.string()
          .required('Token is required')
          .min(5, 'Minimum of 5 digits')
          .max(5, 'Maximum of 5 digits')
      });
    case 3:
      return Yup.object().shape({
        email: Yup.string('Enter your email')
          .required('Email is required')
          .email('Email is invalid'),
        password: Yup.string()
          .label('Password')
          .required('Password should not be empty')
          .min(8, ({ min }) => ` ${min} Characters or longer`)
      });
    case 4:
      return Yup.object().shape({
        name: Yup.string()
          .required('Full name is required')
          .matches(/^[a-zA-Z]+ [a-zA-Z]+$/, {
            message: 'Please enter a valid first and last name'
          })
      });
    case 5:
      return Yup.object().shape({
        dob: Yup.date()
          .required('Date of birth is required')
          .typeError('Invalid date format')
          .test('maxDate', `You must be at least 18 years old`, val => {
            const maxDate = new Date(moment(new Date()).subtract(18, 'years'));
            return maxDate < new Date(val) ? false : true;
          })
      });
    case 6:
      return Yup.object().shape({
        countryName: Yup.string().label('Country').required('Location is required')
      });
    default:
      return Yup.object().shape({});
  }
};

export default RegistrationSchema;
