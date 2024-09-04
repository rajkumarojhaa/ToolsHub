import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ImageConverter from './components/ImageConverter';
import PasswordGenerator from './components/PasswordGenerator';
import QrcodeGenerator from './components/QrcodeGenerator';
import ColorConverter from './components/ColorConverter';
import WordCounter from './components/WordCounter';
import TextFormatter from './components/TextFormatter';
import Navbar from './components/Navbar';
// import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    
      <Router>
        <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white">
          <Navbar />
          <div className="p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/image-converter" element={<ImageConverter />} />
              <Route path="/word-counter" element={<WordCounter />} />
              <Route path="/text-formatter" element={<TextFormatter />} />
              <Route path="/password-generator" element={<PasswordGenerator />} />
              <Route path="/qrcode-generator" element={<QrcodeGenerator />} />
              <Route path="/color-converter" element={<ColorConverter />} />
            </Routes>
          </div>
        </div>
      </Router>
    
  );
};

export default App;
