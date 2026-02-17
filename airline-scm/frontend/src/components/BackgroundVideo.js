import React from 'react';
import bgVideo from '../utils/12800333_3840_2160_60fps.mp4';

const BackgroundVideo = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-20"
        style={{filter: 'blur(2px)'}}
      >
        <source src={bgVideo} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
