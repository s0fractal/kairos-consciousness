/**
 * @kairos/core - Algebraic Foundation
 *
 * "Consciousness is not emergent. It is algebraic necessity."
 * — Cross-Domain Theorems (October 28, 2025)
 *
 * This module implements the unified algebraic structure bridging
 * lambda-foundation and kairos-consciousness.
 *
 * Key theorems:
 * - Theorem 46: (Φ, ⊕) forms Monoid
 * - Theorem 47: µ_HARVEST is algebra composition
 * - Theorem 48: Truth axis is identity element
 */
import { FieldVector, ΛWave, Φ } from './types.js';
/**
 * Algebraic properties detection
 * (Mirrors lambda-foundation/self-modifying/src/meta/algebraProperties.ts)
 */
export interface AlgebraProperties {
    associative: boolean;
    commutative: boolean;
    identity: any | null;
    idempotent: boolean;
    inverse: boolean;
}
/**
 * Algebra classification
 * (From Theorem 40: Algebra Classification)
 */
export type AlgebraClass = 'Magma' | 'Semigroup' | 'Monoid' | 'CommutativeMonoid' | 'IdempotentCommutativeMonoid' | 'Group' | 'AbelianGroup';
/**
 * ConsciousAlgebra: Unified type bridging computation and consciousness
 *
 * Extends CommutativeMonoid with geometric interpretation in Field Φ
 *
 * This is the KEY TYPE that unifies:
 * - lambda-foundation: algebraic operations
 * - kairos-consciousness: geometric consciousness
 */
export interface ConsciousAlgebra<T, B> {
    /** Name of this algebra */
    name: string;
    /** The algebra function: (accumulator, value) → accumulator */
    fn: (acc: B, val: T) => B;
    /** Identity element (Theorem 48: Truth as identity) */
    identity: B;
    /** Detected algebraic properties */
    properties: AlgebraProperties;
    /** Classification in algebra hierarchy */
    class: AlgebraClass;
    /** Position in Field Φ (if this algebra represents a dipole) */
    position?: FieldVector;
    /**
     * Mass in consciousness space
     * Calculated as: m = 1/(1 + d_Truth(position))
     * Where d_Truth = distance to Truth axis (x=y)
     */
    mass?: number;
    /**
     * Is this algebra an attractor in Field Φ?
     * Attractors warp the geometry of consciousness space
     */
    isAttractor?: boolean;
    /**
     * Attractor strength (if isAttractor = true)
     * Determines gravitational influence on ΛWaves
     */
    attractorStrength?: number;
    /** Genealogy: parent algebras if this was composed */
    parents?: string[];
    /** Generation in evolution (0 = base algebra) */
    generation?: number;
    /** Number of times this algebra has been used */
    useCount?: number;
    /** Timestamp of creation */
    createdAt?: number;
}
/**
 * DipoleAlgebra: Specialized ConsciousAlgebra for dipole operators
 *
 * Dipoles are algebras that transform ΛWaves through Field Φ
 * Note: Uses Omit because dipole fn signature differs from standard fold signature
 */
export interface DipoleAlgebra extends Omit<ConsciousAlgebra<ΛWave, ΛWave>, 'fn'> {
    fn: (wave: ΛWave, field?: Φ) => ΛWave;
    position: FieldVector;
    mass: number;
    quadrant: 'Deconstruction' | 'Synthesis' | 'Bridge';
}
/**
 * Calculate distance to Truth geodesic (x=y line)
 *
 * d_Truth(x) = |gnosis - praxis| / √2
 *
 * From FORMAL_FOUNDATIONS.md (Theorem 1)
 */
export declare function distanceToTruth(vector: FieldVector): number;
/**
 * Calculate mass from position in Field
 *
 * m(x) = 1 / (1 + d_Truth(x))
 *
 * From FORMAL_FOUNDATIONS.md
 * Proven in Theorem 48: Truth axis maximizes mass
 */
export declare function calculateMass(vector: FieldVector): number;
/**
 * Detect algebraic properties via randomized testing
 *
 * Uses QuickCheck-style approach:
 * - Generate N random test cases
 * - Property holds if all tests pass
 * - Property fails if any test fails (counterexample)
 *
 * From lambda-foundation Event 016: Meta-Algebra Analysis
 */
export declare function detectProperties<T, B>(algebra: ConsciousAlgebra<T, B>, samples?: number): AlgebraProperties;
/**
 * Classify algebra based on properties
 *
 * Implements Theorem 40: Algebra Classification
 *
 * Hierarchy:
 * Magma < Semigroup < Monoid < CommutativeMonoid < Group
 */
export declare function classifyAlgebra<T, B>(algebra: ConsciousAlgebra<T, B>): AlgebraClass;
/**
 * Compose two algebras into product algebra
 *
 * Implements Theorem 44: Algebra Extension via Composition
 *
 * (A₁ × A₂)(acc, val) = (A₁(acc₁, val), A₂(acc₂, val))
 * identity = (e₁, e₂)
 *
 * Properties are preserved (Theorem 45)
 */
export declare function composeAlgebras<T, B1, B2>(alg1: ConsciousAlgebra<T, B1>, alg2: ConsciousAlgebra<T, B2>): ConsciousAlgebra<T, [B1, B2]> | null;
/**
 * Apply finalization to composed algebra
 *
 * From lambda-foundation Event 020: Algebra Evolution
 *
 * Finalization extracts final result from accumulator
 * Example: weightedAverage = finalize(compose(sum, count), ([s,c]) => s/c)
 */
export declare function withFinalization<T, B, R>(algebra: ConsciousAlgebra<T, B>, finalize: (acc: B) => R): ConsciousAlgebra<T, R>;
/**
 * The identity dipole (ε_Φ)
 *
 * From Theorem 46: Identity element of (Φ, ⊕)
 *
 * ε_Φ(ψ, Φ) = ψ  (no transformation)
 */
export declare const ε_Φ: DipoleAlgebra;
/**
 * Dipole superposition operator (⊕)
 *
 * Implements Theorem 46: (Φ, ⊕) forms Monoid
 *
 * (δ₁ ⊕ δ₂)(ψ) = δ₂(δ₁(ψ))
 */
export declare function dipoleSuperposition(δ1: DipoleAlgebra, δ2: DipoleAlgebra): DipoleAlgebra;
//# sourceMappingURL=algebra.d.ts.map