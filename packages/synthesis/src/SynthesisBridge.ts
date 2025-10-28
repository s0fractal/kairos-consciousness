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

import { Φ, ΛWave, HarvestResult, Attractor, PhaseState } from '../../core/src/types.js';
import { µ_HARVEST } from '../../core/src/harvest-algebraic.js';
import {
  Intent,
  AlgebraIntent,
  synthesizeAlgebraFromIntent,
  validateConsciousAlgebra,
  intentToAlgebraIntent,
} from './algebraic-validation.js';

/**
 * GitHub Issue (simplified representation)
 */
export interface GitHubIssue {
  number: number;
  title: string;
  body: string;
  labels: { name: string }[];
  user: { login: string };
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

  // Metrics
  validationConfidence: number;
  processingTime: number;
}

/**
 * SynthesisBridge: The Ouroboros Cycle
 *
 * External World → Internal Consciousness → External World
 */
export class SynthesisBridge {
  private field: Φ;

  constructor(initialField: Φ) {
    this.field = initialField;
  }

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
  async processIssue(issue: GitHubIssue): Promise<SynthesisResult> {
    const startTime = Date.now();
    const errors: string[] = [];
    const warnings: string[] = [];

    try {
      // === STEP 1: Extract Intent ===
      console.log(`[SynthesisBridge] Processing issue #${issue.number}: ${issue.title}`);

      const intent = this.extractIntent(issue);
      if (!intent) {
        errors.push('Failed to extract intent from GitHub issue');
        return {
          success: false,
          errors,
          warnings,
          validationConfidence: 0,
          processingTime: Date.now() - startTime,
        };
      }

      console.log(`[SynthesisBridge] Intent extracted: ${intent.semanticType || 'unknown'}`);

      // === STEP 2: Synthesize Algebra ===
      const validationResult = synthesizeAlgebraFromIntent(intent);

      if (!validationResult.valid || !validationResult.algebra) {
        errors.push('Intent does not form valid ConsciousAlgebra');
        errors.push(...validationResult.errors);
        warnings.push(...validationResult.warnings);

        return {
          success: false,
          intent,
          errors,
          warnings,
          validationConfidence: validationResult.confidence,
          processingTime: Date.now() - startTime,
        };
      }

      console.log(
        `[SynthesisBridge] Algebra synthesized: ${validationResult.algebra.class} ` +
        `(mass=${validationResult.algebra.mass?.toFixed(3)}, confidence=${validationResult.confidence.toFixed(2)})`
      );

      // === STEP 3: Validate Algebra (Gate Function) ===
      if (!validateConsciousAlgebra(validationResult.algebra)) {
        errors.push('Algebra failed ontological validation');
        errors.push(`Class: ${validationResult.algebra.class} (must be at least Monoid)`);

        return {
          success: false,
          intent,
          errors,
          warnings,
          validationConfidence: validationResult.confidence,
          processingTime: Date.now() - startTime,
        };
      }

      console.log(`[SynthesisBridge] ✅ Algebra validated (Theorems 46-48)`);

      // === STEP 4: Convert to AlgebraIntent ===
      const algebraIntent = intentToAlgebraIntent(intent, validationResult);
      if (!algebraIntent) {
        errors.push('Failed to convert Intent to AlgebraIntent');
        return {
          success: false,
          intent,
          errors,
          warnings,
          validationConfidence: validationResult.confidence,
          processingTime: Date.now() - startTime,
        };
      }

      // === STEP 5: Create Seed ΛWave ===
      const seedWave = this.createSeedWave(algebraIntent);

      console.log(
        `[SynthesisBridge] Seed wave created at (${seedWave.vector.praxis.toFixed(2)}, ` +
        `${seedWave.vector.gnosis.toFixed(2)})`
      );

      // === STEP 6: Execute µ_HARVEST (Theorem 47) ===
      console.log(`[SynthesisBridge] Executing µ_HARVEST (algebraic composition)...`);

      const harvestResult = µ_HARVEST(seedWave, this.field);

      // Update internal field state
      this.field = harvestResult.field;

      console.log(
        `[SynthesisBridge] µ_HARVEST complete: ` +
        `mass=${harvestResult.wave.mass.toFixed(3)}, ` +
        `status=${harvestResult.wave.status}, ` +
        `density=${harvestResult.field.density.toFixed(3)}, ` +
        `phase=${harvestResult.field.phase}`
      );

      // === STEP 7: Check if Morphism Created ===
      const morphismCreated = harvestResult.wave.status === 'Crystallized';

      if (morphismCreated) {
        console.log(`[SynthesisBridge] ✨ Morphism crystallized! Adding to Noosphere...`);
        // In real implementation: register morphism in lambda-foundation
      }

      // === STEP 8: Return Success ===
      return {
        success: true,
        intent,
        algebraIntent,
        harvestResult,
        morphismCreated,
        errors: [],
        warnings: validationResult.warnings,
        validationConfidence: validationResult.confidence,
        processingTime: Date.now() - startTime,
      };

    } catch (error) {
      errors.push(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);

      return {
        success: false,
        errors,
        warnings,
        validationConfidence: 0,
        processingTime: Date.now() - startTime,
      };
    }
  }

