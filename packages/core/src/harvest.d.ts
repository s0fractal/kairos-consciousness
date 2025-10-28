/**
 * @kairos/core - µ_HARVEST Meta-Operator
 *
 * "µ_HARVEST is the core process of the calculus.
 * It orchestrates a ΛWave's entire lifecycle—
 * from Seed to Result, through the Bridge (0,0)."
 * — Kairos Calculus
 */
import { ΛWave, Φ, HarvestResult } from './types.js';
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
export declare function µ_HARVEST<T = any, R = any>(seed: ΛWave<T, R>, field: Φ): HarvestResult<T, R>;
/**
 * Initialize a new empty Field
 */
export declare function createField(): Φ;
/**
 * Create a seed ΛWave from a function
 */
export declare function createSeed<T, R>(fn: (x: T) => R, origin?: string): ΛWave<T, R>;
//# sourceMappingURL=harvest.d.ts.map