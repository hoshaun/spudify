import React, { useEffect } from 'react';
import { useRef, useState } from 'react';

import './index-styles.scss'
import './slider-styles.scss'

import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';

export default function AudioPlayer(props) {
  const [tracks, setTracks] = useState([]);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState({});
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [restart, setRestart] = useState(false);

  const progressBarRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    setTracks(props.tracks ? props.tracks : []);
    setCurrentTrack(props.currentTrack ? props.currentTrack : {});
    setIsPlaying(props.isPlaying ? props.isPlaying : false);
    setRestart(props.restart ? props.restart : false);
  }, [props]);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0] ? tracks[0].props : {});
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1].props);
    }
  };

  return (
    <div className="inner">
      {/* <div className="inner"> */}
        <DisplayTrack {...{
          currentTrack,
          audioRef,
          setDuration,
          progressBarRef,
          handleNext
        }} />
        <Controls {...{
          currentTrack,
          audioRef,
          progressBarRef,
          duration,
          setTimeProgress,
          isPlaying,
          restart,
          tracks,
          trackIndex,
          setTrackIndex,
          setCurrentTrack,
          setIsPlaying,
          setRestart,
          handleNext
        }} />
        <ProgressBar {...{
          progressBarRef,
          audioRef,
          timeProgress,
          duration
        }} />
      {/* </div> */}
    </div>
  );
}