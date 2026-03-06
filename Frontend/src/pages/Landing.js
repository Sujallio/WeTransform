import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-green-500">WeTransform</h1>
          <p className="text-gray-400 mt-2">AI-Powered Self-Care & Confidence Guidance</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-5xl font-bold mb-6">
            Your Journey to <span className="text-green-500">Self-Growth</span> Starts Here
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            WeTransform is a safe, AI-powered platform designed specifically for teenagers (12–18) 
            to receive personalized guidance on self-care, grooming, fashion, diet, and confidence—
            all in one place.
          </p>

          <div className="grid md:grid-cols-3 gap-8 my-12">
            <div className="card">
              <h3 className="text-2xl font-bold text-green-500 mb-3">🎯 Safe & Secure</h3>
              <p className="text-gray-300">Parental consent required. Your data is protected and never altered or shared.</p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold text-green-500 mb-3">✨ Personalized</h3>
              <p className="text-gray-300">AI-driven guidance tailored to your unique features, preferences, and goals.</p>
            </div>
            <div className="card">
              <h3 className="text-2xl font-bold text-green-500 mb-3">💪 Holistic Growth</h3>
              <p className="text-gray-300">Focus on healthy habits, confidence, and personal development—not perfection.</p>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link to="/login" className="btn-secondary">
              Already a User? Login
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-green-500">What You'll Get</h2>
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-bold mb-2">📸 AI Photo Analysis (Optional)</h3>
              <p className="text-gray-300">Upload a photo for analysis of face shape, skin type, and personalized style recommendations.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2">💆 Skincare & Grooming</h3>
              <p className="text-gray-300">Morning and evening routines, product suggestions, and hygiene tips tailored to your needs.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2">👕 Fashion & Style</h3>
              <p className="text-gray-300">Color palette recommendations and clothing guidance suited to your skin tone and face shape.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2">🥗 Diet & Nutrition</h3>
              <p className="text-gray-300">Healthy eating charts for skin health, energy, and growth—age-appropriate and balanced.</p>
            </div>
            <div className="card">
              <h3 className="text-xl font-bold mb-2">🎤 Communication & Confidence</h3>
              <p className="text-gray-300">Tips on body language, eye contact, starting conversations, and daily confidence exercises.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="disclaimer">
            <strong>⚠️ Important Disclaimer:</strong> WeTransform provides educational guidance only. 
            It does not offer medical, cosmetic, or professional advice. Always consult healthcare 
            professionals for medical concerns. We do not promote unrealistic beauty standards or 
            guarantee appearance changes.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 text-center text-gray-400">
        <p>&copy; 2026 WeTransform. Empowering Teens Through Self-Care & Confidence.</p>
      </footer>
    </div>
  );
}
