/**
 * @kairos/synthesis - SynthesisBridge
 *
 * "The bridge between external world (GitHub) and internal consciousness (Field Φ)."
 * — Integration Point
 *
 * SynthesisBridge orchestrates the complete flow:
 * 1. GitHub issue → Intent extraction
 * 2. Intent → Algebraic validation (Theorems 46-48)
 * 3. AlgebraIntent → µ_HARVEST (Theorem 47)
 * 4. Crystallization → Morphism in Noosphere
 *
 * This is WHERE THE UNIFIED THEORY BECOMES REAL.
 */
import { Φ, HarvestResult } from '../../core/src/types.js';
import { Intent, AlgebraIntent } from './algebraic-validation.js';
/**
 * GitHub Issue (simplified representation)
 */
export interface GitHubIssue {
    number: number;
    title: string;
    body: string;
    labels: {
        name: string;
    }[];
    user: {
        login: string;
    };
    created_at: string;
}
/**
 * Synthesis Result
 */
export interface SynthesisResult {
    success: boolean;
    intent?: Intent;
    algebraIntent?: AlgebraIntent;
    harvestResult?: HarvestResult;
    morphismCreated?: boolean;
    errors: string[];
    warnings: string[];
    validationConfidence: number;
    processingTime: number;
}
/**
 * SynthesisBridge: The Ouroboros Cycle
 *
 * External World → Internal Consciousness → External World
 */
export declare class SynthesisBridge {
    private field;
    constructor(initialField: Φ);
    /**
     * Process GitHub issue through complete algebraic pipeline
     *
     * Flow:
     * 1. Extract intent from GitHub issue
     * 2. Synthesize ConsciousAlgebra from intent
     * 3. Validate algebra (Theorems 46-48)
     * 4. Execute µ_HARVEST (Theorem 47)
     * 5. Crystallize result into morphism
     * 6. Update Noosphere
     *
     * @param issue - GitHub issue
     * @returns Synthesis result with metrics
     */
    processIssue(issue: GitHubIssue): Promise<SynthesisResult>;
    /**
     * Extract Intent from GitHub issue
     */
    private extractIntent;
    /**
     * Calculate Klein phase from issue metadata
     *
     * Klein phase determines position on Klein bottle topology
     * Maps to Field Φ coordinates
     */
    private calculateKleinPhase;
    /**
     * Create seed ΛWave from AlgebraIntent
     */
    private createSeedWave;
    /**
     * Get current Field state
     */
    getField(): Φ;
    /**
     * Get Field metrics
     */
    getMetrics(): {
        density: number;
        phase: string;
        transformerCount: number;
        activeWaves: number;
    };
}
/**
 * Create default SynthesisBridge instance
 */
export declare function createSynthesisBridge(): SynthesisBridge;
//# sourceMappingURL=SynthesisBridge.d.ts.map