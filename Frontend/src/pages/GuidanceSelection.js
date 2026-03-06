import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { guidanceAPI, analysisAPI } from '../utils/api';

export default function GuidanceSelection() {
  const navigate = useNavigate();
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    // Check if analysis exists from localStorage
    const savedAnalysis = localStorage.getItem('lastAnalysis');
    if (savedAnalysis) {
      try {
        setAnalysis(JSON.parse(savedAnalysis));
      } catch (e) {
        setAnalysis(null);
      }
    } else {
      // Optionally fetch from API too
      analysisAPI.getLatestAnalysis()
        .then(res => {
          setAnalysis(res.data.analysis);
          localStorage.setItem('lastAnalysis', JSON.stringify(res.data.analysis));
        })
        .catch(() => setAnalysis(null));
    }
  }, []);

  const areas = [
    { id: 'skincare', label: '💆 Skincare & Hygiene', description: 'Facial routines, product suggestions' },
    { id: 'haircut', label: '✂️ Haircut & Grooming', description: 'Hairstyles & care tips' },
    { id: 'fashion', label: '👕 Fashion & Color', description: 'Clothing & color recommendations', requiresPhoto: true },
    { id: 'diet', label: '🥗 Diet & Nutrition', description: 'Healthy eating for skin and body' },
    { id: 'body-confidence', label: '💪 Body Confidence', description: 'Fitness & body positivity' },
    { id: 'communication', label: '🎤 Communication Skills', description: 'Confidence & social skills' },
  ];

  const toggleArea = (areaId) => {
    setSelectedAreas(prev =>
      prev.includes(areaId) ? prev.filter(a => a !== areaId) : [...prev, areaId]
    );
  };

  const handleGenerateGuidance = async () => {
    setError('');

    if (selectedAreas.length === 0) {
      setError('Please select at least one area');
      return;
    }

    // Check if fashion is selected but no photo analysis exists
    if (selectedAreas.includes('fashion') && !analysis) {
      setError('Please upload a photo first for personalized color recommendations! ✨');
      setTimeout(() => {
        navigate('/photo-analysis');
      }, 2000);
      return;
    }

    setLoading(true);

    try {
      await guidanceAPI.generateGuidance({ selectedAreas });
      navigate('/guidance');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate guidance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-500 mb-8">Select Your Guidance Areas</h1>

        {error && <div className="bg-red-900 text-red-200 p-4 rounded mb-4">{error}</div>}

        <div className="card">
          <p className="text-gray-400 mb-6">
            Choose which areas you'd like personalized guidance on:
          </p>

          <div className="space-y-2 mb-6">
            {areas.map((area) => (
              <label
                key={area.id}
                className={`block p-4 rounded border-2 cursor-pointer transition ${
                  selectedAreas.includes(area.id)
                    ? 'border-green-500 bg-green-950'
                    : 'border-gray-700 bg-gray-900'
                }`}
              >
              <input
                  type="checkbox"
                  checked={selectedAreas.includes(area.id)}
                  onChange={() => toggleArea(area.id)}
                  disabled={area.requiresPhoto && !analysis}
                  className="mr-3"
                />
                <strong className="text-lg">{area.label}</strong>
                {area.requiresPhoto && !analysis && (
                  <span className="text-yellow-400 text-sm ml-2">(📸 Photo required)</span>
                )}
                <p className="text-gray-400 text-sm ml-6 mt-1">{area.description}</p>
              </label>
            ))}
          </div>

          <button
            onClick={handleGenerateGuidance}
            disabled={loading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {loading ? 'Generating Guidance...' : 'Generate Personalized Guidance'}
          </button>
        </div>
      </div>
    </div>
  );
}
