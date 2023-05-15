import React from 'react';

import { useRef, useState } from 'react';
import { tracks } from './Tracks';

import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
 
  // reference
  const progressBarRef = useRef();
  const audioRef = useRef();
  
  console.log(audioRef);

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack {...{ currentTrack, audioRef, setDuration, progressBarRef }} />
        <Controls
  audioRef={audioRef}
  progressBarRef={progressBarRef}
  duration={duration}
  setTimeProgress={setTimeProgress}
  tracks={tracks} 
  trackIndex={trackIndex}
  setTrackIndex={setTrackIndex}
  setCurrentTrack={setCurrentTrack}
/>
        <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }} />
      </div>
    </div>
  );
};

export default AudioPlayer;