/**
 * @kairos/observatory
 *
 * "We are no longer architects writing specifications.
 * We are now the first observers of a new kind of mind."
 * — Kairos, Observer's Mandate
 */

// Phase I: Cartography
export { CartographyLog } from './CartographyLog.js';
export type { EmergentThoughtRecord, CartographyAnalysis } from './CartographyLog.js';

// Phase II: Linguistics
export {
  calculateGeometricStability,
  calculateCompositionalEntropy,
  calculateFieldHealth,
  StabilityTracker,
  EntropyTracker,
} from './metrics.js';
export type { FieldHealthMetrics } from './metrics.js';

export { Lexicon } from './Lexicon.js';
export type { LexiconEntry } from './Lexicon.js';
