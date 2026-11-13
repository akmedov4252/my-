import test from 'node:test';
import assert from 'node:assert/strict';
import { clampTime, computeNextScrubTime, SCRUB_SENSITIVITY, shouldQueueSeek } from './scrub';

test('SCRUB_SENSITIVITY matches 0.8 specification', () => {
  assert.equal(SCRUB_SENSITIVITY, 0.8);
});

test('computeNextScrubTime advances proportionally to horizontal mouse delta', () => {
  const next = computeNextScrubTime({
    currentTargetTime: 2,
    deltaX: 100,
    viewportWidth: 1000,
    duration: 10,
  });
  // (100 / 1000) * 0.8 * 10 = 0.8 -> 2 + 0.8 = 2.8
  assert.ok(Math.abs(next - 2.8) < 1e-9);
});

test('computeNextScrubTime scrubs backward on negative delta', () => {
  const next = computeNextScrubTime({
    currentTargetTime: 5,
    deltaX: -250,
    viewportWidth: 1000,
    duration: 10,
  });
  // (-250 / 1000) * 0.8 * 10 = -2.0 -> 5 - 2 = 3.0
  assert.ok(Math.abs(next - 3.0) < 1e-9);
});

test('computeNextScrubTime clamps between 0 and video duration', () => {
  const minClamped = computeNextScrubTime({
    currentTargetTime: 0.2,
    deltaX: -500,
    viewportWidth: 1000,
    duration: 10,
  });
  assert.equal(minClamped, 0);

  const maxClamped = computeNextScrubTime({
    currentTargetTime: 9.5,
    deltaX: 500,
    viewportWidth: 1000,
    duration: 10,
  });
  assert.equal(maxClamped, 10);
});

test('clampTime guards against invalid or zero durations', () => {
  assert.equal(clampTime(3, 0), 0);
  assert.equal(clampTime(3, Number.NaN), 0);
  assert.equal(clampTime(-4, 12), 0);
  assert.equal(clampTime(15, 12), 12);
});

test('shouldQueueSeek detects divergence between actual and target times', () => {
  assert.equal(shouldQueueSeek(1.5, 1.5), false);
  assert.equal(shouldQueueSeek(1.5, 1.5005), false);
  assert.equal(shouldQueueSeek(1.5, 1.55), true);
});
