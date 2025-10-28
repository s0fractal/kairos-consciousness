/**
 * @kairos/core - Fixpoint Analysis (Theorem 50)
 *
 * "Consciousness crystallizes not because it crosses a threshold,
 * but because it becomes its own foundation — a fixpoint."
 * — Theorem 50
 *
 * This module implements fixpoint detection and validation for morphisms.
 */

import { ΛWave, Φ, TopologicalTransformer } from './types.js';
import { µ_HARVEST } from './harvest-algebraic.js';
import { composeAlgebras, ConsciousAlgebra } from './algebra.js';

/**
 * Crystallization threshold (from empirical observation)
 */
export const CRYSTALLIZATION_THRESHOLD = 0.7;

/**
 * Fixpoint equivalence tolerance
 * Larger epsilon accounts for numerical precision and dipole variation
 */
export const FIXPOINT_EPSILON = 0.15;

/**
 * Check if a wave is a fixpoint of µ_HARVEST
 *
 * A wave M is a fixpoint if: µ_HARVEST(M, Φ) ≈ M
 *
 * @param wave - The wave to test
 * @param field - The field context
 * @param epsilon - Tolerance for equivalence (default 0.05)
 */
export function isFixpoint(wave: ΛWave, field: Φ, epsilon: number = FIXPOINT_EPSILON): boolean {
  // Apply µ_HARVEST
  const result = µ_HARVEST(wave, field);
  const transformedWave = result.wave;

  // Calculate fixpoint distance
  const delta = fixpointDistance(wave, transformedWave);

  return delta < epsilon;
}

/**
 * Calculate distance to fixpoint
 *
 * Measures how much a wave changes under µ_HARVEST
 *
 * @param wave1 - Original wave
 * @param wave2 - Transformed wave (result of µ_HARVEST)
 */
export function fixpointDistance(wave1: ΛWave, wave2: ΛWave): number {
  // Mass distance
  const massDelta = Math.abs(wave1.mass - wave2.mass);

  // Position distance
  const dx = wave1.vector.praxis - wave2.vector.praxis;
  const dy = wave1.vector.gnosis - wave2.vector.gnosis;
  const positionDelta = Math.sqrt(dx * dx + dy * dy);

  // Combined metric (weighted average)
  const MASS_WEIGHT = 0.7;
  const POSITION_WEIGHT = 0.3;

  return MASS_WEIGHT * massDelta + POSITION_WEIGHT * positionDelta;
}

/**
 * Test if crystallized morphisms are fixpoints
 *
 * Theorem 50 claims: mass ≥ 0.7 ⟺ fixpoint
 *
 * @param field - Field containing transformers
 */
export function validateCrystallizationFixpointEquivalence(field: Φ): {
  totalTransformers: number;
  crystallized: number;
  fixpoints: number;
  equivalenceRatio: number;
  counterexamples: Array<{ wave: ΛWave; crystallized: boolean; fixpoint: boolean }>;
} {
  const transformers = field.transformers;
  const counterexamples: Array<{ wave: ΛWave; crystallized: boolean; fixpoint: boolean }> = [];

  let crystallizedCount = 0;
  let fixpointCount = 0;
  let equivalentCount = 0;

  for (const transformer of transformers) {
    const wave = transformer.originalWave;
    const isCrystallized = wave.mass >= CRYSTALLIZATION_THRESHOLD;
    const isWaveFixpoint = isFixpoint(wave, field);

    if (isCrystallized) crystallizedCount++;
    if (isWaveFixpoint) fixpointCount++;

    // Check equivalence: crystallized ⟺ fixpoint
    if (isCrystallized === isWaveFixpoint) {
      equivalentCount++;
    } else {
      // Counterexample!
      counterexamples.push({
        wave,
        crystallized: isCrystallized,
        fixpoint: isWaveFixpoint,
      });
    }
  }

  return {
    totalTransformers: transformers.length,
    crystallized: crystallizedCount,
    fixpoints: fixpointCount,
    equivalenceRatio: transformers.length > 0 ? equivalentCount / transformers.length : 0,
    counterexamples,
  };
}

/**
 * Converge a wave to fixpoint through iteration
 *
 * Repeatedly apply µ_HARVEST until fixpoint is reached
 *
 * @param seed - Initial wave
 * @param field - Field context
 * @param maxIterations - Maximum iterations (default 10)
 */
export function convergeToFixpoint(
  seed: ΛWave,
  field: Φ,
  maxIterations: number = 10
): {
  finalWave: ΛWave;
  finalField: Φ;
  iterations: number;
  converged: boolean;
  history: Array<{ wave: ΛWave; mass: number; delta: number }>;
} {
  let wave = seed;
  let currentField = field;
  const history: Array<{ wave: ΛWave; mass: number; delta: number }> = [];

  history.push({
    wave,
    mass: wave.mass,
    delta: Infinity,
  });

  for (let i = 0; i < maxIterations; i++) {
    // Apply µ_HARVEST
    const result = µ_HARVEST(wave, currentField);
    const nextWave = result.wave;
    currentField = result.field;

    // Calculate fixpoint distance
    const delta = fixpointDistance(wave, nextWave);

    history.push({
      wave: nextWave,
      mass: nextWave.mass,
      delta,
    });

    // Check convergence
    if (delta < FIXPOINT_EPSILON) {
      return {
        finalWave: nextWave,
        finalField: currentField,
        iterations: i + 1,
        converged: true,
        history,
      };
    }

    wave = nextWave;
  }

  // Did not converge
  return {
    finalWave: wave,
    finalField: currentField,
    iterations: maxIterations,
    converged: false,
    history,
  };
}

