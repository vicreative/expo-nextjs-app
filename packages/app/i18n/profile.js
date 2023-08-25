const profile = {
  settings: {
    heading: `Profile Settings`,
    settings: `Settings`,
    home: `Home`,
    subheading: `Your profile information and account details are saved here.`,
    wallet: {
      heading: `My Wallet`,
      fundWalletBtn: `Fund Wallet`
    },
    version: 'Version',
    about: {
      heading: `About Expitra`,
      content: `Expitra connects adventurous travelers with talented creators offering unique trips and experiences around the globe. We bring together like-minded individuals who share a love for exploration.`,
      update: newUpdate =>
        newUpdate ? `New version of Expitra is available` : `Your version of Expitra is up to date`
    },
    options: [
      'Account settings',
      'Transaction history',
      'Withdrawal bank',
      'Security',
      'Chat groups',
      'Archived groups',
      'Creator Dashboard',
      'Privacy Policy',
      'Need some help?',
      'About Expitra',
      'Logout'
    ]
  },
  fundWallet: {
    headerTitle: `Fund Your Wallet`,
    heading: `Fund by bank transfer`,
    virtualCard: {
      copy: `Copy`,
      tip: `This works just like your bank account number. You can transfer from any source into this account and use this to make payments seamlessly`
    },
    fundBy: {
      heading: `How would you like to fund?`,
      card: `Credit or Debit card`,
      amount: {
        headerTitle: `How Much?`,
        totalAmount: `Total Amount`,
        btnText: `Proceed`
      },
      success: {
        title: `Your Wallet has successfully been funded!`,
        btnText: `Close`
      },
      error: {
        title: `Oops...There was an error`,
        btnText: `Close`
      }
    }
  },
  account: {
    info: {
      heading: `Account Information`,
      update: {
        heading: `Personal info`,
        subheading: `Update your account personal details here.`
      },
      name: {
        heading: 'Name',
        firstname: {
          label: 'First Name'
        },
        lastname: {
          label: 'Last Name'
        }
      },
      email: {
        heading: 'Email',
        label: 'Email'
      },
      photo: {
        heading: 'Your photo',
        subheading: `This will be displayed on your profile.`,
        upload: {
          label: `Click to upload`,
          content: `PNG, JPG or GIF (max. 800x400px)`
        }
      },
      phonenumber: {
        heading: 'Phonenumber',
        label: 'Phone Number'
      },
      gender: {
        heading: 'Gender',
        label: 'Gender',
        placeholder: 'Select your gender'
      },
      dob: {
        heading: 'Date Of Birth',
        label: 'Date Of Birth',
        placeholder: `Enter your date of birth`
      },
      cancel: 'Cancel',
      save: 'Save'
    },
    verification: {
      hero: {
        heading: `Verify your profile`
      },
      heading: 'Account Verification',
      subheading:
        'Provide your banking information and ensure is matches your legal name provided in order to enjoy the perks of an Expitra Wallet.',
      bvn: {
        label: 'Bank Verification Number (BVN)',
        placeholder: 'BVN'
      },
      bankName: {
        label: 'Bank Name',
        placeholder: 'Select your bank'
      },
      accountNumber: { label: 'Account Number', placeholder: 'Enter bank account number' },
      accountName: {
        label: 'Account holder name',
        placeholder: 'Your account name will be displayed here'
      },
      note: `The account information provided above will be saved in your profile settings and set as your withdrawal account.`,
      btnText: `Submit`,
      success: {
        title: `Verification complete!`,
        text: `Your profile is under review, we will notify you in 48hrs`,
        btnText: `Close`
      }
    }
  },
  security: {
    info: {
      heading: `Security`,
      pin: {
        heading: `Pin`,
        subheading: hasSetPin =>
          hasSetPin ? ` or reset your Expitra PIN` : `Create your Expitra PIN`,
        action: hasSetPin => (hasSetPin ? `Reset PIN` : `Create PIN`),
        changePin: `Change`,
        popup: {
          heading: `Create a secure PIN`,
          content: ` You will use this to safely authorize payments, so please protect your PIN at all times.`,
          btn: `Create PIN`
        }
      },
      password: {
        heading: `Password`,
        subheading: `Please enter your current password to change your password.`,
        oldPassword: {
          heading: 'Current Password',
          label: 'Current Password'
        },
        newPassword: {
          heading: 'New Password',
          label: 'New Password'
        },
        confirmPassword: {
          heading: 'Confirm Password',
          label: 'Confirm Password'
        },
        cancel: 'Cancel',
        update: 'Update Password'
      }
    }
  },
  trips: {
    heading: `Trips`,
    noUser: `Log in to view your adventures`,
    getStarted: {
      heading: `Your Trips`,
      title: `All of your adventures are saved here.`,
      message: `Access all of your booking details and tickets either online or offline no matter where you booked.`,
      btnText: `Discover your next adventure`
    },
    info: {
      headerTitle: `Trip details`,
      title: `Click on experiences to view your ticket details`,
      view: { heading: `Your Booking Ticket`, btnText: `View` },
      timeLeft: count => `${count} left`,
      card: {
        title: selected =>
          selected === 'cancelled'
            ? `Total number of cancelled experiences`
            : selected === 'expired'
            ? `Total number of expired experiences`
            : `Total number of experiences booked`
      },
      search: {
        placeholder: `Search by experience name`
      },
      report: {
        heading: `Report this experience`,
        subheading: `Ensure that the facts of this report are accurate.`,
        complaintType: {
          label: 'Select your complaint',
          placeholder: `Select a reason for this report`
        },
        description: {
          label: 'Describe the problem',
          placeholder: `Describe in details what the problem is, this will help us take proper actions to resolve it.`
        },
        cancel: 'Cancel',
        submit: 'Submit'
      },
      cancel: {
        heading: `Need to Cancel This Booking?`,
        headerTitle: `Cancel This Trip?`,
        title: `Why do you need to cancel?`,
        cancelType: {
          label: 'Please select a reason',
          placeholder: `Select a reason for cancellation`
        },
        description: {
          label: 'Describe the problem',
          placeholder: `Please tell us your reason for cancelling.`
        },
        confirm: {
          headerTitle: `Confirm Your Cancellation`,
          heading: `Refund Details`,
          paid: `You paid`,
          refund: `We’ll Refund`,
          experiencePrice: `Experience Price`,
          serviceFee: `Service Fee`,
          cancellationFee: `Cancellation Fee`,
          creatorRefundMesssage: `Information from the creator`,
          cancellationCharge: charge => `${charge}% charge`,
          confirmCancellation: `Confirm Cancellation`,
          tip: `Your booking will be cancelled immediately and your Wallet will be credited within 48hrs.`,
          success: {
            title: `Cancellation Successful`,
            text: `Your wallet will be credited within\n48hrs.`,
            btnText: `Done`
          },
          error: {
            title: `Opps...there’s an error`,
            btnText: `Close`
          }
        },
        learnMore: `Learn more about our cancellation policy`,
        cancel: 'Cancel',
        next: 'Next'
      },
      ticket: {
        headerTitle: `Your Ticket`,
        heading: 'Ticket',
        amount: `Amount paid`,
        name: 'Full Name:',
        email: `Email Address:`,
        experience: `Experience:`,
        bookingId: `Booking ID:`,
        tiketCode: `Ticket Code:`,
        date: `Date Booked:`,
        downloadTicket: `Download Ticket`,
        shareTicket: `Share Ticket`
      },
      noResult: `No Results Found`,
      nodata: {
        heading: `No Experiences booked`,
        message: `Start living the soft life today, explore the world and connect with others.`,
        linkText: `Search for Experiences`
      },
      error: {
        heading: `Ooops... an error occurred!`,
        message: `Looks like there was an error while fetching your trips. Click the button below to retry`,
        linkText: `Retry`
      }
    }
  },
  chats: {
    info: {
      heading: `Chat Groups`
    }
  },
  withdrawalBank: {
    info: {
      heading: `Withdrawal Bank`,
      title: `Withdraw from your wallet to the selected account below`,
      add: `Add a withdrawal bank account`,
      nodata: `You have no withdrawal banks at the moment`,
      withdraw: {
        heading: `Withdraw to this bank account`,
        title: `Add Withdrawal Bank`,
        subheading: `Provide details to recieve cash from friends.`,
        walletBalance: balance => `Wallet(${balance})`,
        withdrawalAmount: `Amount to Withdraw`,
        delete: {
          heading: 'Are you sure you want to delete this account?',
          message: `You'll need to re-add this account to use it as a withdrawal method next time.`
        },
        success: {
          title: `Your withdrawal is successful!`,
          text: `Your money is on it's way.`,
          btnText: `Close`
        },
        error: {
          title: `Opps...there’s an error`,
          btnText: `Close`
        }
      }
    }
  },
  transactions: {
    headerTitle: `Transaction history`,
    info: {
      heading: `Wallet and Transactions`,
      title: `Keep track of all transactions and funds recieved here`,
      search: {
        placeholder: `Search transaction history`
      },
      table: {
        caption: `Your Transaction History`,
        error: {
          heading: `Ooops... an error occurred!`,
          message: `Looks like there was an error while fetching your transactions. Click the button below to retry`,
          linkText: `Retry`
        }
      },
      receipt: {
        headerTitle: `Your Receipt`,
        heading: 'Ticket',
        amount: `Amount`,
        from: 'From:',
        paidTo: `Paid to:`,
        remark: `Remark:`,
        reference: `Reference:`,
        date: `Date:`,
        downloadReceipt: `Download Receipt`,
        shareReceipt: `Share Receipt`
      },
      error: {
        heading: `Ooops... an error occurred!`,
        message: `Looks like there was an error while fetching your transaction. Click the button below to retry`,
        linkText: `Retry`
      }
    }
  },
  pinSettings: {
    headerTitle: hasSetPin => (hasSetPin ? `Reset pin` : `Create pin`),
    resetPin: {
      validateHeading: email => `Enter the token sent to ${email}`,
      heading: `Enter your new PIN`,
      success: {
        title: `Reset Pin Successful`,
        btnText: `Done`
      },
      error: {
        title: `Ooops an error occured!`,
        btnText: `Close`
      }
    },
    createPin: {
      heading: `Enter your PIN`,
      confirmPin: `Confirm your PIN`,
      incorrectPin: `Pin does not match`,
      success: {
        title: `Pin Created`,
        btnText: `Done`
      },
      error: {
        title: `Ooops an error occured!`,
        btnText: `Close`
      }
    },
    changePin: {
      headerTitle: `Change pin`,
      oldPin: `Enter your current PIN`,
      heading: `Enter a new PIN`,
      confirmPin: `Confirm your new PIN`,
      incorrectPin: `Pin does not match`,
      success: {
        title: `Pin Updated`,
        btnText: `Done`
      },
      error: {
        title: `Ooops an error occured!`,
        btnText: `Close`
      }
    }
  }
};
export default profile;
