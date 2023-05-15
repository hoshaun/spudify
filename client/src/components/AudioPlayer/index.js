import React from 'react';

import { useRef, useState } from 'react';
import beautiful from './SampleData/a_beautiful_day.mp3';
import world from './SampleData/We_Are_The_World.mp3';

import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

export default function AudioPlayer(props) {

  // temp test tracks REMOVE LATER
  const tracks = [
    {
      title: 'Its a beautiful day',
      src: beautiful,
      author: 'Trinix ft Rushawn',
      //thumbnail: trinix,
    },
    {
      title: 'We Are The World',
      src: world,
      author: 'Michael Jackson',
      //thumbnail: trinix,
    },
  ];

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