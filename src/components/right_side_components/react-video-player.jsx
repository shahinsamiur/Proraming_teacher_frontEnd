import React from 'react';
import YouTube from 'react-youtube';

const YouTubePlayer = ({ videoId }) => {
  const onPlayerReady = (event) => {
    // Access to player API
    event.target.pauseVideo();
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,  // Auto-play the video
    },
  };

  return <YouTube videoId={videoId} opts={opts} onReady={onPlayerReady} className='h-[60%] w-[90%] rounded-lg bg-slate-500'/>;
};

export default YouTubePlayer;
