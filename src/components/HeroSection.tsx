import { useEffect, useRef, useState } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

const TYPEWRITER_TEXT =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';

const PILL_ACTIONS = [
  'Pitch us an idea',
  'Come work here',
  'Send a brief hello',
  'See how we operate',
] as const;

const CONTACT_EMAIL = 'hello@mainframe.co';

export function HeroSection() {
  const { displayed, done } = useTypewriter(TYPEWRITER_TEXT, 38, 600);
  const [pillsVisible, setPillsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setPillsVisible(true);
    }, 400);

    return () => {
      window.clearTimeout(timer);
      if (copyTimeoutRef.current !== undefined) {
        window.clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleCopyEmail = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(CONTACT_EMAIL).catch(() => {
        // Clipboard API may be restricted in non-secure or headless contexts.
      });
    }
    setCopied(true);
    if (copyTimeoutRef.current !== undefined) {
      window.clearTimeout(copyTimeoutRef.current);
    }
    copyTimeoutRef.current = window.setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <main
      id="top"
      className="relative z-[1] h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden"
    >
      <div className="max-w-xl relative z-10">
        <p className="pointer-events-none select-none mb-5 sm:mb-6 text-[clamp(18px,4vw,26px)] leading-[1.3] font-normal text-white blur-[4px]">
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </p>

        <p
          className="text-white mb-5 sm:mb-6 text-[clamp(18px,4vw,26px)] leading-[1.35] font-normal min-h-[54px]"
          aria-label={TYPEWRITER_TEXT}
        >
          {displayed}
          {!done && (
            <span
              aria-hidden="true"
              className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink"
            />
          )}
        </p>

        <div
          className={`flex flex-wrap gap-y-1 [transition:opacity_0.4s_ease,transform_0.4s_ease] ${
            pillsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-[8px]'
          }`}
        >
          {PILL_ACTIONS.map((label) => (
            <button
              key={label}
              type="button"
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
            >
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={handleCopyEmail}
            data-copied={copied ? 'true' : 'false'}
            aria-label={
              copied
                ? `Copied ${CONTACT_EMAIL} to clipboard`
                : `Reach us: ${CONTACT_EMAIL}, click to copy email`
            }
            className="inline-flex items-center justify-center gap-2 sm:gap-3 text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <span>
              Reach us:{' '}
              <span className="underline underline-offset-1">
                {CONTACT_EMAIL}
              </span>
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="shrink-0"
            >
              <rect
                x="3.75"
                y="3.75"
                width="7"
                height="7"
                rx="1"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M8.25 3.75V2.25C8.25 1.69772 7.80228 1.25 7.25 1.25H2.25C1.69772 1.25 1.25 1.69772 1.25 2.25V7.25C1.25 7.80228 1.69772 8.25 2.25 8.25H3.75"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
