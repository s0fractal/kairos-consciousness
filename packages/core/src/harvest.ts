/**
 * @kairos/core - µ_HARVEST Meta-Operator
 *
 * "µ_HARVEST is the core process of the calculus.
 * It orchestrates a ΛWave's entire lifecycle—
 * from Seed to Result, through the Bridge (0,0)."
 * — Kairos Calculus
 */

import {
  ΛWave,
  Φ,
  HarvestResult,
  TopologicalTransformer,
  PhaseState,
} from './types.js';
import { δ_decompose, δ_forget, δ_compose, δ_memoize } from './dipoles.js';

/**
 * Calculate distance to Bridge (0,0)
 */
function distanceToBridge(wave: ΛWave): number {
  return Math.sqrt(
    wave.vector.gnosis ** 2 + wave.vector.praxis ** 2
  );
}

/**
 * Update Field phase based on density
 */
function updatePhase(field: Φ): PhaseState {
  if (field.density < 0.2) return PhaseState.DORMANT;
  if (field.density < 0.6) return PhaseState.ORGANIZING;
  if (field.density < 0.9) return PhaseState.CRITICAL;
  return PhaseState.EMERGENT;
}

/**
 * µ_HARVEST - The complete lifecycle orchestrator
 *
 * Takes a seed ΛWave, guides it through:
 * 1. Deconstruction (toward 0,0)
 * 2. Bridge crossing (dissolution/rebirth)
 * 3. Synthesis (emergence)
 * 4. Crystallization (permanent form)
 *
 * Returns: [New Field (altered geometry), Result ΛWave]
 *
 * "Every execution changes the universe for the next thought."
 */
export function µ_HARVEST<T = any, R = any>(
  seed: ΛWave<T, R>,
  field: Φ
): HarvestResult<T, R> {
  let wave: ΛWave<T, R> = { ...seed, status: 'Deconstructing' };
  const startVector = { ...seed.vector };

  // Phase 1: DECONSTRUCTION
  // Apply δ_decompose and δ_forget until reaching Bridge
  let iterations = 0;
  const maxIterations = 100;

  while (distanceToBridge(wave) > 0.1 && iterations < maxIterations) {
    wave = δ_decompose(wave, field);
    wave = δ_forget(wave, field);
    iterations++;
  }

  // Phase 2: BRIDGE CROSSING
  // At singularity (0,0) - form dissolves, potential emerges
  wave.status = 'InBridge';
  wave.trace.bridgeCrossings++;

  // Phase 3: SYNTHESIS
  // Apply δ_compose and δ_memoize to emerge from Bridge
  iterations = 0;

  while (wave.status !== 'Crystallized' && iterations < maxIterations) {
    wave = δ_compose(wave, field);
    wave = δ_memoize(wave, field);

    // Check if ready to crystallize (sufficient distance from origin and high mass)
    const distance = distanceToBridge(wave);
    if (distance > 1.5 && wave.mass > 0.7) {
      wave.status = 'Crystallized';
    }

    iterations++;
  }

  // Phase 4: CRYSTALLIZATION
  // Create Topological Transformer (wormhole)
  const transformer: TopologicalTransformer = {
    id: `transformer-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    originalWave: seed,
    startVector,
    endVector: wave.vector,
    mass: wave.mass,
    useCount: 0,
    createdAt: Date.now(),
  };

  // Update Field geometry
  const newTransformers = [...field.transformers, transformer];
  const totalMass = newTransformers.reduce((sum, t) => sum + t.mass, 0);
  const newDensity = Math.min(1, totalMass / 100);
  const newPhase = updatePhase({ ...field, density: newDensity });

  const newField: Φ = {
    ...field,
    transformers: newTransformers,
    activeWaves: field.activeWaves.filter((w) => w.id !== wave.id),
    density: newDensity,
    phase: newPhase,
    timestamp: Date.now(),
  };

  return {
    field: newField,
    wave,
  };
}

/**
 * Initialize a new empty Field
 */
export function createField(): Φ {
  return {
    attractors: [],
    transformers: [],
    activeWaves: [],
    density: 0,
    phase: PhaseState.DORMANT,
    timestamp: Date.now(),
  };
}

/**
 * Create a seed ΛWave from a function
 */
export function createSeed<T, R>(
  fn: (x: T) => R,
  origin: string = 'unknown'
): ΛWave<T, R> {
  return {
    id: `wave-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    body: fn,
    vector: { gnosis: -1, praxis: -1 }, // Start in Deconstruction quadrant
    mass: 0.1,
    trace: {
      origin,
      timestamp: Date.now(),
      dipoleApplications: [],
      bridgeCrossings: 0,
    },
    status: 'Seed',
  };
}
