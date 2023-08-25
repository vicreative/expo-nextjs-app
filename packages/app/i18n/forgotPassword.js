const forgotPassword = {
  headerTitle: 'Forgot password',
  seo: {
    title: `Expitra - Forgot Password`
  },
  next: 'Next',
  steps: {
    one: {
      headerTitle: 'Forgot password',
      title: `What’s your email address?`,
      email: { label: 'Email', placeholder: 'Enter your email address' }
    },
    two: {
      headerTitle: 'Forgot password',
      title: emailAddress => `Enter verification code sent to ${emailAddress}`,
      label: 'OTP',
      resendText: `Didn't receive the code?`,
      resendCode: 'Resend Code',
      or: 'or',
      tryVoice: 'Try Voice'
    },
    three: {
      headerTitle: 'Create a new password',
      title: 'Create and confirm your new password',
      password: { label: 'Password', placeholder: 'Enter your new password' },
      confirmPassword: { label: 'Confirm Password', placeholder: 'Confirm password' },
      tip: 'This should be 8 characters or more'
    }
  },
  success: {
    title: 'Your password has been updated',
    text: `You have successfully updated your password, you can proceed to Log in with your new password.`,
    btnText: `Proceed to Log In`
  }
};
export default forgotPassword;