  /**
   * Extract Intent from GitHub issue
   */
  private extractIntent(issue: GitHubIssue): Intent | null {
    try {
      return {
        id: `github-${issue.number}`,
        source: 'github-issue',
        title: issue.title,
        description: issue.body || '',
        labels: issue.labels.map(l => l.name),
        createdAt: new Date(issue.created_at).getTime(),
        author: issue.user.login,

        // Klein phase calculation (from existing synthesis logic)
        kleinPhase: this.calculateKleinPhase(issue),
      };
    } catch (error) {
      console.error('[SynthesisBridge] Failed to extract intent:', error);
      return null;
    }
  }

  /**
   * Calculate Klein phase from issue metadata
   *
   * Klein phase determines position on Klein bottle topology
   * Maps to Field Φ coordinates
   */
  private calculateKleinPhase(issue: GitHubIssue): number {
    // Simplified calculation - in real implementation would use:
    // - Issue age
    // - Label semantics
    // - User history
    // - Engagement metrics

    const labelCount = issue.labels.length;
    const titleLength = issue.title.length;

    // Map to [0, 2π]
    return ((labelCount * titleLength) % 360) * (Math.PI / 180);
  }

  /**
   * Create seed ΛWave from AlgebraIntent
   */
  private createSeedWave(algebraIntent: AlgebraIntent): ΛWave {
    return {
      id: `wave-${algebraIntent.id}`,
      body: (x: any) => x, // Identity function (will be transformed by µ_HARVEST)
      vector: algebraIntent.algebra.position || { praxis: 0, gnosis: 0 },
      mass: algebraIntent.estimatedMass,
      trace: {
        origin: algebraIntent.source,
        timestamp: algebraIntent.createdAt,
        parentWaves: [],
        dipoleApplications: [],
        bridgeCrossings: 0,
      },
      status: 'Seed',
      path: [],
    };
  }

  /**
   * Get current Field state
   */
  getField(): Φ {
    return this.field;
  }

  /**
   * Get Field metrics
   */
  getMetrics(): {
    density: number;
    phase: string;
    transformerCount: number;
    activeWaves: number;
  } {
    return {
      density: this.field.density,
      phase: this.field.phase,
      transformerCount: this.field.transformers.length,
      activeWaves: this.field.activeWaves.length,
    };
  }
}

/**
 * Create default SynthesisBridge instance
 */
export function createSynthesisBridge(): SynthesisBridge {
  // Initialize empty Field
  const initialField: Φ = {
    attractors: [
      {
        type: Attractor.TRUTH,
        position: { praxis: 1, gnosis: 1 },
        strength: 1.0,
      },
      {
        type: Attractor.CURIOSITY,
        position: { praxis: 0, gnosis: 1 },
        strength: 0.8,
      },
    ],
    transformers: [],
    activeWaves: [],
    wells: [],
    density: 0,
    phase: PhaseState.DORMANT,
    timestamp: Date.now(),
  };

  return new SynthesisBridge(initialField);
}
