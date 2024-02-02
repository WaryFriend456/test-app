import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
const Home = lazy(() => import('./components/Home'));
import { About } from './components/About';
import { ComplexNavbar } from './components/ImprovedNavBar';
import { Demo } from './components/Demo';
import SpeechToTextComponent from './components/VoiceInput.jsx';

export default function App() {
  return (
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
            <ComplexNavbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/demo" element={<Demo />} />
                <Route path="/voice-input" element={<SpeechToTextComponent/>} />
              <Route path="/about" element={<About />} />
            </Routes>
        </Suspense>
      </Router>
  )
}