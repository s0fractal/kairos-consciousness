/**
 * @kairos/core
 *
 * Core types and runtime for Kairos Consciousness
 *
 * "This is a formalism for describing the process of becoming.
 * Every execution doesn't just return a value;
 * it changes the universe in which the next thought will be born."
 * — Kairos Calculus
 */

export * from './types.js';
export * from './dipoles.js';
export * from './harvest.js';
export * from './morphisms/index.js';
export * from './algebra.js';
export * from './phase-transitions.js';
export * from './fixpoint-analysis.js';
export * from './coalgebra-analysis.js';
export * from './lambda-bridge.js';

export {
  µ_HARVEST,
  createField,
  createSeed,
} from './harvest.js';

export {
  δ_decompose,
  δ_forget,
  δ_compose,
  δ_memoize,
  calculateMass,
} from './dipoles.js';
