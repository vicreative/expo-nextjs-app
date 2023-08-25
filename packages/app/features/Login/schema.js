import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string('Enter your email').required('Email is required').email('Email is invalid'),
  password: Yup.string().label('Password').required('Password should not be empty')
});

export default LoginSchema;
