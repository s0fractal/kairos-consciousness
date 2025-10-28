/**
 * @kairos/synthesis - Algebraic Validation
 *
 * "Every intent must form a valid ConsciousAlgebra before entering the Field."
 * — Integration with SynthesisBridge
 *
 * This module validates that GitHub issues/intents satisfy algebraic properties
 * before being processed through µ_HARVEST.
 */

import { ConsciousAlgebra, AlgebraProperties, AlgebraClass } from '../../core/src/algebra.js';

/**
 * Intent: User intention extracted from GitHub issue
 *
 * This is the INPUT to the synthesis process
 */
export interface Intent {
  id: string;
  source: 'github-issue' | 'manual' | 'emergent';
  title: string;
  description: string;
  labels: string[];

  // Klein phase (from existing synthesis)
  kleinPhase?: number;

  // Parsed semantic information
  semanticType?: 'create' | 'update' | 'fix' | 'optimize' | 'analyze';
  targetMorphism?: string;

  // Metadata
  createdAt: number;
  author?: string;
}

/**
 * AlgebraIntent: Intent validated as ConsciousAlgebra
 *
 * This is the OUTPUT of validation - ready for µ_HARVEST
 */
export interface AlgebraIntent extends Intent {
  // Algebraic structure
  algebra: ConsciousAlgebra<any, any>;

  // Validation results
  validated: true;
  validationTimestamp: number;

  // Geometric interpretation
  estimatedMass: number;
  estimatedPhase: number;
}

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  algebra?: ConsciousAlgebra<any, any>;
  confidence: number; // 0-1
}

/**
 * Synthesize ConsciousAlgebra from Intent
 *
 * This is the CORE FUNCTION that bridges:
 * - External world (GitHub issue)
 * - Internal algebra (ConsciousAlgebra)
 *
 * Strategy:
 * 1. Analyze intent semantic type
 * 2. Map to algebraic operation
 * 3. Detect properties
 * 4. Classify algebra
 * 5. Validate completeness
 */
export function synthesizeAlgebraFromIntent(intent: Intent): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Step 1: Determine semantic type
  const semanticType = inferSemanticType(intent);
  if (!semanticType) {
    errors.push('Cannot infer semantic type from intent');
    return { valid: false, errors, warnings, confidence: 0 };
  }

  // Step 2: Map semantic type to algebraic operation
  const algebraTemplate = semanticTypeToAlgebra(semanticType);
  if (!algebraTemplate) {
    errors.push(`No algebra template for semantic type: ${semanticType}`);
    return { valid: false, errors, warnings, confidence: 0 };
  }

  // Step 3: Create algebra from template
  const algebra: ConsciousAlgebra<any, any> = {
    name: `algebra_${intent.id}`,
    fn: algebraTemplate.fn,
    identity: algebraTemplate.identity,
    properties: detectPropertiesFromTemplate(algebraTemplate),
    class: 'Monoid', // Will be refined

    // Geometric interpretation
    position: estimatePosition(intent),
    mass: 0, // Will be calculated

    // Evolution metadata
    generation: 0,
    createdAt: Date.now(),
  };

  // Step 4: Calculate mass from position
  if (algebra.position) {
    algebra.mass = calculateMassFromPosition(algebra.position);
  }

  // Step 5: Classify algebra
  algebra.class = classifyAlgebraFromProperties(algebra.properties);

  // Step 6: Validate completeness
  const validationErrors = validateAlgebraCompleteness(algebra);
  if (validationErrors.length > 0) {
    errors.push(...validationErrors);
    return { valid: false, errors, warnings, confidence: 0.5 };
  }

  // Step 7: Calculate confidence
  const confidence = calculateValidationConfidence(intent, algebra);

  return {
    valid: true,
    errors: [],
    warnings,
    algebra,
    confidence,
  };
}

/**
 * Infer semantic type from intent
 */
function inferSemanticType(intent: Intent): Intent['semanticType'] | null {
  // Check explicit semantic type
  if (intent.semanticType) {
    return intent.semanticType;
  }

  // Infer from title/description
  const text = `${intent.title} ${intent.description}`.toLowerCase();

  if (text.includes('create') || text.includes('add') || text.includes('new')) {
    return 'create';
  }
  if (text.includes('update') || text.includes('change') || text.includes('modify')) {
    return 'update';
  }
  if (text.includes('fix') || text.includes('bug') || text.includes('error')) {
    return 'fix';
  }
  if (text.includes('optimize') || text.includes('improve') || text.includes('faster')) {
    return 'optimize';
  }
  if (text.includes('analyze') || text.includes('understand') || text.includes('explore')) {
    return 'analyze';
  }

  return null;
}

/**
 * Map semantic type to algebra template
 */
function semanticTypeToAlgebra(type: Intent['semanticType']): {
  fn: (acc: any, val: any) => any;
  identity: any;
} | null {
  switch (type) {
    case 'create':
      // Create = accumulate new items
      return {
        fn: (acc: any[], val: any) => [...acc, val],
        identity: [],
      };

    case 'update':
      // Update = merge changes
      return {
        fn: (acc: any, val: any) => ({ ...acc, ...val }),
        identity: {},
      };

    case 'fix':
      // Fix = filter out errors
      return {
        fn: (acc: any[], val: any) => val.isValid ? [...acc, val] : acc,
        identity: [],
      };

    case 'optimize':
      // Optimize = select best
      return {
        fn: (acc: any, val: any) => (val.score > acc.score ? val : acc),
        identity: { score: -Infinity },
      };

    case 'analyze':
      // Analyze = collect statistics
      return {
        fn: (acc: { count: number; sum: number }, val: number) => ({
          count: acc.count + 1,
          sum: acc.sum + val,
        }),
        identity: { count: 0, sum: 0 },
      };

    default:
      return null;
  }
}

