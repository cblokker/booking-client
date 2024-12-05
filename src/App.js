import React, { useEffect } from 'react';
import { useUserStore } from './stores/userStore';

import AvailabilityManager from './components/coach/AvailabilityManager';
// import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';

import BookingForm from './components/student/booking_flow/BookingForm';
import MyCalls  from './components/shared/MyCalls';

function App() {
  const { initializeCurrentUser, isLoading } = useUserStore();

  useEffect(() => {
    initializeCurrentUser();
  }, [initializeCurrentUser]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading screen during initialization
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <MainContent>
          <Routes>
            <Route path="/availability" element={<AvailabilityManager />} />
            <Route path="/book" element={<BookingForm />}/>
            <Route path="/my-calls"  element={<MyCalls />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;
