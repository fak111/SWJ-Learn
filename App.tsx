import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DailyPage from './pages/DailyPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DailyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}