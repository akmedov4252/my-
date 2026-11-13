import { useEffect, useState } from 'react';

export interface TypewriterState {
  displayed: string;
  done: boolean;
}

export function useTypewriter(
  text: string,
  speed = 38,
  startDelay = 600,
): TypewriterState {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
    if (!text) {
      return;
    }

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((prev) => {
          if (prev >= text.length) {
            if (intervalId !== undefined) {
              window.clearInterval(intervalId);
            }
            return prev;
          }
          const next = prev + 1;
          if (next >= text.length && intervalId !== undefined) {
            window.clearInterval(intervalId);
          }
          return next;
        });
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  const done = index >= text.length;
  return {
    displayed: text.slice(0, index),
    done,
  };
}
