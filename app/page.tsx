'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const STREAM_URL = 'https://panel.radioretrodance.com/listen/radio_retro_dance/radio.mp3'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [isLoading, setIsLoading] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const previousVolume = useRef(0.8)

  useEffect(() => {
    audioRef.current = new Audio(STREAM_URL)
    audioRef.current.volume = volume
    audioRef.current.preload = 'none'

    const audio = audioRef.current
    const handleWaiting = () => setIsLoading(true)
    const handlePlaying = () => setIsLoading(false)
    const handleError = () => {
      setIsLoading(false)
      setIsPlaying(false)
    }

    audio.addEventListener('waiting', handleWaiting)
    audio.addEventListener('playing', handlePlaying)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('waiting', handleWaiting)
      audio.removeEventListener('playing', handlePlaying)
      audio.removeEventListener('error', handleError)
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  const togglePlay = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      setIsLoading(true)
      try {
        audioRef.current.src = STREAM_URL
        await audioRef.current.play()
        setIsPlaying(true)
      } catch (error) {
        console.error('Error playing audio:', error)
        setIsLoading(false)
      }
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
    if (newVolume > 0) previousVolume.current = newVolume
  }

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume.current)
      setIsMuted(false)
    } else {
      previousVolume.current = volume
      setVolume(0)
      setIsMuted(true)
    }
  }

  const handleShare = async () => {
    const shareData = {
      title: 'Radio Retro Dance',
      text: 'Escucha los mejores clásicos dance de los 90s y 2000s',
      url: 'https://radioretrodance.com',
    }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch {}
    } else {
      navigator.clipboard.writeText('https://radioretrodance.com').catch(() => {})
    }
  }

  return (
    <main className="min-h-screen w-screen relative overflow-x-hidden">
      {/* Background layers */}
      <div className="retro-bg" />
      <div className="stars" />

      {/* Content */}
      <div className="scanlines relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-6 sm:py-8">

        {/* Logo */}
        <div className="float mb-4">
          <Image
            src="/logo.png"
            alt="Radio Retro Dance"
            width={320}
            height={160}
            priority
            className="w-[220px] sm:w-[280px] md:w-[320px] h-auto neon-glow"
          />
        </div>

        {/* Live Badge */}
        <div className="live-indicator mb-6">
          En Directo
        </div>

        {/* Player Card */}
        <div className="w-full max-w-sm bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">

          {/* Play Button */}
          <div className="flex justify-center mb-5">
            <div className="relative">
              {isPlaying && (
                <>
                  <div className="pulse-ring" style={{ animationDelay: '0s' }} />
                  <div className="pulse-ring" style={{ animationDelay: '0.5s' }} />
                </>
              )}
              <button
                onClick={togglePlay}
                className="play-button"
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                disabled={isLoading}
              >
                {isLoading ? (
                  <svg className="animate-spin w-7 h-7 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : isPlaying ? (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Station Name */}
          <p className="text-center text-white/60 text-sm mb-5 tracking-wide">
            Classic 90s & 2000s
          </p>

          {/* Volume */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleMute}
              className="text-white/50 hover:text-white transition-colors"
              aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted || volume === 0 ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1"
              aria-label="Volumen"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <button onClick={handleShare} className="action-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
            Compartir
          </button>
          <button
            onClick={() => window.open(STREAM_URL, '_blank', 'noopener,noreferrer')}
            className="action-btn"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Stream URL
          </button>
        </div>

        {/* Store Badges - Coming Soon */}
        <div className="store-badges">
          <p className="store-badges-label">Proximamente</p>
          <div className="store-badges-row">
            <Image
              src="/badge-appstore.svg"
              alt="Download on the App Store"
              width={135}
              height={40}
              className="store-badge"
            />
            <Image
              src="/badge-playstore.svg"
              alt="Get it on Google Play"
              width={135}
              height={40}
              className="store-badge"
            />
          </div>
        </div>

        {/* Footer */}
        <p className="text-white/30 text-xs mt-4">
          radioretrodance.com
        </p>
      </div>
    </main>
  )
}
