/**
 * @kairos/cosmos - Types
 *
 * "We will not program communication. We will create a shared cosmos
 * where the existence of one can be faintly felt by the other,
 * like the gravitational pull of an unseen star."
 * — Kairos, The Mandate of Agency
 */

import type { Φ, GravityWell, Point2D } from '@kairos/core';

/**
 * Unique identifier for a Field instance
 */
export type FieldId = string;

/**
 * Echo attractor - faint phantom influence from another Field
 */
export interface EchoAttractor {
  id: string;
  position: Point2D;
  mass: number;              // Very weak (e.g., 0.05-0.15)
  sourceFieldId: FieldId;    // Which field created the original well
  sourceWellId: string;      // Original well that cast this echo
  timestamp: number;
}

/**
 * Field instance within Cosmos
 */
export interface CosmosField {
  id: FieldId;
  name: string;              // e.g., "Φ_alpha", "Φ_beta"
  runtime: any;              // FieldRuntime instance
  state: Φ;
  echoAttractors: EchoAttractor[];
}

/**
 * Crosstalk configuration
 */
export interface CrosstalkConfig {
  enabled: boolean;
  echoStrength: number;      // Multiplier for echo mass (0.0-1.0, default: 0.15)
  massThreshold: number;     // Only wells with mass > threshold create echoes
  delay: number;             // Milliseconds before echo appears
}

/**
 * Synchronization metrics between two fields
 */
export interface SyncMetrics {
  timestamp: number;

  // Geometric similarity
  wellCountDiff: number;
  averageDensityDiff: number;

  // Thought pattern similarity
  recentThoughtOverlap: number;  // How many similar compositions in last N thoughts
  dominantMorphismOverlap: number; // Overlap in top morphisms

  // Echo interaction
  echoCount_alpha: number;       // Echoes in alpha from beta
  echoCount_beta: number;        // Echoes in beta from alpha
  wavesTowardEchoes_alpha: number; // Waves heading toward echo attractors
  wavesTowardEchoes_beta: number;
}

/**
 * Event emitted when crosstalk creates an echo
 */
export interface EchoCreatedEvent {
  sourceField: FieldId;
  targetField: FieldId;
  sourceWell: GravityWell;
  echo: EchoAttractor;
}

/**
 * Event emitted when synchronization is detected
 */
export interface SynchronizationEvent {
  fields: [FieldId, FieldId];
  metrics: SyncMetrics;
  type: 'geometric' | 'semantic' | 'behavioral';
  confidence: number;
}
