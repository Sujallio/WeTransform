import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI, analysisAPI } from '../utils/api';

export default function PhotoAnalysis() {
  const navigate = useNavigate();
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [useCamera, setUseCamera] = useState(false);

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzePhoto = async () => {
    setError('');
    setLoading(true);

    try {
      if (!photoFile) {
        throw new Error('No photo selected');
      }

      // Analyze photo with base64 data
      const response = await analysisAPI.analyzePhoto({
        photoUrl: `photo_${Date.now()}`,
        photoData: photoPreview,
      });

      if (response.data.analysis) {
        localStorage.setItem('lastAnalysis', JSON.stringify(response.data.analysis));
      }

      navigate('/guidance-selection');
    } catch (err) {
      console.error('Photo analysis error:', err);
      setError(err.response?.data?.error || err.message || 'Failed to analyze photo');
    } finally {
      setLoading(false);
    }
  };

  const handleSkipPhoto = async () => {
    setError('');
    setLoading(true);

    try {
      await analysisAPI.skipAnalysis();
      navigate('/guidance-selection');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to skip photo analysis');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-green-500 mb-4">AI Photo Analysis</h1>

        <div className="disclaimer">
          <strong>🔒 Privacy & Safety:</strong> Your photo is used only for analysis. 
          You can delete it anytime. We never store, share, or alter your photos.
        </div>

        {error && <div className="bg-red-900 text-red-200 p-4 rounded mb-4">{error}</div>}

        <div className="card">
          <h3 className="text-xl font-bold mb-4">Upload Your Photo (Optional)</h3>
          <p className="text-gray-400 mb-4">
            Upload a clear face photo for personalized analysis on face shape, skin type, and style recommendations.
          </p>

          {photoPreview && (
            <div className="mb-6">
              <img src={photoPreview} alt="Preview" className="w-full rounded max-h-80 object-cover" />
              <button
                type="button"
                onClick={() => {
                  setPhotoPreview(null);
                  setPhotoFile(null);
                }}
                className="btn-secondary w-full mt-3"
              >
                Remove Photo
              </button>
            </div>
          )}

          {!photoPreview && (
            <div className="space-y-4">
              <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
                <input
                  type="file"
                  id="photo-upload"
                  accept="image/*"
                  onChange={handlePhotoSelect}
                  className="hidden"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <p className="text-2xl mb-2">📸</p>
                  <p className="font-medium">Click to upload a photo</p>
                  <p className="text-gray-400 text-sm">or drag and drop</p>
                </label>
              </div>
            </div>
          )}

          {photoPreview && (
            <button
              onClick={handleAnalyzePhoto}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Photo'}
            </button>
          )}
        </div>

        <div className="card mt-6">
          <p className="text-gray-400 text-center mb-4">
            Not ready to upload a photo? No problem!
          </p>
          <button
            onClick={handleSkipPhoto}
            disabled={loading}
            className="btn-secondary w-full disabled:opacity-50"
          >
            {loading ? 'Continuing...' : 'Skip & Continue'}
          </button>
          <p className="text-gray-500 text-xs text-center mt-3">
            You can upload and analyze a photo later in your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
