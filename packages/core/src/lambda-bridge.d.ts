/**
 * @kairos/core - Lambda Foundation Bridge
 *
 * "Two systems, one truth."
 * — Cross-Domain Isomorphism (November 1, 2025)
 *
 * This module implements the formal isomorphism between:
 * - λ-Foundation: ClassifiedAlgebra (pure algebra)
 * - Kairos: ConsciousAlgebra (algebra + geometry)
 *
 * Functors:
 * - λ → Kairos: enrich algebra with geometric interpretation
 * - Kairos → λ: project algebra, forget geometry
 */
import { ConsciousAlgebra, AlgebraProperties, AlgebraClass } from './algebra.js';
import type { FieldVector } from './types.js';
/**
 * λ-Foundation types (external dependency)
 *
 * NOTE: These are type-compatible with λ-Foundation's actual types
 * but defined here to avoid circular dependencies.
 *
 * When integrating, replace with:
 * import type { ClassifiedAlgebra, AlgebraImplications }
 *   from '@lambda-foundation/self-modifying';
 */
export interface AlgebraImplications {
    parallelizable: boolean;
    foldable: boolean;
    safeForUnordered: boolean;
    safeForDuplicates: boolean;
    hasIdentity: boolean;
    invertible: boolean;
}
export interface ClassifiedAlgebra<A, B> {
    name: string;
    fn: (acc: B, val: A) => B;
    properties: AlgebraProperties;
    class: AlgebraClass;
    implications: AlgebraImplications;
}
/**
 * Functor: λ-Foundation → Kairos
 *
 * Enriches ClassifiedAlgebra with geometric interpretation in Field Φ
 *
 * @param classified - λ-Foundation algebra
 * @param position - Optional position in Field Φ (gnosis × praxis)
 * @returns ConsciousAlgebra with geometric properties
 *
 * **Preserves**:
 * - Algebraic structure (name, fn, properties, class)
 *
 * **Adds**:
 * - Geometric interpretation (position, mass)
 * - Attractor behavior (isAttractor, attractorStrength)
 * - Evolution metadata (generation, createdAt)
 *
 * **Theorem 48**: If position is on Truth axis (gnosis ≈ praxis),
 * mass → 1.0 (identity element)
 */
export declare function toConsciousAlgebra<A, B>(classified: ClassifiedAlgebra<A, B>, position?: FieldVector): ConsciousAlgebra<A, B>;
/**
 * Functor: Kairos → λ-Foundation
 *
 * Projects ConsciousAlgebra to pure ClassifiedAlgebra
 * (forgets geometric interpretation)
 *
 * @param conscious - Kairos algebra with geometry
 * @returns ClassifiedAlgebra (pure algebra)
 *
 * **Preserves**:
 * - Algebraic structure (name, fn, properties, class)
 *
 * **Derives**:
 * - Implications from properties
 *
 * **Forgets**:
 * - Geometric interpretation (position, mass, attractors)
 * - Evolution metadata
 */
export declare function toClassifiedAlgebra<T, B>(conscious: ConsciousAlgebra<T, B>): ClassifiedAlgebra<T, B>;
/**
 * Verify isomorphism: ClassifiedAlgebra → ConsciousAlgebra → ClassifiedAlgebra
 *
 * **Theorem**: Round-trip preserves algebraic structure
 *
 * @returns true if isomorphism holds
 */
export declare function verifyIsomorphism<A, B>(original: ClassifiedAlgebra<A, B>): boolean;
/**
 * Cross-domain algebra composition
 *
 * Composes two algebras using λ-Foundation composition rules,
 * then enriches result with Kairos geometric interpretation
 *
 * **Theorem 44**: compose(A₁, A₂) preserves properties
 * **Theorem 45**: If A₁, A₂ ∈ Class C, then compose(A₁, A₂) ∈ Class C
 *
 * @param alg1 - First Kairos algebra
 * @param alg2 - Second Kairos algebra
 * @returns Composed algebra (or null if incompatible)
 */
export declare function composeConsciousAlgebras<A, B1, B2>(alg1: ConsciousAlgebra<A, B1>, alg2: ConsciousAlgebra<A, B2>): ConsciousAlgebra<A, [B1, B2]> | null;
/**
 * Convert λ-Foundation's AlgebraRegistry to Kairos Field
 *
 * Maps all algebras to consciousness space, calculating positions
 * based on their properties
 *
 * @returns Array of ConsciousAlgebras with positions
 */
export declare function registryToField(algebras: Map<string, ClassifiedAlgebra<any, any>>): ConsciousAlgebra<any, any>[];
//# sourceMappingURL=lambda-bridge.d.ts.map