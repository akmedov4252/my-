import { useEffect, useRef } from 'react';
import { computeNextScrubTime, SCRUB_SENSITIVITY, shouldQueueSeek } from '../utils/scrub';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const video = videoRef.current;
      if (!video) {
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = event.clientX;
        return;
      }

      const delta = event.clientX - prevXRef.current;
      prevXRef.current = event.clientX;

      if (!Number.isFinite(video.duration) || video.duration <= 0) {
        return;
      }

      const nextTarget = computeNextScrubTime({
        currentTargetTime: targetTimeRef.current,
        deltaX: delta,
        viewportWidth: window.innerWidth,
        duration: video.duration,
        sensitivity: SCRUB_SENSITIVITY,
      });

      targetTimeRef.current = nextTarget;

      if (!isSeekingRef.current && shouldQueueSeek(video.currentTime, nextTarget)) {
        isSeekingRef.current = true;
        video.currentTime = nextTarget;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleSeeked = () => {
    const video = videoRef.current;
    if (!video) {
      isSeekingRef.current = false;
      return;
    }

    if (shouldQueueSeek(video.currentTime, targetTimeRef.current)) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    } else {
      isSeekingRef.current = false;
    }
  };

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      onError={() => {
        isSeekingRef.current = false;
      }}
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full object-cover object-[70%_center] pointer-events-none"
    />
  );
}
