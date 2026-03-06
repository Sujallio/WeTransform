import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { guidanceAPI, analysisAPI } from '../utils/api';

export default function GuidanceDashboard() {
  const navigate = useNavigate();
  const [guidance, setGuidance] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    loadGuidance();
  }, []);

  const loadGuidance = async () => {
    try {
      setLoading(true);
      const [guidanceRes, analysisRes] = await Promise.all([
        guidanceAPI.getGuidance(),
        analysisAPI.getLatestAnalysis().catch(() => null)
      ]);
      setGuidance(guidanceRes.data.guidance);
      setAnalysis(analysisRes?.data.analysis || null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load guidance');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-green-500">Loading guidance...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white py-12">
        <div className="container mx-auto max-w-2xl">
          <div className="card">
            <p className="text-red-200 mb-4">{error}</p>
            <Link to="/guidance-selection" className="btn-primary">
              Generate Guidance
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!guidance) {
    return (
      <div className="min-h-screen bg-black text-white py-12">
        <div className="container mx-auto max-w-2xl">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">No Guidance Yet</h2>
            <p className="text-gray-400 mb-4">Start by selecting areas you want guidance on.</p>
            <Link to="/guidance-selection" className="btn-primary">
              Get Guidance
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const areaEmojis = {
    skincare: '💆',
    haircut: '✂️',
    fashion: '👕',
    diet: '🥗',
    'body-confidence': '💪',
    communication: '🎤',
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-green-500">Your Personalized Guidance</h1>
          <Link to="/dashboard" className="btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        <div className="disclaimer">
          {guidance.disclaimer}
        </div>

        {/* Guidance Areas */}
        {guidance.areas && guidance.areas.length > 0 && (
          <div className="mb-12">
            <div className="flex gap-2 mb-6 overflow-x-auto flex-wrap">
              {guidance.areas.map((area, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 rounded font-bold transition whitespace-nowrap ${
                    activeTab === idx
                      ? 'bg-green-500 text-black'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
                >
                  {areaEmojis[area.areaType]} {area.areaType}
                </button>
              ))}
            </div>

            <div className="card">
              {guidance.areas[activeTab] && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold capitalize mb-4 text-green-500">
                      {areaEmojis[guidance.areas[activeTab].areaType]} {guidance.areas[activeTab].areaType}
                    </h3>
                    
                    {guidance.areas[activeTab].areaType === 'fashion' && !analysis && (
                      <div className="bg-yellow-900 border border-yellow-700 rounded p-4 mb-6">
                        <p className="text-yellow-100">
                          💡 <strong>Tip:</strong> Upload a photo for personalized color recommendations based on your skin tone and face shape!
                        </p>
                        <Link to="/photo-analysis" className="text-yellow-300 hover:text-yellow-100 underline mt-2 inline-block">
                          Upload Photo Now →
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Morning Routine */}
                  {guidance.areas[activeTab].routine?.morning?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-3">🌅 Morning Routine</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        {guidance.areas[activeTab].routine.morning.map((step, idx) => (
                          <li key={idx} className="text-gray-300">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Evening Routine */}
                  {guidance.areas[activeTab].routine?.evening?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-3">🌙 Evening Routine</h4>
                      <ol className="list-decimal list-inside space-y-2">
                        {guidance.areas[activeTab].routine.evening.map((step, idx) => (
                          <li key={idx} className="text-gray-300">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Recommendations */}
                  {guidance.areas[activeTab].recommendations?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-3">⭐ Recommendations</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {guidance.areas[activeTab].recommendations.map((rec, idx) => (
                          <li key={idx} className="text-gray-300">{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Product Suggestions */}
                  {guidance.areas[activeTab].productSuggestions?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-3">💄 Product Suggestions</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {guidance.areas[activeTab].productSuggestions.map((product, idx) => (
                          <li key={idx} className="text-gray-300">{product}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tips */}
                  {guidance.areas[activeTab].tips?.length > 0 && (
                    <div>
                      <h4 className="text-lg font-bold mb-3">💡 Tips</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {guidance.areas[activeTab].tips.map((tip, idx) => (
                          <li key={idx} className="text-gray-300">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Diet Chart */}
        {guidance.dietChart && (
          <div className="card mb-6">
            <h3 className="text-2xl font-bold mb-6 text-green-500">🥗 Diet & Nutrition</h3>

            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3">Foods for Skin Health</h4>
              <ul className="list-disc list-inside space-y-2">
                {guidance.dietChart.foodsForSkinHealth.map((food, idx) => (
                  <li key={idx} className="text-gray-300">{food}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3">Foods for Energy & Growth</h4>
              <ul className="list-disc list-inside space-y-2">
                {guidance.dietChart.foodsForEnergyGrowth.map((food, idx) => (
                  <li key={idx} className="text-gray-300">{food}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3">Hydration Tips</h4>
              <ul className="list-disc list-inside space-y-2">
                {guidance.dietChart.hydrationTips.map((tip, idx) => (
                  <li key={idx} className="text-gray-300">{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Confidence Tips */}
        {guidance.confidenceTips && (
          <div className="card">
            <h3 className="text-2xl font-bold mb-6 text-green-500">💪 Confidence & Communication</h3>

            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3">Body Posture</h4>
              <ul className="list-disc list-inside space-y-2">
                {guidance.confidenceTips.bodyPosture.map((tip, idx) => (
                  <li key={idx} className="text-gray-300">{tip}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3">Eye Contact</h4>
              <ul className="list-disc list-inside space-y-2">
                {guidance.confidenceTips.eyeContact.map((tip, idx) => (
                  <li key={idx} className="text-gray-300">{tip}</li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold mb-3">Conversation Starters</h4>
              <ul className="list-disc list-inside space-y-2">
                {guidance.confidenceTips.conversationStarters.map((tip, idx) => (
                  <li key={idx} className="text-gray-300">{tip}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3">Daily Confidence Exercises</h4>
              <ul className="list-disc list-inside space-y-2">
                {guidance.confidenceTips.dailyExercises.map((exercise, idx) => (
                  <li key={idx} className="text-gray-300">{exercise}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
