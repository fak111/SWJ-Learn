import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DailyPage from './pages/DailyPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/levels" element={<HomePage />} />
        <Route path="/lesson/:lessonId" element={<DailyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
