import moment from 'moment';
import * as Yup from 'yup';

export const UpdateAccountSchema = Yup.object().shape({
  genderId: Yup.string().label('Gender').required('Gender is required'),
  avatar: Yup.string().label('File Name').nullable(),
  dob: Yup.date()
    .required('Date of birth is required')
    .typeError('Invalid date format')
    .test('maxDate', `You must be at least 18 years old`, val => {
      const maxDate = new Date(moment(new Date()).subtract(18, 'years'));

      return maxDate < new Date(val) ? false : true;
    })
});

export const UpdatePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .label('Old Password')
    .required('Enter your current password')
    .min(8, ({ min }) => ` ${min} Characters or longer`),
  newPassword: Yup.string()
    .label('New Password')
    .required('A new password is required')
    .min(8, ({ min }) => ` ${min} Characters or longer`),
  confirmPassword: Yup.string()
    .label('Confirm Password')
    .required('Please confirm your password')
    .min(8, ({ min }) => ` ${min} Characters or longer`)
    .oneOf([Yup.ref('newPassword')], 'Passwords does not match')
});

export const VerifyProfileSchema = isProfileVerification =>
  isProfileVerification
    ? Yup.object().shape({
        bvn: Yup.string('Enter your BVN')
          .required('BVN is required')
          .min(11, 'Minimum of 11 digits required')
          .max(11, 'Maximum of 11 digits required'),
        accountName: Yup.string().required('Account Name is required'),
        accountNumber: Yup.string()
          .required('Account Number is required')
          .min(10, 'Minimum of 10 digits required')
          .max(10, 'Maximum of 10 digits required'),
        bankCode: Yup.string().required('Bank is required')
      })
    : Yup.object().shape({
        accountName: Yup.string().required('Account Name is required'),
        accountNumber: Yup.string()
          .required('Account Number is required')
          .min(10, 'Minimum of 10 digits required')
          .max(10, 'Maximum of 10 digits required'),
        bankCode: Yup.string().required('Bank is required')
      });
