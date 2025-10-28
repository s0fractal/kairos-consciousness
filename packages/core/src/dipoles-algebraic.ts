/**
 * @kairos/core - Dipoles as Algebras
 *
 * "Dipoles are not special operators. They are algebras in consciousness space."
 * — Theorem 46 (Cross-Domain)
 *
 * Refactored implementation using algebraic foundation.
 * Each dipole is now a DipoleAlgebra (CommutativeMonoid in most cases).
 */

import { ΛWave, Φ, FieldVector, DipoleApplication } from './types.js';
import {
  DipoleAlgebra,
  calculateMass,
  distanceToTruth,
  dipoleSuperposition,
  ε_Φ,
} from './algebra.js';

/**
 * Distance to Bridge singularity (0,0)
 */
function distanceToBridge(vector: FieldVector): number {
  return Math.sqrt(vector.gnosis ** 2 + vector.praxis ** 2);
}

/**
 * Record dipole application in wave trace
 */
function recordApplication(
  wave: ΛWave,
  dipoleName: string,
  vectorBefore: FieldVector,
  vectorAfter: FieldVector,
  massBefore: number,
  massAfter: number
): ΛWave {
  const application: DipoleApplication = {
    dipole: dipoleName as any,
    timestamp: Date.now(),
    vectorBefore,
    vectorAfter,
    massBefore,
    massAfter,
  };

  return {
    ...wave,
    trace: {
      ...wave.trace,
      dipoleApplications: [...wave.trace.dipoleApplications, application],
    },
  };
}

// ============================================================================
// DECONSTRUCTION DIPOLES (toward Bridge)
// ============================================================================

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
export const δ_decompose: DipoleAlgebra = {
  name: 'δ_decompose',

  fn: (wave: ΛWave, _field?: Φ): ΛWave => {
    const vectorBefore = wave.vector;
    const massBefore = wave.mass;

    // Core transformation: move 10% closer to origin
    const newVector: FieldVector = {
      gnosis: wave.vector.gnosis * 0.9,
      praxis: wave.vector.praxis * 0.9,
    };

    const newMass = calculateMass(newVector);
    const inBridge = distanceToBridge(newVector) < 0.1;

    let result: ΛWave = {
      ...wave,
      vector: newVector,
      mass: newMass,
      status: inBridge ? 'InBridge' : 'Deconstructing',
    };

    // Record application
    result = recordApplication(
      result,
      'δ_decompose',
      vectorBefore,
      newVector,
      massBefore,
      newMass
    );

    return result;
  },

  identity: ε_Φ.identity,

  properties: {
    associative: true,
    commutative: false, // Does not commute with δ_compose
    identity: ε_Φ.identity,
    idempotent: false,
    inverse: false,
  },

  class: 'Monoid',

  position: {
    praxis: -1, // Deconstruction quadrant
    gnosis: -1,
  },

  mass: calculateMass({ praxis: -1, gnosis: -1 }),

  quadrant: 'Deconstruction',

  generation: 0, // Base dipole
  useCount: 0,
  createdAt: 0, // Eternal base dipole
};

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
export const δ_forget: DipoleAlgebra = {
  name: 'δ_forget',

  fn: (wave: ΛWave, _field?: Φ): ΛWave => {
    const vectorBefore = wave.vector;
    const massBefore = wave.mass;

    // Core transformation: reduce mass
    const newMass = wave.mass * 0.95;

    let result: ΛWave = {
      ...wave,
      mass: newMass,
    };

    // Record application
    result = recordApplication(
      result,
      'δ_forget',
      vectorBefore,
      wave.vector, // Vector unchanged
      massBefore,
      newMass
    );

    return result;
  },

  identity: ε_Φ.identity,

  properties: {
    associative: true,
    commutative: true, // Commutes with other mass-only operations
    identity: ε_Φ.identity,
    idempotent: false,
    inverse: false,
  },

  class: 'CommutativeMonoid', // Note: Commutative!

  position: {
    praxis: -0.5, // Deconstruction (lighter)
    gnosis: -0.5,
  },

  mass: calculateMass({ praxis: -0.5, gnosis: -0.5 }),

  quadrant: 'Deconstruction',

  generation: 0,
  useCount: 0,
  createdAt: 0,
};

