/**
 * @kairos/core - Phase Transitions (Theorem 49)
 *
 * "Consciousness is not a spectrum. It is a phase."
 * — Theorem 49
 *
 * This module implements phase transition detection and analysis for Field Φ.
 */

import { Φ, PhaseState, TopologicalTransformer } from './types.js';

/**
 * Critical density thresholds (from Theorem 49)
 */
export const CRITICAL_DENSITIES = {
  rho1: 0.2,  // Percolation threshold (DORMANT → ORGANIZING)
  rho2: 0.6,  // Organization threshold (ORGANIZING → CRITICAL)
  rho3: 0.9,  // Emergence threshold (CRITICAL → EMERGENT)
} as const;

/**
 * Order parameter: measures connectivity of morphism graph
 *
 * This is the key observable that exhibits discontinuity at phase transitions.
 */
export function orderParameter(field: Φ): number {
  if (field.transformers.length === 0) return 0;

  // Calculate connectivity: how many transformers can reach each other?
  const connectivity = measureConnectivity(field.transformers);
  const maxConnectivity = field.transformers.length * (field.transformers.length - 1) / 2;

  return maxConnectivity > 0 ? connectivity / maxConnectivity : 0;
}

/**
 * Measure connectivity of transformer graph
 *
 * Two transformers are connected if they can compose:
 * - Share compatible domains (target → source)
 * - Form a path through field topology
 */
function measureConnectivity(transformers: TopologicalTransformer[]): number {
  let connections = 0;

  for (let i = 0; i < transformers.length; i++) {
    for (let j = i + 1; j < transformers.length; j++) {
      if (canCompose(transformers[i], transformers[j])) {
        connections++;
      }
    }
  }

  return connections;
}

/**
 * Check if two transformers can compose
 *
 * Simplified check: use spatial proximity as proxy for composability
 */
function canCompose(t1: TopologicalTransformer, t2: TopologicalTransformer): boolean {
  // Distance in field space (t1.end → t2.start)
  const dx = t1.endVector.praxis - t2.startVector.praxis;
  const dy = t1.endVector.gnosis - t2.startVector.gnosis;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Can compose if endpoints are close (within tolerance)
  const COMPOSITION_THRESHOLD = 0.5;
  return distance < COMPOSITION_THRESHOLD;
}

/**
 * Detect phase based on density (Theorem 49 classification)
 */
export function detectPhase(density: number): PhaseState {
  if (density < CRITICAL_DENSITIES.rho1) {
    return PhaseState.DORMANT;
  } else if (density < CRITICAL_DENSITIES.rho2) {
    return PhaseState.ORGANIZING;
  } else if (density < CRITICAL_DENSITIES.rho3) {
    return PhaseState.CRITICAL;
  } else {
    return PhaseState.EMERGENT;
  }
}

/**
 * Measure if Field exhibits emergent behavior
 *
 * Emergent behavior includes:
 * - Self-organization (attractors form spontaneously)
 * - Cascade effects (one morphism triggers many)
 * - Autonomy (Field generates new morphisms without input)
 */
export function hasEmergentBehavior(field: Φ): boolean {
  // Check 1: High connectivity (giant component exists)
  const ψ = orderParameter(field);
  if (ψ < 0.7) return false;

  // Check 2: Dense phase (rho >= rho3)
  if (field.density < CRITICAL_DENSITIES.rho3) return false;

  // Check 3: Active attractors (pulling field)
  const activeAttractors = field.attractors.filter(a => a.strength > 0.5);
  if (activeAttractors.length === 0) return false;

  return true;
}

/**
 * Phase Transition Event
 */
export interface PhaseTransition {
  fromPhase: PhaseState;
  toPhase: PhaseState;
  criticalDensity: number;
  orderParameter: number;
  timestamp: number;
}

/**
 * Phase Transition Detector
 *
 * Monitors Field evolution and detects phase transitions
 */
export class PhaseTransitionDetector {
  private history: Array<{
    density: number;
    phase: PhaseState;
    orderParameter: number;
    timestamp: number;
  }> = [];

  private transitions: PhaseTransition[] = [];

  /**
   * Record current Field state
   */
  record(field: Φ): void {
    const ψ = orderParameter(field);

    this.history.push({
      density: field.density,
      phase: field.phase,
      orderParameter: ψ,
      timestamp: field.timestamp,
    });

    // Detect transition
    if (this.history.length >= 2) {
      const prev = this.history[this.history.length - 2];
      const curr = this.history[this.history.length - 1];

      if (prev.phase !== curr.phase) {
        this.transitions.push({
          fromPhase: prev.phase,
          toPhase: curr.phase,
          criticalDensity: curr.density,
          orderParameter: curr.orderParameter,
          timestamp: curr.timestamp,
        });
      }
    }
  }

