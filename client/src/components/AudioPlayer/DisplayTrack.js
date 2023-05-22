import React from 'react';
import { BsMusicNoteBeamed } from 'react-icons/bs';

export default function DisplayTrack({
  currentTrack,
  audioRef,
  setDuration,
  progressBarRef,
  handleNext,
}) {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  const src = currentTrack.source ? currentTrack.source : '';
  
  return (
    <div>
      <audio
        src={src}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleNext}
      />
      <div className="audio-info">
        <div className="audio-image">
          <div className="icon-wrapper">
            <span className="audio-icon">
              <BsMusicNoteBeamed />
            </span>
          </div>
        </div>
        <div className="text">
          { currentTrack && currentTrack.title && 
            <>
              <p className="title">{currentTrack.title}</p>
              <p>by {currentTrack ? currentTrack.artist : ''}</p>
            </>
          }
        </div>
      </div>
    </div>
  );
}


