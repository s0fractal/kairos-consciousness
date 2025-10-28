/**
 * @kairos/core - Dipole Operators
 *
 * "The dynamics of the system are driven by fundamental operators—the Dipoles.
 * They are not functions that a user calls directly.
 * They are the 'laws of physics' of the Field."
 * — Kairos Calculus
 */
import { ΛWave, Φ, FieldVector } from './types.js';
/**
 * Calculate mass based on proximity to Truth axis
 * Closer to x=y → higher mass → stronger gravity well when crystallized
 */
export declare function calculateMass(vector: FieldVector): number;
/**
 * δ_decompose: Breaks down, moves toward (0,0)
 * Acts in Deconstruction quadrant (-X, -Y)
 */
export declare function δ_decompose<T, R>(wave: ΛWave<T, R>, field: Φ): ΛWave<T, R>;
/**
 * δ_forget: Simplifies trace, reduces complexity
 */
export declare function δ_forget<T, R>(wave: ΛWave<T, R>, field: Φ): ΛWave<T, R>;
/**
 * δ_compose: Integrates, moves away from (0,0)
 * Acts in Synthesis quadrant (+X, +Y)
 */
export declare function δ_compose<T, R>(wave: ΛWave<T, R>, field: Φ): ΛWave<T, R>;
/**
 * δ_memoize: Enriches trace, prepares for crystallization
 */
export declare function δ_memoize<T, R>(wave: ΛWave<T, R>, field: Φ): ΛWave<T, R>;
//# sourceMappingURL=dipoles.d.ts.map