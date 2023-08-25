import * as Yup from 'yup';

/*
 * Validation for adding Participant details
 *
 */
export const AddParticipantSchema = Yup.object().shape({
  firstName: Yup.string()
    .label('Firstname')
    .required('Firstname should not be empty')
    .min(2, 'Must have at least 2 characters'),
  lastName: Yup.string()
    .label('Lastname')
    .required('Lastname should not be empty')
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string('Enter your email').required('Email is required').email('Email is invalid')
});

/*
 * Validation for booking an experience
 *
 */
export const validateBookExperience = (toast, experienceState, onPassValidation) => {
  const bookingHasEnded = new Date() > new Date(experienceState.schedule.deadlineDatetime);

  const subceededMinimumGroupSize =
    experienceState.selectedGroupSize === 1 &&
    experienceState.noOfAdults < experienceState.experience.bookingSetting.minGroupSize;

  const hasExceededMaximumGroupSize =
    experienceState.selectedGroupSize === 1 &&
    experienceState.noOfAdults > experienceState.experience.bookingSetting.maxCapacity;

  const hasIncompleteParticipantDetails =
    experienceState.participants.length + 1 < experienceState.noOfAdults;

  const hasNoGroup =
    experienceState.selectedGroupSize === 1 && !experienceState.selectedGroupReferenceId;

  // const hasNotSplitExpense =
  //   experienceState.selectedGroupSize === 1 && experienceState.hasSplitBookingExpense === false;

  if (bookingHasEnded) {
    toast.show({
      message: 'Booking has ended for the selected scheduled date',
      error: true
    });
  } else if (subceededMinimumGroupSize) {
    toast.show({
      message: `The minimum group size for this experience is ${experienceState.experience.bookingSetting.minGroupSize} people`,
      error: true
    });
  } else if (hasExceededMaximumGroupSize) {
    toast.show({
      message: `The maximum group size for this experience is ${experienceState.experience.bookingSetting.maxCapacity} people`,
      error: true
    });
  } else if (hasIncompleteParticipantDetails) {
    toast.show({
      message: `Ooops you haven't filled all your participants details`,
      error: true
    });
  } else if (hasNoGroup) {
    toast.show({
      message: `Ooops you haven't selected any group!`,
      error: true
    });
  } else if (
    !bookingHasEnded &&
    !subceededMinimumGroupSize &&
    !hasExceededMaximumGroupSize &&
    !hasIncompleteParticipantDetails &&
    !hasNoGroup
    // &&!hasNotSplitExpense
  ) {
    onPassValidation();
  }
};
