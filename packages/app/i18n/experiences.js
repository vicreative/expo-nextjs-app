const experiences = {
  headerTitle: bookingType =>
    bookingType === 'PRIVATE' ? `Private Trips` : `Discover Experiences`,
  switchExperience: experienceType =>
    experienceType === 'TRAVEL' ? `Explore your city` : `Want to travel?`,
  seo: {
    title: `New Experiences - Unforgettable travel opportunities`,
    openGraphDescription:
      'Explore unique curated experiences, including savannas, climbing mountains, and relaxing on beaches. Expitra has something for everyone.',
    description:
      'Explore unique curated experiences, including savannas, climbing mountains, and relaxing on beaches. Expitra has something for everyone.'
  },
  hero: {
    heading: `Explore and connect on a global scale`,
    subheading: `Find an experience that you are interested in and excited to explore`
  },
  nodata: (query, experienceType) =>
    experienceType === 'TRAVEL'
      ? query === ''
        ? `There are no active travel experiences at the moment.`
        : query === 'search'
        ? `No results found!`
        : ''
      : experienceType === 'REGULAR'
      ? query === ''
        ? `There are no active experiences in your city at the moment.`
        : query === 'search'
        ? `No results found!`
        : ''
      : '',
  error: {
    heading: `Ooops... an error occurred!`,
    message: `Looks like there was an error while fetching experiences. Click the button below to retry`,
    linkText: `Retry`
  },
  filter: {
    heading: `Filter`,
    category: `Interests & Categories`,
    languages: `Languages`,
    showResults: `Show Results`,
    clear: `Clear All`,
    type: [
      { id: 'REGULAR', name: 'City' },
      { id: 'TRAVEL', name: 'Travel' }
    ]
  },
  details: {
    language: `Language Spoken`,
    experienceType: `Type of Experience`,
    activityLevel: {
      title: `Activity Level`,
      activeness: `Level of activeness`,
      level: level =>
        level === 0 ? `Low` : level === 1 ? `Moderate` : level === 2 ? `Strenous` : ``,
      tip: level =>
        level === 0
          ? `Light (not very rigorous)`
          : level === 1
          ? `Moderate (some level of activeness)`
          : level === 2
          ? `Strenous (very active)`
          : ``
    },
    maxCapacity: `Maximum Group Size`,
    selectDate: {
      heading: `Select a preferred date`,
      subheading: `Select a preferred date for your trip either as a solo traveller or with your group.`,
      price: ` / person`,
      perPerson: `Per person`,
      btnText: (soldOut, expired) => (soldOut ? `Sold Out` : expired ? `Expired` : `Select a Date`),
      viewMoreDates: `View More Available Dates`,
      ticketsLeft: count => `${count > 0 ? count : 'No'} Tickets left for this day.`,
      bookBtnText: (soldOut, expired) =>
        soldOut ? `Sold Out` : expired ? `Expired` : `Book This Experience`,
      expiredBooking: `No booking dates available`,
      joinOthers: count => `Join ${count} other participants for this experience`,
      privateBooking: `Book for a private group`,
      perks: {
        heading: `Additional offers`,
        subheading: `These are all perks and benefits offered by the trip operator.`,
        btnText: `View all perks offered`,
        groupDiscount: {
          title: `Group discount`,
          persons: (minUnits, maxUnits) => `For ${minUnits} - ${maxUnits} people`,
          percentage: percentage => `${percentage}% off`
        },
        flightBooking: {
          title: `Flight booking`,
          text: `If you have any questions or would like assistance with booking your flight `,
          contact: { text: `Contact Us`, subject: `Subject`, body: `Body` }
        },
        visaApplication: {
          title: `Visa application`,
          text: `If you have any questions or would like to know more information about visa applications `,
          contact: { text: `Contact Us`, subject: `Subject`, body: `Body` }
        }
      }
    },
    more: showMore => (showMore ? `Read Less` : `Read More`),
    provisions: {
      included: `What’s included`,
      excluded: `What’s NOT included`
    },
    description: `What we’ll do`,
    location: {
      heading: `Where we’ll be`,
      copy: `Copy Location`,
      copied: 'Copied!'
    },
    itenaries: {
      heading: `Trip Itinerary`,
      summary: `Summary`
    },
    author: {
      heading: `Created by`,
      contactGuide: `Contact the Guide`,
      viewProfile: `View Profile`,
      status: isApproved => (isApproved ? 'Verified Profile' : 'Unverified Profile')
    },
    contactGuide: {
      heading: name => `Message ${name}`,
      subheading: `Send a message to ask any question...`,
      label: `Send the host a message`,
      placeholder: `Dont’t be shy...`,
      send: `Send Message`
    },
    importantNotes: {
      heading: `Important Notes`,
      instructions: WIDTH =>
        WIDTH > 600 ? `Things to Know and recommendations` : `Things to know`,
      currency: {
        heading: `Currency`,
        content: country => `The currency in ${country} is:`
      },
      visaInfo: {
        heading: `Visa Information`,
        content: `If you have any questions or would like to know more information about visa applications `,
        contact: { text: `Contact Us`, subject: `Subject`, body: `Body` }
      },
      additionalCancellationInfo: `Information from the creator`
    },
    cancellation: {
      heading: `Cancellation policy`,
      deadline: `Cancel within 24 to 48 hours of booking and purchasing an experience to receive a full refund to your wallet.`,
      subheading: `We understand that plans change and sometimes you may need to cancel or reschedule the experience you have booked. Our cancellation policy is in place to ensure that everyone is treated fairly and that there is minimal disruption caused by cancellations.`,
      content: (experienceType, deadlineDatetime, additionalCancellationInfo) =>
        experienceType === 'TRAVEL'
          ? `If you cancel an experience 24 to 48hrs after booking, you will receive a full refund into your wallet account.\n\nWhen booking 48 hours to ${deadlineDatetime}, cancellation for a full refund is only valid 24hrs after booking.\n\n${
              additionalCancellationInfo ? `${additionalCancellationInfo}\n\n` : ''
            }In the unlikely event that you have to cancel the experience due to unforeseen circumstances, please contact us at `
          : `If you cancel an experience 24 to 48hrs after booking, you will receive a full refund into your wallet account.\n\nWhen booking 48 hours to ${deadlineDatetime}, cancellation for a full refund is only valid 24hrs after booking.\n\nIn the unlikely event that you have to cancel the experience due to unforeseen circumstances, please contact us at `,
      contact: { mail: `admin@expitra.com`, subject: `Subject`, body: `Body` },
      agree: `I understand`,
      learnMore: `Learn More`,
      readMore: `Read more about cancellation policy`
    },
    backToTop: `Go back to the top`,
    error: {
      heading: `Ooops... an error occurred!`,
      message: `Looks like there was an error while fetching this experience. Click the button below to retry`,
      linkText: `Retry`
    }
  },
  shareExperience: {
    heading: `Share with your friends`,
    btnText: `Share this Experience`,
    title: `Expitra`,
    text: `Check out this experience i found on Expitra: \n`,
    copied: `Copied!`,
    email: `Via Contact`,
    instagram: `Via Instagram`,
    whatsapp: `Via Whatsapp`,
    copy: `Copy Link`,
    more: `More`,
    groups: {
      heading: `Share to which group?`,
      title: `Your groups`,
      nodata: `You have no active groups yet. To create one, start a group chat and invite your friends.`
    }
  },
  bookExperience: {
    hero: {
      heading: `Confirm your booking and pay`,
      breadcrumb: { experience: `Experience`, pay: `Confirm and pay` },
      navlinks: (id, scheduleId) => [
        { id: 0, url: `/experiences/${id}`, name: 'Experience' },
        {
          id: 1,
          url: `/experiences/${id}/schedule/${scheduleId}`,
          name: 'Confirm and pay'
        }
      ]
    },
    language: language => `In ${language}`,
    details: {
      heading: `Experience Details`,
      startDate: `Start Date:`,
      endDate: `End Date:`,
      bookingDeadline: `Booking deadline for this experience`,
      change: `Change`,
      persons: {
        title: `Person(s):`,
        noOfAdults: noOfAdults => `${noOfAdults} Adult(s)`,
        edit: edit => (!edit ? `Edit` : `Save`)
      },
      spaceLeft: {
        title: `Spaces Left:`,
        content: noOfTicketsLeft => `${noOfTicketsLeft} spaces left for this experience`
      },
      maximumSize: {
        title: `Maximum Size:`,
        content: maximumSize => `${maximumSize} People`
      },
      experienceType: `Type of Experience:`,
      location: `Location:`,
      languagesSpoken: `Language(s) Spoken:`
    },
    privateBooking: {
      heading: `Book as a private experience`,
      content: (businessName, maxCapacity) =>
        `${businessName} can offer this experience exclusively for up to ${maxCapacity} participants.`,
      label: `Would you like to book?`,
      privatePrice: noOfAdults => `Price for ${noOfAdults} adult(s)`
    },
    priceDetails: {
      heading: `Price Details`,
      processorFee: `Processor fee`,
      discount: (discount, noOfAdults) => `${discount} Off for ${noOfAdults} adults`
    },
    processorFee: {
      heading: `Processor Fee`,
      sectionOne: {
        question: `What is a Processor Fee?`,
        answer: `A processor fee is a small charge that helps cover the costs associated with securely processing payments for transactions made on digital platforms. This is a common practice in many digital services to ensure the safe handling of your financial data.`
      },
      sectionTwo: {
        question: `What is the Expitra Processor Fee?`,
        answer: `The Expitra processor fee is a nominal fee charged when you book experiences through our platform. This fee helps us securely handle payment processing, ensuring your transactions are as smooth as your adventures.`
      },
      sectionThree: {
        question: `Why do we charge this?`,
        answer: `We charge this fee to maintain the high level of security and reliability you've come to expect from Expitra. It allows us to use top-tier processing services, ensuring your financial data is handled with the utmost care. This way, you can focus on creating and sharing unforgettable experiences with your friends, while we take care of the rest.`
      }
    },
    participants: {
      title: `Add participant?`,
      heading: `Add participant’s details`,
      add: `Add`,
      remove: `Remove`,
      firstName: {
        placeholder: `First name`
      },
      lastName: {
        placeholder: `Last name`
      },
      email: {
        placeholder: `Email address`,
        tip: `Their booking ticket will be sent to this email`
      },
      save: `Save`
    },
    perks: {
      heading: `Perks for You`,
      groupDiscount: {
        tip: (discount, minGroupSize, noOfAdults) =>
          discount
            ? `${discount?.ratio * 100 + '%'} Off for ${noOfAdults} adults`
            : `Group discounts apply to more than ${minGroupSize} adults booking at a time.`,
        title: `Group Discount offer`,
        persons: (minUnits, maxUnits) => `For ${minUnits} - ${maxUnits} people`,
        percentage: percentage => `${percentage}% off`
      },
      flightBooking: `Flight booking`,
      visaApplication: `Visa application`
    },
    pay: {
      totalDue: `Total Due`,
      makePayment: `Make Payment`,
      payWith: {
        heading: `Pay With`,
        creditCard: `Credit or Debit card`,
        wallet: `My Expitra Wallet`,
        tip: `All payment options offered are protected and secure.`
      },
      success: {
        title: `Payment Successful`,
        text: `You have successfully paid and booked for this experience. View your plans for your booking tickets`,
        btnText: `View Plans`
      },
      error: {
        title: `Ooops...there’s an error`,
        btnText: `Close`
      }
    }
  }
};
export default experiences;
