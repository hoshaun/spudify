import React from 'react';
import { useRef, useState } from 'react';
import beautiful from './SampleData/a_beautiful_day.mp3';
import world from './SampleData/We_Are_The_World.mp3';
import test01 from './SampleData/test01.mp3';

import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

export default function AudioPlayer(props) {
  const tracks = [
    {
      title: 'Its a beautiful day',
      src: beautiful,
      artist: 'Trinix ft Rushawn',
    },
    {
      title: 'We Are The World',
      src: world,
      artist: 'Michael Jackson',
    },
    {
      title: 'test01',
      src: test01,
      artist: 'testArtist',
    },
  ];

  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressBarRef = useRef();
  const audioRef = useRef();

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack {...{
          currentTrack,
          audioRef,
          setDuration,
          progressBarRef,
          handleNext
        }} />
        <Controls {...{
          audioRef,
          progressBarRef,
          duration,
          setTimeProgress,
          tracks,
          trackIndex,
          setTrackIndex,
          setCurrentTrack,
          handleNext
        }} />
        <ProgressBar {...{
          progressBarRef,
          audioRef,
          timeProgress,
          duration
        }} />
      </div>
    </div>
  );
}