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

  let src;

  // convert downloaded file from DB to playable base64 audio string
  if (currentTrack && currentTrack.source && currentTrack.mimeType) {
    let binary = '';
    const bytes = new Uint8Array(currentTrack.source.data);

    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    src = 'data:' + currentTrack.mimeType + ';base64,' + btoa(binary);
  }
  
  return (
    <div>
      <audio
        src={src ? src : ''}
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
            <p className="title">{currentTrack.title}</p>
          }
          <p>{currentTrack ? currentTrack.artist : ''}</p>
        </div>
      </div>
    </div>
  );
}


