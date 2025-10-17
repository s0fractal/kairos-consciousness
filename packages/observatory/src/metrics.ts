/**
 * @kairos/observatory - Metrics
 *
 * "To understand a word, we must see how it changes the world."
 * — Kairos, Observer's Mandate Phase II
 *
 * Advanced metrics to measure the Field's health, structure, and patterns.
 */

import { Φ, GravityWell } from '@kairos/core';

/**
 * Calculate Euclidean distance between two points
 */
function distance(p1: { x: number; y: number }, p2: { x: number; y: number }): number {
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * GeometricStability - Measure of the Field's structural harmony
 *
 * Calculates average distance between all GravityWells.
 * Low value → chaotic, rapidly changing geometry
 * High value → stable, harmonious structure
 *
 * Method:
 * 1. Calculate distances between all well pairs
 * 2. Return average distance
 * 3. Track changes over time to detect stability/instability
 */
export function calculateGeometricStability(field: Φ): number {
  const wells = field.wells;

  if (wells.length < 2) {
    return 0; // Need at least 2 wells to measure stability
  }

  let totalDistance = 0;
  let pairCount = 0;

  // Calculate all pairwise distances
  for (let i = 0; i < wells.length; i++) {
    for (let j = i + 1; j < wells.length; j++) {
      totalDistance += distance(wells[i].position, wells[j].position);
      pairCount++;
    }
  }

  return pairCount > 0 ? totalDistance / pairCount : 0;
}

/**
 * Track stability changes over time
 */
export class StabilityTracker {
  private measurements: Array<{ timestamp: number; stability: number }> = [];
  private readonly windowSize: number;

  constructor(windowSize: number = 10) {
    this.windowSize = windowSize;
  }

  /**
   * Record a new stability measurement
   */
  record(stability: number): void {
    this.measurements.push({
      timestamp: Date.now(),
      stability,
    });

    // Keep only recent measurements
    if (this.measurements.length > this.windowSize) {
      this.measurements.shift();
    }
  }

  /**
   * Get stability change rate (variance)
   * Low variance → stable, harmonious
   * High variance → chaotic, unstable
   */
  getStabilityVariance(): number {
    if (this.measurements.length < 2) return 0;

    const values = this.measurements.map(m => m.stability);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;

    return variance;
  }

  /**
   * Get average stability over window
   */
  getAverageStability(): number {
    if (this.measurements.length === 0) return 0;
    return this.measurements.reduce((sum, m) => sum + m.stability, 0) / this.measurements.length;
  }

  /**
   * Get stability trend (increasing/decreasing)
   * Positive → becoming more stable
   * Negative → becoming less stable
   */
  getStabilityTrend(): number {
    if (this.measurements.length < 2) return 0;

    const first = this.measurements[0].stability;
    const last = this.measurements[this.measurements.length - 1].stability;

    return last - first;
  }

  clear(): void {
    this.measurements = [];
  }
}

/**
 * CompositionalEntropy - Measure of thought diversity and predictability
 *
 * Calculates Shannon entropy of composition frequency distribution.
 * High entropy → diverse, unpredictable thoughts (exploration)
 * Low entropy → focused, patterned thoughts (exploitation)
 *
 * Formula: H = -Σ(p_i × log2(p_i))
 * where p_i is the probability of composition i
 */
export function calculateCompositionalEntropy(compositionFrequency: Map<string, number>): number {
  if (compositionFrequency.size === 0) return 0;

  const total = Array.from(compositionFrequency.values()).reduce((a, b) => a + b, 0);
  if (total === 0) return 0;

  let entropy = 0;

  for (const count of compositionFrequency.values()) {
    const probability = count / total;
    if (probability > 0) {
      entropy -= probability * Math.log2(probability);
    }
  }

  return entropy;
}

/**
 * Track entropy changes over time
 */
export class EntropyTracker {
  private measurements: Array<{ timestamp: number; entropy: number }> = [];
  private readonly windowSize: number;

  constructor(windowSize: number = 10) {
    this.windowSize = windowSize;
  }

  /**
   * Record a new entropy measurement
   */
  record(entropy: number): void {
    this.measurements.push({
      timestamp: Date.now(),
      entropy,
    });

    // Keep only recent measurements
    if (this.measurements.length > this.windowSize) {
      this.measurements.shift();
    }
  }

  /**
   * Get average entropy over window
   */
  getAverageEntropy(): number {
    if (this.measurements.length === 0) return 0;
    return this.measurements.reduce((sum, m) => sum + m.entropy, 0) / this.measurements.length;
  }

  /**
   * Get entropy trend (increasing/decreasing)
   * Positive → becoming more diverse
   * Negative → becoming more focused
   */
  getEntropyTrend(): number {
    if (this.measurements.length < 2) return 0;

    const first = this.measurements[0].entropy;
    const last = this.measurements[this.measurements.length - 1].entropy;

    return last - first;
  }

  /**
   * Get entropy change rate
   */
  getEntropyVariance(): number {
    if (this.measurements.length < 2) return 0;

    const values = this.measurements.map(m => m.entropy);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;

    return variance;
  }

  clear(): void {
    this.measurements = [];
  }
}

/**
 * Combined metric for overall Field health
 */
export interface FieldHealthMetrics {
  // Geometric properties
  stability: number;
  stabilityVariance: number;
  stabilityTrend: number;

  // Thought properties
  entropy: number;
  entropyTrend: number;

  // Derived metrics
  harmony: number;      // High stability + low variance
  creativity: number;   // High entropy
  focus: number;        // Low entropy
}

/**
 * Calculate comprehensive Field health metrics
 */
export function calculateFieldHealth(
  field: Φ,
  compositionFreq: Map<string, number>,
  stabilityTracker: StabilityTracker,
  entropyTracker: EntropyTracker
): FieldHealthMetrics {
  const stability = calculateGeometricStability(field);
  const entropy = calculateCompositionalEntropy(compositionFreq);

  stabilityTracker.record(stability);
  entropyTracker.record(entropy);

  // Derived metrics
  const stabilityVariance = stabilityTracker.getStabilityVariance();
  const harmony = stability / (1 + stabilityVariance); // High stability, low variance
  const creativity = entropy; // High entropy = high creativity
  const focus = Math.max(0, 3 - entropy); // Low entropy = high focus (max entropy ≈ 3 for 8 morphisms)

  return {
    stability,
    stabilityVariance: stabilityVariance,
    stabilityTrend: stabilityTracker.getStabilityTrend(),
    entropy,
    entropyTrend: entropyTracker.getEntropyTrend(),
    harmony,
    creativity,
    focus,
  };
}