/**
 * Analyze fixpoint properties of Field
 *
 * @param field - Field to analyze
 */
export function analyzeFixpoints(field: Φ): {
  totalTransformers: number;
  crystallized: number;
  fixpoints: number;
  fixpointRatio: number;
  averageCrystallizedMass: number;
  averageFixpointMass: number;
  averageFixpointDistance: number;
} {
  const transformers = field.transformers;

  if (transformers.length === 0) {
    return {
      totalTransformers: 0,
      crystallized: 0,
      fixpoints: 0,
      fixpointRatio: 0,
      averageCrystallizedMass: 0,
      averageFixpointMass: 0,
      averageFixpointDistance: 0,
    };
  }

  const crystallized = transformers.filter(t => t.originalWave.mass >= CRYSTALLIZATION_THRESHOLD);
  const fixpoints = transformers.filter(t => isFixpoint(t.originalWave, field));

  const crystallizedMasses = crystallized.map(t => t.originalWave.mass);
  const fixpointMasses = fixpoints.map(t => t.originalWave.mass);

  const fixpointDistances = transformers.map(t => {
    const result = µ_HARVEST(t.originalWave, field);
    return fixpointDistance(t.originalWave, result.wave);
  });

  return {
    totalTransformers: transformers.length,
    crystallized: crystallized.length,
    fixpoints: fixpoints.length,
    fixpointRatio: fixpoints.length / transformers.length,
    averageCrystallizedMass: average(crystallizedMasses),
    averageFixpointMass: average(fixpointMasses),
    averageFixpointDistance: average(fixpointDistances),
  };
}

/**
 * Test correlation between mass and fixpoint distance
 *
 * Theorem 50 predicts: mass ≥ 0.7 ⟺ δ_fix < ε
 *
 * @param field - Field to analyze
 */
export function testMassFixpointCorrelation(field: Φ): {
  correlation: number;
  dataPoints: Array<{ mass: number; fixpointDistance: number }>;
} {
  const transformers = field.transformers;
  const dataPoints: Array<{ mass: number; fixpointDistance: number }> = [];

  for (const transformer of transformers) {
    const wave = transformer.originalWave;
    const result = µ_HARVEST(wave, field);
    const delta = fixpointDistance(wave, result.wave);

    dataPoints.push({
      mass: wave.mass,
      fixpointDistance: delta,
    });
  }

  // Calculate Pearson correlation
  const correlation = pearsonCorrelation(
    dataPoints.map(p => p.mass),
    dataPoints.map(p => p.fixpointDistance)
  );

  return {
    correlation,
    dataPoints,
  };
}

/**
 * Calculate average
 */
function average(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return numbers.reduce((sum, n) => sum + n, 0) / numbers.length;
}

/**
 * Calculate Pearson correlation coefficient
 */
function pearsonCorrelation(x: number[], y: number[]): number {
  if (x.length !== y.length || x.length === 0) return 0;

  const n = x.length;
  const meanX = average(x);
  const meanY = average(y);

  let numerator = 0;
  let denominatorX = 0;
  let denominatorY = 0;

  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;

    numerator += dx * dy;
    denominatorX += dx * dx;
    denominatorY += dy * dy;
  }

  const denominator = Math.sqrt(denominatorX * denominatorY);

  if (denominator === 0) return 0;

  return numerator / denominator;
}

/**
 * Check idempotence of crystallized morphisms
 *
 * If M is crystallized, then compose(M, M) should ≈ M
 *
 * @param wave - Wave to test
 * @param field - Field context
 */
export function testIdempotence(wave: ΛWave, field: Φ): {
  isIdempotent: boolean;
  originalMass: number;
  afterComposition: number;
  delta: number;
} {
  // Apply µ_HARVEST twice
  const result1 = µ_HARVEST(wave, field);
  const wave1 = result1.wave;
  const field1 = result1.field;

  const result2 = µ_HARVEST(wave1, field1);
  const wave2 = result2.wave;

  const delta = fixpointDistance(wave1, wave2);

  return {
    isIdempotent: delta < FIXPOINT_EPSILON,
    originalMass: wave.mass,
    afterComposition: wave2.mass,
    delta,
  };
}

/**
 * Find all fixpoints in Field
 *
 * @param field - Field to analyze
 */
export function findFixpoints(field: Φ): ΛWave[] {
  return field.transformers
    .map(t => t.originalWave)
    .filter(wave => isFixpoint(wave, field));
}

/**
 * Calculate least fixpoint mass
 *
 * Finds the minimum mass among all fixpoints
 *
 * @param field - Field to analyze
 */
export function leastFixpointMass(field: Φ): number | null {
  const fixpoints = findFixpoints(field);

  if (fixpoints.length === 0) return null;

  return Math.min(...fixpoints.map(wave => wave.mass));
}
