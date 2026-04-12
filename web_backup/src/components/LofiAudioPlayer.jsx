import React, { useState, useEffect, useRef } from 'react';
import { FiMusic, FiVolumeX } from 'react-icons/fi';

const LofiAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const noiseNodeRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Generates synthetic pink noise for ambient background
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      
      // Pink noise algorithm
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        let white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        output[i] *= 0.11; // Scale down for subtle ambiance
        b6 = white * 0.115926;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const gainNode = ctx.createGain();
      gainNode.gain.value = 0.05; // very quiet

      // Filter to make it sound more like distant wind/rain
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400;

      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      noiseNodeRef.current = noise;
      gainNodeRef.current = gainNode;
      noise.start();
    }
  };

  const togglePlay = () => {
    if (!isPlaying) {
      if (!audioCtxRef.current) initAudio();
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setIsPlaying(false);
    }
  };

  return (
    <button 
      className="icon-button" 
      onClick={togglePlay}
      title={isPlaying ? "Mute Ambiance" : "Play Ambiance"}
      style={{
        boxShadow: isPlaying ? '0 0 15px var(--star-glow)' : 'none',
        color: isPlaying ? 'var(--moon-glow)' : 'var(--text-primary)'
      }}
    >
      {isPlaying ? <FiMusic /> : <FiVolumeX />}
    </button>
  );
};

export default LofiAudioPlayer;
