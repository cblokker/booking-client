import React, { useEffect, useState } from 'react';
import SelectCoach from './SelectCoach';
import SelectMeetingType from './SelectMeetingType';
import SelectTimeSlot from './SelectTimeSlot';
import ConfirmBooking from './ConfirmBooking';
import BookingSuccess from './BookingSuccess';
import StepNavigation from './StepNavigation';
import usersApi from '../../../api/users';
import availabilitySlotsApi from '../../../api/availabilitySlots';
import bookingsApi from '../../../api/bookings';

const MEETING_TYPES = [
  {
    id: '2',
    name: 'Deep Dive Session',
    durationMinutes: 120,
    color: '#10B981',
  },
];

const STEPS = ['coach', 'type', 'time', 'confirm', 'confirmed'];

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState('coach');
  const [formData, setFormData] = useState({
    coachId: null,
    meetingTypeId: null,
    timeSlot: null,
  });
  const [coaches, setCoaches] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState(null);
  const [bookingError, setBookingError] = useState(null);

  // Fetch coaches from the API
  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true);
      try {
        const response = await usersApi.getUsers('coach');
        setCoaches(response.data);
      } catch (err) {
        console.error('Failed to fetch coaches:', err);
        setError('Failed to load coaches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCoaches();
  }, []);

  // Fetch available slots when coach or date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      if (!formData.coachId || !selectedDate) return;

      setSlotsLoading(true);
      try {
        const response = await availabilitySlotsApi.getAvailabilitySlots(formData.coachId);
        setAvailableSlots(response.data);
      } catch (err) {
        console.error('Failed to fetch available slots:', err);
        setAvailableSlots([]);
      } finally {
        setSlotsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [formData.coachId, selectedDate]);

  const handleCoachSelect = (coachId) => {
    setFormData((prev) => ({ ...prev, coachId }));
    setAvailableSlots([]); // Reset available slots when coach changes
  };

  const handleTypeSelect = (typeId) => {
    setFormData((prev) => ({ ...prev, meetingTypeId: typeId }));
  };

  const handleSlotSelect = (slot) => {
    setFormData((prev) => ({ ...prev, timeSlot: slot }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date.toISOString().split('T')[0]); // Update selected date in ISO format
  };

  const handleConfirmBooking = async () => {
    try {
      setBookingError(null);
      const response = await bookingsApi.createBooking(formData.timeSlot.id);
      console.log('Booking created successfully:', response.data);
      setCurrentStep('confirmed');
    } catch (err) {
      console.error('Failed to create booking:', err);
      setBookingError('Failed to create booking. Please try again.');
    }
  };

  const handleBack = () => {
    const currentIndex = STEPS.indexOf(currentStep);

    if (currentIndex > 0) {
      setCurrentStep(STEPS[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    const currentIndex = STEPS.indexOf(currentStep);

    if (currentStep === 'confirm') {
      handleConfirmBooking();
    } else if (currentIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentIndex + 1]);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 'coach':
        return !!formData.coachId;
      case 'type':
        return !!formData.meetingTypeId;
      case 'time':
        return !!formData.timeSlot;
      case 'confirm':
        return true;
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'coach':
        if (loading) {
          return <div>Loading coaches...</div>;
        }
        if (error) {
          return <div className="text-red-500">{error}</div>;
        }
        return (
          <SelectCoach
            coaches={coaches}
            selectedCoach={formData.coachId}
            onSelect={handleCoachSelect}
          />
        );
      case 'type':
        return (
          <SelectMeetingType
            meetingTypes={MEETING_TYPES}
            selectedType={formData.meetingTypeId}
            onSelect={handleTypeSelect}
          />
        );
      case 'time':
        return (
          <SelectTimeSlot
            availableSlots={availableSlots}
            selectedDate={selectedDate}
            onSlotSelect={handleSlotSelect}
            onDateChange={handleDateChange}
          />
        );
      case 'confirm':
        return (
          <>
            {bookingError && (
              <div className="text-red-500 mb-4">{bookingError}</div>
            )}
            <ConfirmBooking
              formData={formData}
              coach={coaches.find((c) => c.id === formData.coachId) || null}
              meetingType={
                MEETING_TYPES.find((type) => type.id === formData.meetingTypeId) ||
                null
              }
            />
          </>
        );
      case 'confirmed':
        return (
          <BookingSuccess
            formData={formData}
            coach={coaches.find((c) => c.id === formData.coachId) || null}
            meetingType={
              MEETING_TYPES.find((type) => type.id === formData.meetingTypeId) ||
              null
            }
          />
        );
      default:
        return null;
    }
  };

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




// const STEPS = ['coach', 'type', 'time', 'confirm', 'confirmed'];

// export default function BookingFlow() {
//   const [currentStep, setCurrentStep] = useState('coach');
//   const [formData, setFormData] = useState({
//     coachId: null,
//     meetingTypeId: null,
//     timeSlot: null,
//   });
//   const [coaches, setCoaches] = useState([]);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Track selected date
//   const [loading, setLoading] = useState(false);
//   const [slotsLoading, setSlotsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch coaches from the API
//   useEffect(() => {
//     const fetchCoaches = async () => {
//       setLoading(true);
//       try {
//         const response = await usersApi.getUsers('coach'); // Fetch only coaches
//         setCoaches(response.data); // Update the coaches state with API data
//       } catch (err) {
//         console.error('Failed to fetch coaches:', err);
//         setError('Failed to load coaches. Please try again later.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCoaches();
//   }, []);

//   // Fetch available slots when coach or meeting type changes
//   useEffect(() => {
//     const fetchAvailableSlots = async () => {
//       if (!formData.coachId) return;

//       setSlotsLoading(true);
//       try {
//         const date = new Date().toISOString().split('T')[0]; // Default to today's date
//         const response = await availabilitySlotsApi.getAvailabilitySlots(
//           formData.coachId,
//           date
//         );
//         setAvailableSlots(response.data);
//       } catch (err) {
//         console.error('Failed to fetch available slots:', err);
//         setAvailableSlots([]);
//       } finally {
//         setSlotsLoading(false);
//       }
//     };

//     fetchAvailableSlots();
//   }, [formData.coachId]);

//   const handleCoachSelect = (coachId) => {
//     setFormData((prev) => ({ ...prev, coachId }));
//     setAvailableSlots([]); // Reset available slots when coach changes
//   };

//   const handleTypeSelect = (typeId) => {
//     setFormData((prev) => ({ ...prev, meetingTypeId: typeId }));
//   };

//   const handleSlotSelect = (slot, recurring) => {
//     setFormData((prev) => ({ ...prev, timeSlot: slot, recurring }));
//   };

//   const handleConfirmBooking = () => {
//     setCurrentStep('confirmed');
//   };

//   const canProceed = () => {
//     switch (currentStep) {
//       case 'coach':
//         return !!formData.coachId;
//       case 'type':
//         return !!formData.meetingTypeId;
//       case 'time':
//         return !!formData.timeSlot;
//       case 'confirm':
//         return true;
//       default:
//         return false;
//     }
//   };

//   const handleBack = () => {
//     const currentIndex = STEPS.indexOf(currentStep);

//     if (currentIndex > 0) {
//       setCurrentStep(STEPS[currentIndex - 1]);
//     }
//   };

//   const handleNext = () => {
//     const currentIndex = STEPS.indexOf(currentStep);

//     if (currentStep === 'confirm') {
//       handleConfirmBooking();
//     } else if (currentIndex < STEPS.length - 1) {
//       setCurrentStep(STEPS[currentIndex + 1]);
//     }
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 'coach':
//         if (loading) {
//           return <div>Loading coaches...</div>;
//         }
//         if (error) {
//           return <div className="text-red-500">{error}</div>;
//         }
//         return (
//           <SelectCoach
//             coaches={coaches}
//             selectedCoach={formData.coachId}
//             onSelect={handleCoachSelect}
//           />
//         );
//       case 'type':
//         return (
//           <SelectMeetingType
//             meetingTypes={MEETING_TYPES}
//             selectedType={formData.meetingTypeId}
//             onSelect={handleTypeSelect}
//           />
//         );
//       case 'time':
//         if (slotsLoading) {
//           return <div>Loading available slots...</div>;
//         }
//         return (
//           <SelectTimeSlot
//             availableSlots={availableSlots}
//             onSlotSelect={handleSlotSelect}
//           />
//         );
//       case 'confirm':
//         return (
//           <ConfirmBooking
//             formData={formData}
//             coach={coaches.find((c) => c.id === formData.coachId) || null}
//             meetingType={
//               MEETING_TYPES.find((type) => type.id === formData.meetingTypeId) ||
//               null
//             }
//           />
//         );
//       case 'confirmed':
//         return (
//           <BookingSuccess
//             formData={formData}
//             coach={coaches.find((c) => c.id === formData.coachId) || null}
//             meetingType={
//               MEETING_TYPES.find((type) => type.id === formData.meetingTypeId) ||
//               null
//             }
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <div className="bg-white rounded-lg shadow-lg p-6">
//         {renderStep()}

//         {currentStep !== 'confirmed' && (
//           <StepNavigation
//             currentStep={currentStep}
//             canProceed={canProceed()}
//             onBack={handleBack}
//             onNext={handleNext}
//           />
//         )}
//       </div>
//     </div>
//   );
// }