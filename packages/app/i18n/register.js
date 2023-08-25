const register = {
  seo: {
    title: `Expitra - Signup`
  },
  steps: {
    one: {
      progress: '1 of 5 steps',
      title: `What's your phone number?`,
      phoneNumber: { label: 'Phone number', placeholder: 'Enter your mobile number' },
      existingUser: `Already have an account?`,
      login: `Log in`
    },
    two: {
      progress: '2 of 5 steps',
      title: phoneNumber => `Enter verification code sent to ${phoneNumber}`,
      label: 'OTP',
      resendText: `Didn't receive the code?`,
      resendCode: 'Resend Code',
      or: 'or',
      tryVoice: 'Try Voice'
    },
    three: {
      progress: '3 of 5 steps',
      title: `Create a profile`,
      email: { label: 'Email', placeholder: 'Enter your email address' },
      password: { label: 'Password', placeholder: 'Create a password' },
      tip: 'This should be 8 characters or more'
    },
    four: {
      progress: '4 of 5 steps',
      title: `Your full name`,
      name: { label: 'Fullname', placeholder: 'Type your [First name] [Last name] here...' },
      tip: `Enter your legal name exactly as it appears on all your documents. `,
      tipBtnText: 'Why?',
      bottomSheetTitle: 'Why using your Legal name is important',
      bottomSheetContent: `Expitra connects you with travel consultants and experts who help manage your travel bookings. It is important that your full name matches all of your official documents as you may be asked to identify or verify your identity to ensure your booking is valid.`,
      bottomSheetBtnText: `Got It`,
      dob: {
        title: `Your date of birth`,
        placeholder: 'Enter your date of birth here...',
        tip: `You must be at least 18 years old`
      }
    },
    five: {
      progress: '5 of 5 steps',
      title: `What’s your current location?`,
      cardTitle: `Why is location important?`,
      cardContent: 'We use this to show you more meaningful experiences and location near you.',
      placeholder: 'Select Country'
    }
  },
  next: 'Next',
  submit: 'Submit',
  providePhoneNumber: {
    title: `Please provide your phone number`,
    text: `Your phone number will be used to verify your account to ensure authencity.`,
    switchAccount: `Switch Account`
  },
  carousel: [
    {
      id: 0,
      text: `Discover and book unique experiences designed to help you make and share memories together with your friends. You can split bills and keep exploring the world around you.`
    },
    {
      id: 1,
      text: `You’ll find activities, tours and more, from within your city and worldwide. Plan your next adventure, share it with friends and make new memories. Split your bills and keeping up with your people.`
    },
    {
      id: 2,
      text: `We believe travel should not be a luxury, we want you to explore the world around you and that’s why Expitra helps provide you with affordable travel curated by experience creators from all over. Travel the way you want to.`
    },
    {
      id: 3,
      text: `Discover and book unique experiences designed to help you make and share memories together with your friends. You can split bills and keep exploring the world around you.`
    }
  ],
  success: {
    title: 'Great Job!',
    text: `You have successfully created a profile and now it's time for fun`,
    buttonText: `Continue`,
    goTo: 'Home'
  }
};
export default register;
