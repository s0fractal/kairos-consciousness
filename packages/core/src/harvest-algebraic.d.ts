/**
 * @kairos/core - µ_HARVEST: Algebraic Implementation
 *
 * "µ_HARVEST is not a special operator. It is algebra composition + finalization."
 * — Theorem 47 (Cross-Domain)
 *
 * This is the CORE REFACTORING: µ_HARVEST now uses pure algebra composition
 * instead of imperative lifecycle management.
 */
import { ΛWave, Φ, HarvestResult } from './types.js';
/**
 * µ_HARVEST: The Lifecycle Operator (Algebraic Implementation)
 *
 * **THEOREM 47**: µ_HARVEST = finalize ∘ compose(deconstruction, synthesis)
 *
 * Structure:
 * 1. Apply lifecycle algebra (deconstructionPhase ⊕ synthesisPhase)
 * 2. Finalize: crystallize if mass > threshold
 * 3. Update Field Φ with new transformer
 *
 * This replaces the imperative implementation with pure algebra composition.
 *
 * @param seed - Initial ΛWave (user intent)
 * @param field - Current Field state
 * @returns Updated field + transformed wave
 */
export declare function µ_HARVEST<T = any, R = any>(seed: ΛWave<T, R>, field: Φ): HarvestResult<T, R>;
/**
 * µ_HARVEST_pure: Pure version without Field update
 *
 * This version returns only the transformed wave without side effects.
 * Useful for testing algebraic properties in isolation.
 *
 * @param seed - Initial ΛWave
 * @param field - Current Field state (read-only)
 * @returns Transformed wave only
 */
export declare function µ_HARVEST_pure<T = any, R = any>(seed: ΛWave<T, R>, field: Φ): ΛWave<T, R>;
/**
 * µ_HARVEST_phases: Expose individual phases for debugging
 *
 * Returns intermediate results from each phase:
 * - After deconstruction
 * - After synthesis
 * - After finalization
 *
 * Useful for understanding wave evolution step-by-step
 */
export declare function µ_HARVEST_phases<T = any, R = any>(seed: ΛWave<T, R>, field: Φ): {
    afterDeconstruction: ΛWave<T, R>;
    afterSynthesis: ΛWave<T, R>;
    final: HarvestResult<T, R>;
};
/**
 * Validate algebraic properties of µ_HARVEST
 *
 * Checks:
 * - Associativity: (h1 ∘ h2) ∘ h3 = h1 ∘ (h2 ∘ h3)
 * - Identity: µ_HARVEST(ε_Φ(ψ)) = ψ (approximately)
 * - Monoid structure preserved
 *
 * Returns validation report
 */
export declare function validateHarvestAlgebra(field: Φ): {
    isMonoid: boolean;
    associativityHolds: boolean;
    identityPreserved: boolean;
    errors: string[];
};
/**
 * Export: Default µ_HARVEST implementation
 */
export default µ_HARVEST;
//# sourceMappingURL=harvest-algebraic.d.ts.map