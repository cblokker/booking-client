import React from 'react';
import AvailabilityManager from './components/coach/AvailabilityManager';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import MainContent from './components/layout/MainContent';
import BookingForm from './components/student/bookingFlow/BookingForm';
import MyBookings  from './components/shared/myBookings/MyBookings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <Header />
        <MainContent>
          <Routes>
            <Route path="/availability" element={<AvailabilityManager />} />
            <Route path="/book" element={<BookingForm />}/>
            <Route path="/my-calls"  element={<MyBookings />} />
          </Routes>
        </MainContent>
      </div>
    </Router>
  );
}

export default App;
