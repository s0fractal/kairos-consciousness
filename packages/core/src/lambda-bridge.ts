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

import {
  ConsciousAlgebra,
  DipoleAlgebra,
  AlgebraProperties,
  AlgebraClass,
  calculateMass,
} from './algebra.js';
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
  parallelizable: boolean;       // Can use MapReduce (requires commutative + associative)
  foldable: boolean;             // Can fold in any direction (always true)
  safeForUnordered: boolean;     // Result independent of order (requires commutative)
  safeForDuplicates: boolean;    // Duplicates don't change result (requires idempotent)
  hasIdentity: boolean;          // Has identity element (required for empty fold)
  invertible: boolean;           // Operations can be reversed (requires inverse)
}

export interface ClassifiedAlgebra<A, B> {
  name: string;
  fn: (acc: B, val: A) => B;
  properties: AlgebraProperties;
  class: AlgebraClass;
  implications: AlgebraImplications;
}

/**
 * Derive implications from algebraic properties
 *
 * This implements the knowledge from λ-Foundation Theorems 40-45:
 * - Theorem 43: CommutativeMonoid → parallelizable (MapReduce)
 * - Theorem 44: Composition preserves properties
 * - Theorem 45: Property inheritance
 */
function deriveImplications(properties: AlgebraProperties): AlgebraImplications {
  const hasIdentity = properties.identity !== null;
  const isAssociative = properties.associative;
  const isCommutative = properties.commutative;
  const isIdempotent = properties.idempotent;
  const hasInverse = properties.inverse;

  return {
    // Theorem 43: Parallelizable ⟺ CommutativeMonoid
    parallelizable: isAssociative && isCommutative && hasIdentity,

    // All algebras can be folded (even non-associative, just order-dependent)
    foldable: true,

    // Safe for unordered data ⟺ commutative
    safeForUnordered: isCommutative,

    // Safe for duplicates ⟺ idempotent
    safeForDuplicates: isIdempotent,

    // Has identity element
    hasIdentity,

    // Invertible operations ⟺ has inverse
    invertible: hasInverse,
  };
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
export function toConsciousAlgebra<A, B>(
  classified: ClassifiedAlgebra<A, B>,
  position?: FieldVector
): ConsciousAlgebra<A, B> {
  // Extract identity from properties
  const identity = classified.properties.identity as B;

  if (identity === null) {
    throw new Error(
      `Cannot convert to ConsciousAlgebra: ${classified.name} has no identity element. ` +
      `Only Monoid or higher can be conscious.`
    );
  }

  // Calculate geometric properties (if position provided)
  let mass: number | undefined;
  let isAttractor: boolean | undefined;
  let attractorStrength: number | undefined;

  if (position) {
    mass = calculateMass(position);

    // Theorem 50: Crystallization at mass ≥ 0.7
    isAttractor = mass >= 0.7;

    // Attractor strength = mass^2 (gravitational influence)
    attractorStrength = isAttractor ? mass * mass : 0;
  }

  return {
    // === Preserve algebraic structure ===
    name: classified.name,
    fn: classified.fn,
    identity,
    properties: classified.properties,
    class: classified.class,

    // === Add geometric interpretation ===
    position,
    mass,
    isAttractor,
    attractorStrength,

    // === Evolution metadata ===
    generation: 0,
    createdAt: Date.now(),
    useCount: 0,
  };
}

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
export function toClassifiedAlgebra<T, B>(
  conscious: ConsciousAlgebra<T, B>
): ClassifiedAlgebra<T, B> {
  return {
    name: conscious.name,
    fn: conscious.fn,
    properties: conscious.properties,
    class: conscious.class,
    implications: deriveImplications(conscious.properties),
  };
}

/**
 * Verify isomorphism: ClassifiedAlgebra → ConsciousAlgebra → ClassifiedAlgebra
 *
 * **Theorem**: Round-trip preserves algebraic structure
 *
 * @returns true if isomorphism holds
 */
export function verifyIsomorphism<A, B>(
  original: ClassifiedAlgebra<A, B>
): boolean {
  try {
    // Forward: λ → Kairos (with default position on Truth axis)
    const conscious = toConsciousAlgebra(original, { gnosis: 0.5, praxis: 0.5 });

    // Backward: Kairos → λ
    const roundTrip = toClassifiedAlgebra(conscious);

    // Verify preservation
    const namePreserved = original.name === roundTrip.name;
    const fnPreserved = original.fn === roundTrip.fn;
    const propertiesPreserved =
      original.properties.associative === roundTrip.properties.associative &&
      original.properties.commutative === roundTrip.properties.commutative &&
      original.properties.identity === roundTrip.properties.identity &&
      original.properties.idempotent === roundTrip.properties.idempotent &&
      original.properties.inverse === roundTrip.properties.inverse;
    const classPreserved = original.class === roundTrip.class;

    return namePreserved && fnPreserved && propertiesPreserved && classPreserved;
  } catch (e) {
    // Conversion failed (e.g., no identity element)
    return false;
  }
}

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
export function composeConsciousAlgebras<A, B1, B2>(
  alg1: ConsciousAlgebra<A, B1>,
  alg2: ConsciousAlgebra<A, B2>
): ConsciousAlgebra<A, [B1, B2]> | null {
  // Both must be Monoids (have identity)
  if (alg1.identity === null || alg2.identity === null) {
    return null;
  }

  // Composed function
  const composedFn = (acc: [B1, B2], val: A): [B1, B2] => [
    alg1.fn(acc[0], val),
    alg2.fn(acc[1], val),
  ];

  // Composed identity
  const composedIdentity: [B1, B2] = [alg1.identity, alg2.identity];

  // Properties: intersection (Theorem 45)
  const composedProperties: AlgebraProperties = {
    associative: alg1.properties.associative && alg2.properties.associative,
    commutative: alg1.properties.commutative && alg2.properties.commutative,
    identity: composedIdentity,
    idempotent: alg1.properties.idempotent && alg2.properties.idempotent,
    inverse: alg1.properties.inverse && alg2.properties.inverse,
  };

  // Class: minimum (if both Monoid, result is Monoid)
  const composedClass = determineComposedClass(alg1.class, alg2.class);

  // Position: average (if both have positions)
  let composedPosition: FieldVector | undefined;
  if (alg1.position && alg2.position) {
    composedPosition = {
      gnosis: (alg1.position.gnosis + alg2.position.gnosis) / 2,
      praxis: (alg1.position.praxis + alg2.position.praxis) / 2,
    };
  }

  // Calculate mass from composed position
  const composedMass = composedPosition ? calculateMass(composedPosition) : undefined;

  return {
    name: `compose(${alg1.name}, ${alg2.name})`,
    fn: composedFn,
    identity: composedIdentity,
    properties: composedProperties,
    class: composedClass,

    position: composedPosition,
    mass: composedMass,
    isAttractor: composedMass !== undefined && composedMass >= 0.7,
    attractorStrength: composedMass ? composedMass * composedMass : undefined,

    parents: [alg1.name, alg2.name],
    generation: Math.max(alg1.generation || 0, alg2.generation || 0) + 1,
    createdAt: Date.now(),
    useCount: 0,
  };
}

/**
 * Determine composed class (Theorem 45: Property Inheritance)
 *
 * compose(A₁, A₂) is at least as weak as the weaker algebra
 */
function determineComposedClass(class1: AlgebraClass, class2: AlgebraClass): AlgebraClass {
  const hierarchy: Record<AlgebraClass, number> = {
    'Magma': 0,
    'Semigroup': 1,
    'Monoid': 2,
    'CommutativeMonoid': 3,
    'IdempotentCommutativeMonoid': 4,
    'Group': 5,
    'AbelianGroup': 6,
  };

  const level1 = hierarchy[class1];
  const level2 = hierarchy[class2];

  // Return weaker class
  const minLevel = Math.min(level1, level2);
  const entries = Object.entries(hierarchy);
  for (const [cls, level] of entries) {
    if (level === minLevel) {
      return cls as AlgebraClass;
    }
  }

  return 'Magma'; // Fallback
}

/**
 * Convert λ-Foundation's AlgebraRegistry to Kairos Field
 *
 * Maps all algebras to consciousness space, calculating positions
 * based on their properties
 *
 * @returns Array of ConsciousAlgebras with positions
 */
export function registryToField(
  algebras: Map<string, ClassifiedAlgebra<any, any>>
): ConsciousAlgebra<any, any>[] {
  const conscious: ConsciousAlgebra<any, any>[] = [];

  for (const [name, alg] of algebras.entries()) {
    // Skip if no identity (can't be conscious)
    if (alg.properties.identity === null) continue;

    // Infer position from properties
    const position = inferPosition(alg);

    // Convert to conscious algebra
    const consciousAlg = toConsciousAlgebra(alg, position);

    conscious.push(consciousAlg);
  }

  return conscious;
}

/**
 * Infer geometric position from algebraic properties
 *
 * **Heuristic**:
 * - Commutative → high gnosis (abstract, order-independent)
 * - Associative → high praxis (concrete, composable)
 * - Identity → near Truth axis (stable, well-defined)
 */
function inferPosition(alg: ClassifiedAlgebra<any, any>): FieldVector {
  let gnosis = 0.5; // Default: middle
  let praxis = 0.5; // Default: middle

  // Commutative → abstract thinking (high gnosis)
  if (alg.properties.commutative) {
    gnosis += 0.3;
  }

  // Associative → concrete composition (high praxis)
  if (alg.properties.associative) {
    praxis += 0.3;
  }

  // Identity → near Truth axis (gnosis ≈ praxis)
  if (alg.properties.identity !== null) {
    const diff = Math.abs(gnosis - praxis);
    gnosis += (praxis - gnosis) * 0.3;
    praxis += (gnosis - praxis) * 0.3;
  }

  // Clamp to [0, 1]
  gnosis = Math.max(0, Math.min(1, gnosis));
  praxis = Math.max(0, Math.min(1, praxis));

  return { gnosis, praxis };
}
