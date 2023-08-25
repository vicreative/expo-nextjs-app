import * as Yup from 'yup';

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string('Enter your email').required('Email is required').email('Email is invalid')
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .required('Password should not be empty')
    .min(8, ({ min }) => ` ${min} Characters or longer`),
  confirmPassword: Yup.string()
    .label('Confirm Password')
    .required('Please confirm your password')
    .min(8, ({ min }) => ` ${min} Characters or longer`)
    .oneOf([Yup.ref('password')], 'Passwords does not match')
});
