import React, { useCallback }from 'react';
import { useCreateBookingMutation } from '../../../queries/booking/useBookings';
import { useBookingStore } from '../../../stores/bookingStore';
import CoachSelector from './CoachSelector';
import MeetingTypeSelector from './MeetingTypeSelector';
import TimeSlotSelector from './TimeSlotSelector';
import ConfirmBooking from './ConfirmBooking';
import BookingSuccess from './BookingSuccess';
import StepNavigation from './StepNavigation';

const STEPS = ['coach', 'type', 'time', 'confirm', 'confirmed'];

export default function BookingFlow() {
  const {
    currentStep,
    setStep,
    selectedCoachId,
    selectCoach,
    selectedMeetingTypeId,
    selectedTimeSlot,
    setBookingError
  } = useBookingStore();

  const createBookingMutation = useCreateBookingMutation();

  // TODO: Can put these step methods in a hook
  const handleBack = useCallback(() => {
    const currentIndex = STEPS.indexOf(currentStep);

    if (currentIndex > 0) {
      setStep(STEPS[currentIndex - 1]);
    }
  }, [currentStep, setStep]);

  const handleNext = useCallback(async () => {
    const currentIndex = STEPS.indexOf(currentStep);

    if (currentStep === 'confirm') {
      if (!selectedTimeSlot) return;
      try {
        await createBookingMutation.mutateAsync(selectedTimeSlot.id);
        setStep('confirmed');
      } catch (error) {
        setBookingError('Failed to confirm booking. Please try again.');
      }
    } else if (currentIndex < 4) {
      setStep(STEPS[currentIndex + 1]);
    }
  }, [currentStep, selectedTimeSlot, createBookingMutation, setStep, setBookingError]);

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 'coach':
        return !!selectedCoachId;
      case 'type':
        return !!selectedMeetingTypeId;
      case 'time':
        return !!selectedTimeSlot;
      case 'confirm':
        return true;
      default:
        return false;
    }
  }, [currentStep, selectedCoachId, selectedMeetingTypeId, selectedTimeSlot]);

  const renderStep = useCallback(() => {
    switch (currentStep) {
      case 'coach':
        return <CoachSelector />;
      case 'type':
        return <MeetingTypeSelector />;
      case 'time':
        return <TimeSlotSelector />;
      case 'confirm':
        return <ConfirmBooking />;
      case 'confirmed':
        return <BookingSuccess />;
      default:
        return null;
    }
  }, [currentStep, selectedCoachId]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderStep()}

        {currentStep !== 'confirmed' && (
          <StepNavigation
            currentStep={currentStep}
            canProceed={canProceed()}
            onBack={handleBack}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}