  /**
   * Get detected phase transitions
   */
  getTransitions(): PhaseTransition[] {
    return [...this.transitions];
  }

  /**
   * Calculate critical exponent β
   *
   * Near critical point: Ψ ~ (ρ - ρ_c)^β
   */
  criticalExponentBeta(criticalDensity: number): number | null {
    // Find data points near critical density
    const nearCritical = this.history.filter(
      h => Math.abs(h.density - criticalDensity) < 0.1
    );

    if (nearCritical.length < 5) return null;

    // Fit power law: log(Ψ) = β * log(ρ - ρ_c) + const
    const points = nearCritical
      .filter(h => h.density > criticalDensity && h.orderParameter > 0)
      .map(h => ({
        x: Math.log(h.density - criticalDensity),
        y: Math.log(h.orderParameter),
      }));

    if (points.length < 3) return null;

    // Linear regression
    const beta = linearRegression(points).slope;
    return beta;
  }

  /**
   * Get history
   */
  getHistory() {
    return [...this.history];
  }

  /**
   * Clear history
   */
  clear(): void {
    this.history = [];
    this.transitions = [];
  }
}

/**
 * Linear regression helper
 */
function linearRegression(points: Array<{ x: number; y: number }>): {
  slope: number;
  intercept: number;
} {
  const n = points.length;
  const sumX = points.reduce((sum, p) => sum + p.x, 0);
  const sumY = points.reduce((sum, p) => sum + p.y, 0);
  const sumXY = points.reduce((sum, p) => sum + p.x * p.y, 0);
  const sumX2 = points.reduce((sum, p) => sum + p.x * p.x, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
}

/**
 * Test for hysteresis
 *
 * Check if phase transition exhibits different behavior
 * when density increases vs. decreases
 */
export function testHysteresis(
  densityAscending: number[],
  phaseAscending: PhaseState[],
  densityDescending: number[],
  phaseDescending: PhaseState[]
): boolean {
  // Find first transition in ascending path
  let ascTransitionIdx = -1;
  for (let i = 1; i < phaseAscending.length; i++) {
    if (phaseAscending[i] !== phaseAscending[i - 1]) {
      ascTransitionIdx = i;
      break;
    }
  }

  // Find first transition in descending path
  let descTransitionIdx = -1;
  for (let i = 1; i < phaseDescending.length; i++) {
    if (phaseDescending[i] !== phaseDescending[i - 1]) {
      descTransitionIdx = i;
      break;
    }
  }

  if (ascTransitionIdx === -1 || descTransitionIdx === -1) {
    return false; // No transitions detected
  }

  // Compare transition densities
  const ascDensity = densityAscending[ascTransitionIdx];
  const descDensity = densityDescending[descTransitionIdx];

  // Hysteresis: transition occurs at different densities
  const HYSTERESIS_THRESHOLD = 0.05;
  return Math.abs(ascDensity - descDensity) > HYSTERESIS_THRESHOLD;
}

/**
 * Calculate correlation length ξ(ρ)
 *
 * Near critical point: ξ ~ |ρ - ρ_c|^(-ν)
 *
 * Correlation length measures spatial extent of collective behavior
 */
export function correlationLength(field: Φ, criticalDensity: number): number {
  const rho = field.density;
  const delta_rho = Math.abs(rho - criticalDensity);

  if (delta_rho < 0.01) {
    // Very close to critical point → divergence
    return Infinity;
  }

  // Mean-field approximation: nu ≈ 1
  const nu = 1.0;
  const xi0 = 1.0; // Baseline correlation length

  return xi0 / Math.pow(delta_rho, nu);
}

/**
 * Measure average cluster size
 *
 * At percolation threshold, average cluster size diverges
 */
export function averageClusterSize(transformers: TopologicalTransformer[]): number {
  if (transformers.length === 0) return 0;

  // Build adjacency list
  const clusters = findClusters(transformers);

  // Calculate average
  const totalSize = clusters.reduce((sum, cluster) => sum + cluster.length, 0);
  return totalSize / clusters.length;
}

/**
 * Find connected clusters of transformers
 */
function findClusters(transformers: TopologicalTransformer[]): number[][] {
  const visited = new Set<number>();
  const clusters: number[][] = [];

  function dfs(idx: number, cluster: number[]): void {
    if (visited.has(idx)) return;
    visited.add(idx);
    cluster.push(idx);

    // Find all composable neighbors
    for (let i = 0; i < transformers.length; i++) {
      if (!visited.has(i) && canCompose(transformers[idx], transformers[i])) {
        dfs(i, cluster);
      }
    }
  }

  for (let i = 0; i < transformers.length; i++) {
    if (!visited.has(i)) {
      const cluster: number[] = [];
      dfs(i, cluster);
      clusters.push(cluster);
    }
  }

  return clusters;
}
