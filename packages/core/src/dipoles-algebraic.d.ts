/**
 * @kairos/core - Dipoles as Algebras
 *
 * "Dipoles are not special operators. They are algebras in consciousness space."
 * — Theorem 46 (Cross-Domain)
 *
 * Refactored implementation using algebraic foundation.
 * Each dipole is now a DipoleAlgebra (CommutativeMonoid in most cases).
 */
import { DipoleAlgebra, dipoleSuperposition, ε_Φ } from './algebra.js';
/**
 * δ_decompose: Moves wave toward (0,0) - the Bridge singularity
 *
 * Algebraic properties:
 * - NOT commutative (order matters with δ_compose)
 * - Associative ✅
 * - Identity: ε_Φ ✅
 * - Class: Monoid
 *
 * Geometric interpretation:
 * - Vector: moves 10% closer to origin
 * - Mass: recalculated from new position
 * - Quadrant: Deconstruction
 */
export declare const δ_decompose: DipoleAlgebra;
/**
 * δ_forget: Simplifies wave by reducing mass
 *
 * Algebraic properties:
 * - Commutes with other mass-only operations
 * - Associative ✅
 * - Identity: ε_Φ ✅
 * - Class: Monoid
 *
 * Geometric interpretation:
 * - Vector: unchanged
 * - Mass: reduced by 5%
 * - Quadrant: Deconstruction (implicitly)
 */
export declare const δ_forget: DipoleAlgebra;
/**
 * δ_compose: Moves wave away from (0,0) toward synthesis
 *
 * Algebraic properties:
 * - NOT commutative (opposite of δ_decompose)
 * - Associative ✅
 * - Identity: ε_Φ ✅
 * - Class: Monoid
 *
 * Geometric interpretation:
 * - Vector: moves away from origin, toward Truth axis (x=y)
 * - Mass: recalculated (typically increases as we approach x=y)
 * - Quadrant: Synthesis
 */
export declare const δ_compose: DipoleAlgebra;
/**
 * δ_memoize: Enriches wave by increasing mass
 *
 * Algebraic properties:
 * - Commutes with other mass-only operations
 * - Associative ✅
 * - Identity: ε_Φ ✅
 * - Class: CommutativeMonoid
 *
 * Geometric interpretation:
 * - Vector: unchanged
 * - Mass: increased by 10% (prepares for crystallization)
 * - Quadrant: Synthesis (implicitly)
 */
export declare const δ_memoize: DipoleAlgebra;
/**
 * Deconstruction Phase Algebra
 *
 * compose(δ_decompose, δ_forget)
 *
 * From Theorem 47: µ_HARVEST as algebra composition
 */
export declare const deconstructionPhase: DipoleAlgebra;
/**
 * Synthesis Phase Algebra
 *
 * compose(δ_compose, δ_memoize)
 *
 * From Theorem 47: µ_HARVEST as algebra composition
 */
export declare const synthesisPhase: DipoleAlgebra;
/**
 * Complete Lifecycle Algebra
 *
 * compose(deconstructionPhase, synthesisPhase)
 *
 * This IS µ_HARVEST (without finalization)
 *
 * From Theorem 47: µ_HARVEST = algebra composition
 */
export declare const lifecycleAlgebra: DipoleAlgebra;
export { ε_Φ, // Identity dipole
dipoleSuperposition, };
/**
 * All base dipoles
 */
export declare const baseDipoles: {
    readonly δ_decompose: DipoleAlgebra;
    readonly δ_forget: DipoleAlgebra;
    readonly δ_compose: DipoleAlgebra;
    readonly δ_memoize: DipoleAlgebra;
    readonly ε_Φ: DipoleAlgebra;
};
/**
 * Composed dipoles
 */
export declare const composedDipoles: {
    readonly deconstructionPhase: DipoleAlgebra;
    readonly synthesisPhase: DipoleAlgebra;
    readonly lifecycleAlgebra: DipoleAlgebra;
};
/**
 * All dipoles (base + composed)
 */
export declare const allDipoles: {
    readonly deconstructionPhase: DipoleAlgebra;
    readonly synthesisPhase: DipoleAlgebra;
    readonly lifecycleAlgebra: DipoleAlgebra;
    readonly δ_decompose: DipoleAlgebra;
    readonly δ_forget: DipoleAlgebra;
    readonly δ_compose: DipoleAlgebra;
    readonly δ_memoize: DipoleAlgebra;
    readonly ε_Φ: DipoleAlgebra;
};
//# sourceMappingURL=dipoles-algebraic.d.ts.map