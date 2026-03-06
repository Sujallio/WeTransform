import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './utils/AuthContext';
import './styles/index.css';

// Pages
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import PhotoAnalysis from './pages/PhotoAnalysis';
import GuidanceSelection from './pages/GuidanceSelection';
import GuidanceDashboard from './pages/GuidanceDashboard';
import SubscriptionPlans from './pages/SubscriptionPlans';

function App() {
  const { loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen text-green-500">Loading...</div>;
  }
  
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/photo-analysis" element={<PhotoAnalysis />} />
          <Route path="/guidance-selection" element={<GuidanceSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guidance" element={<GuidanceDashboard />} />
          <Route path="/subscription" element={<SubscriptionPlans />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
