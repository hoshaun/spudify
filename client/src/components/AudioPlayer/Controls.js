import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  IoPlayBackSharp,
  IoPlayForwardSharp,
  IoPlaySkipBackSharp,
  IoPlaySkipForwardSharp,
  IoPlaySharp,
  IoPauseSharp,
} from 'react-icons/io5';

import {
  IoMdVolumeHigh,
  IoMdVolumeOff,
  IoMdVolumeLow,
} from 'react-icons/io';

export default function Controls({
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
  handleNext // Add handleNext prop
}) {
  const playAnimationRef = useRef();
  const [volume, setVolume] = useState(25);
  const [muteVolume, setMuteVolume] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
    setRestart(false);
  };

  const repeat = useCallback(() => {
    if (isPlaying) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);
      progressBarRef.current.value = currentTime;
      // progressBarRef.current.style.setProperty(
      //   '--range-progress',
      //   `${(progressBarRef.current.value / duration) * 100}%`
      // );
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      cancelAnimationFrame(playAnimationRef.current);
    }
  }, [isPlaying, currentTrack/*, audioRef, duration, progressBarRef, setTimeProgress*/]);

  useEffect(() => {
    if (currentTrack.source) {
      if (restart) {
        setRestart(false);
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      } else if (isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        cancelAnimationFrame(playAnimationRef.current);
      }
      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [isPlaying, currentTrack/*, audioRef, repeat*/]);

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = muteVolume;
    }
  }, [volume, audioRef, muteVolume]);

  const skipForward = () => {
    audioRef.current.currentTime += 15;
  };

  const skipBackward = () => {
    audioRef.current.currentTime -= 15;
  };

  const handlePrevious = () => {
    if (trackIndex === 0) {
      let lastTrackIndex = tracks.length - 1;
      setTrackIndex(lastTrackIndex);
      setCurrentTrack(tracks[lastTrackIndex].props);
    } else {
      setTrackIndex((prev) => prev - 1);
      setCurrentTrack(tracks[trackIndex - 1].props);
    }
  };

  return (
    <div className="controls-wrapper">
      <div className="controls">
        <button onClick={handlePrevious}>
          <IoPlaySkipBackSharp className='control-button'/>
        </button>
        <button onClick={skipBackward}>
          <IoPlayBackSharp className='control-button'/>
        </button>

        <button onClick={togglePlayPause}>
          {isPlaying ? <IoPauseSharp className='control-button'/> : <IoPlaySharp className='control-button'/>}
        </button>

        <button onClick={skipForward}>
          <IoPlayForwardSharp className='control-button'/>
        </button>
        <button onClick={handleNext}>
          <IoPlaySkipForwardSharp className='control-button'/>
        </button>
      </div>
      <div className="volume">
        <button onClick={() => setMuteVolume((prev) => !prev)}>
          {muteVolume || volume < 5 ? (
            <IoMdVolumeOff className='control-button'/>
          ) : volume < 40 ? (
            <IoMdVolumeLow className='control-button'/>
          ) : (
            <IoMdVolumeHigh className='control-button'/>
          )}
        </button>
        <input type="range"
          min={0}
          max={100}
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="volume-slider"
          style={{
            background: `linear-gradient(to right, #FFBB00 ${volume}%, #aa875c ${volume}%)`,
          }}
        />
      </div>
    </div>
  );
};