// ============================================================================
// SYNTHESIS DIPOLES (away from Bridge)
// ============================================================================

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
export const δ_compose: DipoleAlgebra = {
  name: 'δ_compose',

  fn: (wave: ΛWave, _field?: Φ): ΛWave => {
    const vectorBefore = wave.vector;
    const massBefore = wave.mass;

    // Core transformation: move away from origin toward x=y
    const distance = distanceToBridge(wave.vector);
    const newDistance = distance + 0.5;

    // Project onto line that moves toward x=y (Truth axis)
    const angle = Math.PI / 4; // 45° (x=y direction)

    const newVector: FieldVector = {
      gnosis: newDistance * Math.sin(angle),
      praxis: newDistance * Math.cos(angle),
    };

    const newMass = calculateMass(newVector);

    let result: ΛWave = {
      ...wave,
      vector: newVector,
      mass: newMass,
      status: 'Synthesizing',
    };

    // Record application
    result = recordApplication(
      result,
      'δ_compose',
      vectorBefore,
      newVector,
      massBefore,
      newMass
    );

    return result;
  },

  identity: ε_Φ.identity,

  properties: {
    associative: true,
    commutative: false, // Does not commute with δ_decompose
    identity: ε_Φ.identity,
    idempotent: false,
    inverse: false,
  },

  class: 'Monoid',

  position: {
    praxis: 1, // Synthesis quadrant
    gnosis: 1,
  },

  mass: calculateMass({ praxis: 1, gnosis: 1 }), // = 1 (on Truth axis!)

  quadrant: 'Synthesis',

  generation: 0,
  useCount: 0,
  createdAt: 0,
};

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
export const δ_memoize: DipoleAlgebra = {
  name: 'δ_memoize',

  fn: (wave: ΛWave, _field?: Φ): ΛWave => {
    const vectorBefore = wave.vector;
    const massBefore = wave.mass;

    // Core transformation: increase mass
    const newMass = Math.min(1, wave.mass * 1.1);

    let result: ΛWave = {
      ...wave,
      mass: newMass,
    };

    // Record application
    result = recordApplication(
      result,
      'δ_memoize',
      vectorBefore,
      wave.vector, // Vector unchanged
      massBefore,
      newMass
    );

    return result;
  },

  identity: ε_Φ.identity,

  properties: {
    associative: true,
    commutative: true, // Commutes with other mass-only operations
    identity: ε_Φ.identity,
    idempotent: false,
    inverse: false,
  },

  class: 'CommutativeMonoid', // Note: Commutative!

  position: {
    praxis: 0.5, // Synthesis (lighter)
    gnosis: 0.5,
  },

  mass: calculateMass({ praxis: 0.5, gnosis: 0.5 }),

  quadrant: 'Synthesis',

  generation: 0,
  useCount: 0,
  createdAt: 0,
};

// ============================================================================
// COMPOSED DIPOLES (via Theorem 44)
// ============================================================================

/**
 * Deconstruction Phase Algebra
 *
 * compose(δ_decompose, δ_forget)
 *
 * From Theorem 47: µ_HARVEST as algebra composition
 */
export const deconstructionPhase: DipoleAlgebra = dipoleSuperposition(
  δ_decompose,
  δ_forget
);

/**
 * Synthesis Phase Algebra
 *
 * compose(δ_compose, δ_memoize)
 *
 * From Theorem 47: µ_HARVEST as algebra composition
 */
export const synthesisPhase: DipoleAlgebra = dipoleSuperposition(
  δ_compose,
  δ_memoize
);

/**
 * Complete Lifecycle Algebra
 *
 * compose(deconstructionPhase, synthesisPhase)
 *
 * This IS µ_HARVEST (without finalization)
 *
 * From Theorem 47: µ_HARVEST = algebra composition
 */
export const lifecycleAlgebra: DipoleAlgebra = dipoleSuperposition(
  deconstructionPhase,
  synthesisPhase
);

// ============================================================================
// EXPORTS
// ============================================================================

export {
  ε_Φ, // Identity dipole
  dipoleSuperposition, // Superposition operator (⊕)
};

/**
 * All base dipoles
 */
export const baseDipoles = {
  δ_decompose,
  δ_forget,
  δ_compose,
  δ_memoize,
  ε_Φ,
} as const;

/**
 * Composed dipoles
 */
export const composedDipoles = {
  deconstructionPhase,
  synthesisPhase,
  lifecycleAlgebra,
} as const;

/**
 * All dipoles (base + composed)
 */
export const allDipoles = {
  ...baseDipoles,
  ...composedDipoles,
} as const;
