import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DailyPage from './pages/DailyPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import CategoryPage from './pages/CategoryPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/world" element={<CategoryPage />} />
        <Route path="/world/:categoryId/:chapterId" element={<DailyPage />} />
        <Route path="/world/:categoryId/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
