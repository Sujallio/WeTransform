import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI } from '../utils/api';

export default function Onboarding() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    selectedAreas: [],
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const areas = [
    { id: 'skincare', label: '💆 Skincare & Hygiene', description: 'Facial routines, product suggestions' },
    { id: 'haircut', label: '✂️ Haircut & Grooming', description: 'Hairstyles & care tips' },
    { id: 'fashion', label: '👕 Fashion & Color', description: 'Clothing & color recommendations' },
    { id: 'diet', label: '🥗 Diet & Nutrition', description: 'Healthy eating for skin and body' },
    { id: 'body-confidence', label: '💪 Body Confidence', description: 'Fitness & body positivity' },
    { id: 'communication', label: '🎤 Communication Skills', description: 'Confidence & social skills' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const toggleArea = (areaId) => {
    const selected = formData.selectedAreas.includes(areaId)
      ? formData.selectedAreas.filter(a => a !== areaId)
      : [...formData.selectedAreas, areaId];
    setFormData({ ...formData, selectedAreas: selected });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!formData.height || !formData.weight) {
        setError('Height and weight are required');
        setLoading(false);
        return;
      }

      await userAPI.createProfile(formData);
      navigate('/photo-analysis');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-500 mb-8">Complete Your Profile</h1>

        {error && <div className="bg-red-900 text-red-200 p-4 rounded mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Height & Weight */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">Physical Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Height (cm)</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Weight (kg)</label>
                <input
                  type="number"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm mt-3">
              💡 This helps us provide age-appropriate guidance on nutrition and fitness.
            </p>
          </div>

          {/* Areas Selection */}
          <div className="card">
            <h3 className="text-xl font-bold mb-4">What Do You Want to Improve?</h3>
            <p className="text-gray-400 mb-4">Select one or more areas</p>
            <div className="space-y-2">
              {areas.map((area) => (
                <label
                  key={area.id}
                  className={`block p-4 rounded border-2 cursor-pointer transition ${
                    formData.selectedAreas.includes(area.id)
                      ? 'border-green-500 bg-green-950'
                      : 'border-gray-700 bg-gray-900'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.selectedAreas.includes(area.id)}
                    onChange={() => toggleArea(area.id)}
                    className="mr-3"
                  />
                  <strong className="text-lg">{area.label}</strong>
                  <p className="text-gray-400 text-sm ml-6 mt-1">{area.description}</p>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Creating Profile...' : 'Continue to Photo Analysis'}
          </button>
        </form>
      </div>
    </div>
  );
}
