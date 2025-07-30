import React from 'react';

const VideoPlayer = ({src}) => {
  return (
    <div className="w-full h-auto">
      <video
        src={src}
        autoPlay
        loop
        muted
        className="w-full h-full object-cover rounded-lg shadow-lg"
      />
    </div>
  );
};

export default VideoPlayer;