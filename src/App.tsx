import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AccessibilityBar } from './components/layout/AccessibilityBar';

// Page Components
import { Home } from './pages/Home';
import { HowItHelps } from './pages/HowItHelps';
import { Learn } from './pages/Learn';
import { CategoryDetail } from './pages/CategoryDetail';
import { Guides } from './pages/Guides';
import { GuideDetail } from './pages/GuideDetail';
import { VoiceAssistant } from './pages/VoiceAssistant';
import { AccessibilityCenter } from './pages/AccessibilityCenter';
import { TryIt } from './pages/TryIt';
import { Community } from './pages/Community';
import { Impact } from './pages/Impact';
import { About } from './pages/About';

export default function App() {
  return (
    <AccessibilityProvider>
      <Router>
        <div className="min-h-screen flex flex-col justify-between selection:bg-teal-200 selection:text-teal-950">
          {/* Main Top Navigation */}
          <Navbar />

          {/* Route Content Area */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/how-it-helps" element={<HowItHelps />} />
              <Route path="/learn" element={<Learn />} />
              <Route path="/learn/:categoryId" element={<CategoryDetail />} />
              <Route path="/guides" element={<Guides />} />
              <Route path="/guides/:guideId" element={<GuideDetail />} />
              <Route path="/voice" element={<VoiceAssistant />} />
              <Route path="/accessibility" element={<AccessibilityCenter />} />
              <Route path="/try-it" element={<TryIt />} />
              <Route path="/community" element={<Community />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          {/* Persistent Quick Accessibility Helper Toolbar */}
          <AccessibilityBar />

          {/* Warm Accessible Footer */}
          <Footer />
        </div>
      </Router>
    </AccessibilityProvider>
  );
}
