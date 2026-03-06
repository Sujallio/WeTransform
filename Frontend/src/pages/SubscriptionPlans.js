import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { guidanceAPI } from '../utils/api';

export default function SubscriptionPlans() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const plans = [
    { id: '1month', name: '1 Month', price: '₹149', days: 30 },
    { id: '2months', name: '2 Months', price: '₹250', days: 60 },
    { id: '3months', name: '3 Months', price: '₹450', days: 90, popular: true },
    { id: '6months', name: '6 Months', price: '₹600', days: 180 },
  ];

  const handleUpgrade = async (planId) => {
    setError('');
    setLoading(true);

    try {
      await guidanceAPI.upgradeSubscription({ plan: planId });
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Upgrade failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-green-500">Subscription Plans</h1>
          <Link to="/dashboard" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        <div className="card mb-8">
          <h3 className="text-xl font-bold mb-4">Unlock Premium Features</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Advanced personalization
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Progress tracking
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Structured improvement programs
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Priority support
            </li>
          </ul>
        </div>

        {error && <div className="bg-red-900 text-red-200 p-4 rounded mb-4">{error}</div>}

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg p-6 border-2 transition ${
                plan.popular
                  ? 'border-green-500 bg-green-950'
                  : 'border-gray-700 bg-gray-900'
              }`}
            >
              {plan.popular && (
                <div className="inline-block bg-green-500 text-black px-3 py-1 rounded text-xs font-bold mb-3">
                  MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.days} days access</p>
              <p className="text-3xl font-bold text-green-500 mb-6">{plan.price}</p>
              <button
                onClick={() => handleUpgrade(plan.id)}
                disabled={loading}
                className={`w-full py-3 rounded font-bold transition ${
                  plan.popular
                    ? 'bg-green-500 hover:bg-green-600 text-black'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                } disabled:opacity-50`}
              >
                {loading ? 'Processing...' : 'Upgrade Now'}
              </button>
            </div>
          ))}
        </div>

        <div className="disclaimer">
          <strong>Note:</strong> This is a mockup. In production, this would connect to a real payment gateway.
          The upgrade will extend your subscription for the selected duration in this MVP.
        </div>

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            <div>
              <p className="font-bold mb-2">Can I cancel anytime?</p>
              <p className="text-gray-400">Yes, you can manage your subscription in your account settings.</p>
            </div>
            <div>
              <p className="font-bold mb-2">Can I upgrade my plan?</p>
              <p className="text-gray-400">Yes, you can upgrade to a longer plan anytime.</p>
            </div>
            <div>
              <p className="font-bold mb-2">Is my data safe?</p>
              <p className="text-gray-400">Absolutely. We prioritize your privacy and never share your data.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