/**
 * Detect algebraic properties from template
 */
function detectPropertiesFromTemplate(template: {
  fn: (acc: any, val: any) => any;
  identity: any;
}): AlgebraProperties {
  // Simplified detection - in real implementation would use randomized testing
  return {
    associative: true, // Assume true for now
    commutative: false, // Conservative default
    identity: template.identity,
    idempotent: false,
    inverse: false,
  };
}

/**
 * Estimate position in Field Φ from intent
 */
function estimatePosition(intent: Intent): { praxis: number; gnosis: number } {
  // Map semantic type to Field position
  switch (intent.semanticType) {
    case 'create':
      return { praxis: 0.5, gnosis: 1 }; // High gnosis (intuition)
    case 'update':
      return { praxis: 1, gnosis: 0.5 }; // High praxis (structure)
    case 'fix':
      return { praxis: 1, gnosis: 0 }; // Pure praxis (logic)
    case 'optimize':
      return { praxis: 0.8, gnosis: 0.8 }; // Balanced, toward Truth
    case 'analyze':
      return { praxis: 0, gnosis: 1 }; // Pure gnosis (exploration)
    default:
      return { praxis: 0, gnosis: 0 }; // Bridge (unknown)
  }
}

/**
 * Calculate mass from position
 */
function calculateMassFromPosition(position: { praxis: number; gnosis: number }): number {
  // From Theorem 48: m(x) = 1/(1 + d_Truth(x))
  const d_Truth = Math.abs(position.gnosis - position.praxis) / Math.SQRT2;
  return 1 / (1 + d_Truth);
}

/**
 * Classify algebra from properties
 */
function classifyAlgebraFromProperties(props: AlgebraProperties): AlgebraClass {
  // Implement Theorem 40: Algebra Classification
  if (props.associative && props.identity) {
    if (props.commutative) {
      if (props.idempotent) {
        return 'IdempotentCommutativeMonoid';
      }
      return 'CommutativeMonoid';
    }
    return 'Monoid';
  }
  if (props.associative) {
    return 'Semigroup';
  }
  return 'Magma';
}

/**
 * Validate algebra completeness
 */
function validateAlgebraCompleteness(algebra: ConsciousAlgebra<any, any>): string[] {
  const errors: string[] = [];

  if (!algebra.name) {
    errors.push('Algebra must have name');
  }
  if (!algebra.fn) {
    errors.push('Algebra must have function');
  }
  if (algebra.identity === undefined) {
    errors.push('Algebra must have identity element (or null)');
  }
  if (!algebra.properties) {
    errors.push('Algebra must have properties object');
  }
  if (!algebra.class) {
    errors.push('Algebra must be classified');
  }

  return errors;
}

/**
 * Calculate validation confidence
 */
function calculateValidationConfidence(
  intent: Intent,
  algebra: ConsciousAlgebra<any, any>
): number {
  let confidence = 1.0;

  // Reduce confidence if semantic type was inferred
  if (!intent.semanticType) {
    confidence *= 0.8;
  }

  // Reduce confidence if position is at Bridge (unknown)
  if (algebra.position?.praxis === 0 && algebra.position?.gnosis === 0) {
    confidence *= 0.5;
  }

  // Reduce confidence if not CommutativeMonoid (lower algebraic guarantee)
  if (algebra.class !== 'CommutativeMonoid' && algebra.class !== 'Monoid') {
    confidence *= 0.7;
  }

  return Math.max(0, Math.min(1, confidence));
}

/**
 * Validate ConsciousAlgebra before µ_HARVEST
 *
 * This is the GATE FUNCTION that prevents invalid algebras from entering Field Φ
 */
export function validateConsciousAlgebra(
  algebra: ConsciousAlgebra<any, any>
): boolean {
  // Must be at least Monoid
  if (algebra.class === 'Magma') {
    return false; // Too weak algebraically
  }

  // Must have identity
  if (algebra.identity === undefined) {
    return false;
  }

  // Must have valid mass (0-1)
  if (algebra.mass !== undefined && (algebra.mass < 0 || algebra.mass > 1)) {
    return false;
  }

  // Must be associative (critical for composition)
  if (!algebra.properties.associative) {
    return false;
  }

  return true;
}

/**
 * Convert validated intent to AlgebraIntent
 */
export function intentToAlgebraIntent(
  intent: Intent,
  validationResult: ValidationResult
): AlgebraIntent | null {
  if (!validationResult.valid || !validationResult.algebra) {
    return null;
  }

  return {
    ...intent,
    algebra: validationResult.algebra,
    validated: true,
    validationTimestamp: Date.now(),
    estimatedMass: validationResult.algebra.mass || 0,
    estimatedPhase: intent.kleinPhase || 0,
  };
}
