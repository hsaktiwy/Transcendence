import React, { useState } from 'react';
import './InfoLink.css';

export default function InfoLink() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="info-container">
      <img
        className="info-icon"
        src="/GamePub/bottouns/info.png"
        alt="information icon"
        onClick={() => setShowTooltip(!showTooltip)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      {showTooltip && (
        <div className="tooltip">
          <p>    This web app harnesses React.js for a dynamic user interface, Three.js for interactive 3D scenes</p>
          <p>,GSAP for smooth, fluid animations, and vanilla JavaScript for custom logic and manual physics.</p>
          <p> Combined, these technologies produce an immersive, visually captivating experience, bringing both</p>
          <p> 3D Ping Pong and 3D Chess to life right in your browser.</p>
      
        </div>
      )}
      <span className="info-text">More information</span>
    </div>
  );
}
