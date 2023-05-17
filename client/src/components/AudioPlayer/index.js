import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

export default function AudioPlayer(props) {
  const [tracks, setTracks] = useState(props.tracks ? props.tracks : []);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const progressBarRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    console.log(props.tracks);
    setTracks(props.tracks ? props.tracks : []);
  }, [props]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0] ? tracks[0].props : {});
      console.log(tracks);
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