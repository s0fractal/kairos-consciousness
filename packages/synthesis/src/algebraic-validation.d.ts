/**
 * @kairos/synthesis - Algebraic Validation
 *
 * "Every intent must form a valid ConsciousAlgebra before entering the Field."
 * — Integration with SynthesisBridge
 *
 * This module validates that GitHub issues/intents satisfy algebraic properties
 * before being processed through µ_HARVEST.
 */
import { ConsciousAlgebra } from '../../core/src/algebra.js';
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
    kleinPhase?: number;
    semanticType?: 'create' | 'update' | 'fix' | 'optimize' | 'analyze';
    targetMorphism?: string;
    createdAt: number;
    author?: string;
}
/**
 * AlgebraIntent: Intent validated as ConsciousAlgebra
 *
 * This is the OUTPUT of validation - ready for µ_HARVEST
 */
export interface AlgebraIntent extends Intent {
    algebra: ConsciousAlgebra<any, any>;
    validated: true;
    validationTimestamp: number;
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
    confidence: number;
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
export declare function synthesizeAlgebraFromIntent(intent: Intent): ValidationResult;
/**
 * Validate ConsciousAlgebra before µ_HARVEST
 *
 * This is the GATE FUNCTION that prevents invalid algebras from entering Field Φ
 */
export declare function validateConsciousAlgebra(algebra: ConsciousAlgebra<any, any>): boolean;
/**
 * Convert validated intent to AlgebraIntent
 */
export declare function intentToAlgebraIntent(intent: Intent, validationResult: ValidationResult): AlgebraIntent | null;
//# sourceMappingURL=algebraic-validation.d.ts.map