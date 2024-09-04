// src/components/Home.js
import React from 'react';
import AnimatedText from '../components/AnimatedText';
import ToolCard from './ToolCard';
import { FaFileAlt } from 'react-icons/fa';
import { FaImage } from "react-icons/fa6";
import { TbPasswordFingerprint } from "react-icons/tb";
import { BsQrCode } from "react-icons/bs";

const Home = () => {
  return (
    <div>
      <AnimatedText />
      <p className="text-center mx-auto mt-3 text-lg text-slate-400">
      Here is a collection of online free tools I have frequently used.
    </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        <ToolCard 
          title="Converter" 
          tools={[
            { name: "Image Converter", path: "/image-converter", icon: <FaImage className="text-4xl text-green-500 mr-4" /> }, 
            { name: "Color Converter", path: "/color-converter", icon: "🎨" }
          ]} 
        />
        <ToolCard 
          title="Text Editor" 
          tools={[
            { name: "Word Counter", path: "/word-counter", icon: <FaFileAlt className="text-4xl text-blue-500 mr-4" /> },
            { name: "Text Formatter", path: "/text-formatter", icon: <FaFileAlt className="text-4xl text-blue-500 mr-4" /> }
          ]} 
        />
        <ToolCard 
          title="Generator" 
          tools={[
            { name: "Password Generator", path: "/password-generator", icon: <TbPasswordFingerprint className="text-4xl text-pink-500 mr-4" /> },
            { name: "Qrcode Generator", path: "/qrcode-generator", icon: <BsQrCode className="text-4xl text-blue-500 mr-4"/> }
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
