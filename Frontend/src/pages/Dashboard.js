import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { userAPI, analysisAPI, guidanceAPI } from '../utils/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [profileRes, analysisRes, subscriptionRes] = await Promise.all([
        userAPI.getProfile(),
        analysisAPI.getLatestAnalysis().catch(() => null),
        guidanceAPI.getSubscriptionStatus(),
      ]);

      setProfile(profileRes.data.profile);
      setAnalysis(analysisRes?.data.analysis || null);
      setSubscriptionStatus(subscriptionRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-green-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-500">WeTransform Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">{user?.email}</span>
            <button onClick={handleLogout} className="btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-4 px-6 font-bold transition ${
              activeTab === 'overview'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('analysis')}
            className={`pb-4 px-6 font-bold transition ${
              activeTab === 'analysis'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Analysis
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`pb-4 px-6 font-bold transition ${
              activeTab === 'subscription'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Subscription
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-green-500 mb-4">Welcome, {user?.email}!</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded">
                  <p className="text-gray-400 text-sm">Age</p>
                  <p className="text-2xl font-bold">{user?.age}</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <p className="text-gray-400 text-sm">Height</p>
                  <p className="text-2xl font-bold">{profile?.height} cm</p>
                </div>
                <div className="bg-gray-800 p-4 rounded">
                  <p className="text-gray-400 text-sm">Weight</p>
                  <p className="text-2xl font-bold">{profile?.weight} kg</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">Selected Areas</h3>
              {profile?.selectedAreas?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.selectedAreas.map((area) => (
                    <span
                      key={area}
                      className="bg-green-900 text-green-200 px-3 py-1 rounded text-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No areas selected yet</p>
              )}
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">Next Steps</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/guidance')}
                  className="btn-primary w-full"
                >
                  View My Guidance
                </button>
                <button
                  onClick={() => navigate('/photo-analysis')}
                  className="btn-secondary w-full"
                >
                  Update Photo Analysis
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="card">
            {analysis ? (
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Face Shape</p>
                  <p className="text-xl font-bold capitalize">{analysis.faceShape}</p>
                </div>
                <div>
                  <p className="text-gray-400">Skin Type</p>
                  <p className="text-xl font-bold capitalize">{analysis.skinType}</p>
                </div>
                <div>
                  <p className="text-gray-400">Skin Condition</p>
                  <p className="text-xl font-bold capitalize">{analysis.skinCondition}</p>
                </div>
                <div>
                  <p className="text-gray-400">Skin Tone</p>
                  <p className="text-xl font-bold capitalize">{analysis.skinTone}</p>
                </div>
                <div className="disclaimer">
                  {analysis.disclaimer}
                </div>
              </div>
            ) : (
              <div className="text-gray-400">
                <p>No analysis available yet.</p>
                <button
                  onClick={() => navigate('/photo-analysis')}
                  className="btn-primary mt-4"
                >
                  Upload Photo for Analysis
                </button>
              </div>
            )}
          </div>
        )}

        {/* Subscription Tab */}
        {activeTab === 'subscription' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold mb-4">Current Plan</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400">Status</p>
                  <p className="text-2xl font-bold capitalize text-green-500">
                    {subscriptionStatus?.subscriptionStatus}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400">Days Remaining</p>
                  <p className="text-2xl font-bold">{subscriptionStatus?.daysRemaining} days</p>
                </div>
                <div className="disclaimer">
                  You have {subscriptionStatus?.daysRemaining} days of free trial remaining.
                </div>
                <button
                  onClick={() => navigate('/subscription')}
                  className="btn-primary w-full"
                >
                  View Plans
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
