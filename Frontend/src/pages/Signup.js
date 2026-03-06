import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useAuth } from '../utils/AuthContext';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    age: '',
    gender: '',
    parentalConsent: false,
    parentEmail: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.parentalConsent) {
        setError('Parental consent is mandatory to use this platform.');
        setLoading(false);
        return;
      }

      const response = await authAPI.signup(formData);
      login(response.data.user, response.data.token);
      navigate('/onboarding');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-green-500 text-center mb-8">WeTransform</h1>

        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>

          <div className="disclaimer">
            <strong>👨‍👩‍👧:</strong> We are committed to protecting minors. 
            Parental consent is required and your data is completely secure.
          </div>

          {error && <div className="bg-red-900 text-red-200 p-4 rounded mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Age (12-18)</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="12"
                  max="18"
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-field"
                  required
                >
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Parent's Email</label>
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                className="input-field"
                placeholder="Optional"
              />
            </div>

            <div className="bg-gray-800 p-4 rounded space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="parentalConsent"
                  checked={formData.parentalConsent}
                  onChange={handleChange}
                  className="mt-1"
                  required
                />
                <span className="text-sm">
                  <strong>I confirm that:</strong>
                  <ul className="list-disc ml-4 mt-2 space-y-1">
                    <li>A parent or guardian has consented to me using this platform</li>
                    <li>I am 12-18 years old</li>
                    <li>I understand this is a guidance platform, not medical advice</li>
                  </ul>
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-gray-400 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-green-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
