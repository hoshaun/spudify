import React from 'react';


import { useRef, useState } from 'react';
import { tracks } from './Tracks';

import DisplayTrack from './DIsplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  // reference
  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack
          currentTrack={currentTrack}
          audioRef={audioRef}
        />
        <Controls audioRef={audioRef} src={currentTrack.src} />
        <ProgressBar progressBarRef={progressBarRef}/>
      </div>
    </div>
  );
};

export default AudioPlayer;