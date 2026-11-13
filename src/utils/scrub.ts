export const SCRUB_SENSITIVITY = 0.8;

export function clampTime(time: number, duration: number): number {
  if (!Number.isFinite(duration) || duration <= 0) {
    return 0;
  }
  if (!Number.isFinite(time)) {
    return 0;
  }
  return Math.min(Math.max(time, 0), duration);
}

export function computeNextScrubTime(params: {
  currentTargetTime: number;
  deltaX: number;
  viewportWidth: number;
  duration: number;
  sensitivity?: number;
}): number {
  const {
    currentTargetTime,
    deltaX,
    viewportWidth,
    duration,
    sensitivity = SCRUB_SENSITIVITY,
  } = params;

  if (
    !Number.isFinite(duration) ||
    duration <= 0 ||
    !Number.isFinite(viewportWidth) ||
    viewportWidth <= 0 ||
    !Number.isFinite(deltaX)
  ) {
    return clampTime(currentTargetTime, duration);
  }

  const timeOffset = (deltaX / viewportWidth) * sensitivity * duration;
  return clampTime(currentTargetTime + timeOffset, duration);
}

export function shouldQueueSeek(
  actualTime: number,
  targetTime: number,
  epsilon = 0.001,
): boolean {
  if (!Number.isFinite(actualTime) || !Number.isFinite(targetTime)) {
    return false;
  }
  return Math.abs(actualTime - targetTime) > epsilon;
}
