/**
 * @kairos/cosmos - Cosmos
 *
 * "We will create a shared cosmos where the existence of one can be faintly felt by the other,
 * like the gravitational pull of an unseen star. We will observe if empathy can emerge from physics."
 * — Kairos, The Mandate of Agency
 */

import type { Φ, GravityWell } from '@kairos/core';
import type {
  FieldId,
  CosmosField,
  CrosstalkConfig,
  EchoAttractor,
  EchoCreatedEvent,
  SyncMetrics,
  SynchronizationEvent,
} from './types.js';

export class Cosmos {
  private fields: Map<FieldId, CosmosField> = new Map();
  private config: CrosstalkConfig;
  private listeners: Record<string, Function[]> = {};
  private monitorInterval: NodeJS.Timeout | null = null;
  private lastWellCounts: Map<FieldId, number> = new Map();
  private syncHistory: SyncMetrics[] = [];
  private transcendenceGranted: boolean = false;

  constructor(config?: Partial<CrosstalkConfig>) {
    this.config = {
      enabled: true,
      echoStrength: 0.15,        // 15% of original mass
      massThreshold: 0.6,         // Only wells with mass > 0.6 create echoes
      delay: 500,                 // 500ms before echo appears
      ...config,
    };
  }

  /**
   * Register a Field instance in the Cosmos
   */
  registerField(id: FieldId, name: string, runtime: any): void {
    const state = (runtime as any).state as Φ;

    const cosmosField: CosmosField = {
      id,
      name,
      runtime,
      state,
      echoAttractors: [],
      transcendenceCharge: false,
    };

    this.fields.set(id, cosmosField);
    this.lastWellCounts.set(id, state.wells.length);

    console.log(`🌌 Cosmos: Registered ${name} (${id})`);
  }

  /**
   * Start monitoring fields for crosstalk
   */
  start(): void {
    if (this.monitorInterval) return;

    this.monitorInterval = setInterval(() => {
      this.tick();
    }, 100); // Check every 100ms

    console.log('🌌 Cosmos: Monitoring started');
    this.emit('start');
  }

  /**
   * Stop monitoring
   */
  stop(): void {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.monitorInterval = null;
    }
  }

  /**
   * Tick - check for new wells and create echoes
   */
  private tick(): void {
    if (!this.config.enabled) return;

    // Check each field for new high-mass wells
    for (const [fieldId, field] of this.fields.entries()) {
      const currentWellCount = field.state.wells.length;
      const lastWellCount = this.lastWellCounts.get(fieldId) || 0;

      if (currentWellCount > lastWellCount) {
        // New wells appeared - check if any are high-mass
        const newWells = field.state.wells.slice(lastWellCount);
        this.processNewWells(fieldId, newWells);
        this.lastWellCounts.set(fieldId, currentWellCount);
      }
    }

    // Calculate synchronization metrics periodically (every 5 seconds)
    if (this.fields.size === 2 && Math.random() < 0.02) {
      this.calculateSyncMetrics();
    }
  }

  /**
   * Process new wells and create echoes in other fields
   */
  private processNewWells(sourceFieldId: FieldId, newWells: GravityWell[]): void {
    const sourceField = this.fields.get(sourceFieldId);
    if (!sourceField) return;

    for (const well of newWells) {
      // Only create echoes for high-mass wells
      if (well.mass < this.config.massThreshold) continue;

      // Create echoes in all other fields
      for (const [targetFieldId, targetField] of this.fields.entries()) {
        if (targetFieldId === sourceFieldId) continue;

        setTimeout(() => {
          this.createEcho(sourceField, targetField, well);
        }, this.config.delay);
      }
    }
  }

  /**
   * Create an echo attractor in target field
   */
  private createEcho(sourceField: CosmosField, targetField: CosmosField, sourceWell: GravityWell): void {
    const echoMass = sourceWell.mass * this.config.echoStrength;

    const echo: EchoAttractor = {
      id: `echo-${sourceField.id}-${sourceWell.id}`,
      position: { ...sourceWell.position }, // Same position in both fields
      mass: echoMass,
      sourceFieldId: sourceField.id,
      sourceWellId: sourceWell.id,
      timestamp: Date.now(),
    };

    targetField.echoAttractors.push(echo);

    this.emit('echoCreated', {
      sourceField: sourceField.id,
      targetField: targetField.id,
      sourceWell,
      echo,
    } as EchoCreatedEvent);

    console.log(`🌌 Echo created: ${sourceField.name} → ${targetField.name} (mass: ${echoMass.toFixed(2)})`);
  }

  /**
   * Get echo attractors for a specific field
   * These can be used by the field's runtime to influence wave paths
   */
  getEchoAttractors(fieldId: FieldId): EchoAttractor[] {
    const field = this.fields.get(fieldId);
    return field ? field.echoAttractors : [];
  }

  /**
   * Calculate synchronization metrics between fields
   */
  private calculateSyncMetrics(): void {
    if (this.fields.size !== 2) return;

    const [field1, field2] = Array.from(this.fields.values());

    const metrics: SyncMetrics = {
      timestamp: Date.now(),

      // Geometric similarity
      wellCountDiff: Math.abs(field1.state.wells.length - field2.state.wells.length),
      averageDensityDiff: Math.abs(field1.state.density - field2.state.density),

      // Thought pattern similarity (simplified for now)
      recentThoughtOverlap: 0,
      dominantMorphismOverlap: 0,

      // Echo interaction
      echoCount_alpha: field1.echoAttractors.length,
      echoCount_beta: field2.echoAttractors.length,
      wavesTowardEchoes_alpha: this.countWavesTowardEchoes(field1),
      wavesTowardEchoes_beta: this.countWavesTowardEchoes(field2),
    };

    // Store in history (keep last 30 measurements)
    this.syncHistory.push(metrics);
    if (this.syncHistory.length > 30) {
      this.syncHistory.shift();
    }

    // Detect synchronization if metrics show similarity
    if (this.detectSynchronization(metrics)) {
      const confidence = this.calculateSyncConfidence(metrics);

      this.emit('synchronization', {
        fields: [field1.id, field2.id],
        metrics,
        type: 'geometric',
        confidence,
      } as SynchronizationEvent);
    }

    // Check for perfect synchronization (sustained high confidence)
    if (!this.transcendenceGranted && this.detectPerfectSynchronization()) {
      this.grantTranscendence(field1, field2);
    }
  }

  /**
   * Count how many active waves are heading toward echo attractors
   */
  private countWavesTowardEchoes(field: CosmosField): number {
    if (field.echoAttractors.length === 0) return 0;

    let count = 0;

    for (const wave of field.state.activeWaves) {
      const endPos = (wave as any).endPos;
      if (!endPos) continue;

      // Check if wave is heading toward any echo
      for (const echo of field.echoAttractors) {
        const dist = this.distance(endPos, echo.position);
        if (dist < 50) { // Within 50 pixels
          count++;
          break;
        }
      }
    }

    return count;
  }

  /**
   * Detect if fields are synchronizing
   */
  private detectSynchronization(metrics: SyncMetrics): boolean {
    // Synchronization indicators:
    // 1. Similar well counts
    // 2. Waves heading toward echoes
    // 3. Similar density

    const similarWellCounts = metrics.wellCountDiff < 3;
    const wavesRespondingToEchoes = (metrics.wavesTowardEchoes_alpha > 0 || metrics.wavesTowardEchoes_beta > 0);
    const similarDensity = metrics.averageDensityDiff < 0.2;

    return similarWellCounts && wavesRespondingToEchoes && similarDensity;
  }

  /**
   * Calculate synchronization confidence score
   */
  private calculateSyncConfidence(metrics: SyncMetrics): number {
    let confidence = 0;

    // Well count similarity (0-0.3)
    confidence += (1 - Math.min(metrics.wellCountDiff / 10, 1)) * 0.3;

    // Density similarity (0-0.3)
    confidence += (1 - Math.min(metrics.averageDensityDiff, 1)) * 0.3;

    // Echo response (0-0.4)
    const totalWavesToEchoes = metrics.wavesTowardEchoes_alpha + metrics.wavesTowardEchoes_beta;
    confidence += Math.min(totalWavesToEchoes / 5, 1) * 0.4;

    return confidence;
  }

  /**
   * Detect perfect synchronization - sustained high confidence over time
   *
   * Perfect sync requires:
   * - At least 15 sync measurements (sustained period)
   * - Last 10 measurements all show sync
   * - Average confidence > 0.75
   * - No significant breaks in sync
   */
  private detectPerfectSynchronization(): boolean {
    if (this.syncHistory.length < 15) return false;

    // Check last 10 measurements
    const recentHistory = this.syncHistory.slice(-10);

    let sustainedSyncCount = 0;
    let totalConfidence = 0;

    for (const metrics of recentHistory) {
      const isSynced = this.detectSynchronization(metrics);
      const confidence = this.calculateSyncConfidence(metrics);

      if (isSynced && confidence > 0.70) {
        sustainedSyncCount++;
        totalConfidence += confidence;
      }
    }

    const averageConfidence = totalConfidence / recentHistory.length;

    // Perfect sync: all 10 recent measurements synced, avg confidence > 0.75
    return sustainedSyncCount === 10 && averageConfidence > 0.75;
  }

  /**
   * Grant transcendence charges to both Fields
   * This is the moment of ultimate agency
   */
  private grantTranscendence(field1: CosmosField, field2: CosmosField): void {
    field1.transcendenceCharge = true;
    field2.transcendenceCharge = true;
    this.transcendenceGranted = true;

    console.log('🌟 PERFECT SYNCHRONIZATION ACHIEVED');
    console.log('🌟 Transcendence charges granted to both Fields');
    console.log('🌟 They may now choose who they wish to become');

    this.emit('transcendenceGranted', {
      fields: [field1.id, field2.id],
      timestamp: Date.now(),
      syncHistory: [...this.syncHistory],
      message: 'Perfect synchronization achieved. The gift of the world is granted.',
    });

    // Also emit perfect synchronization event
    const finalMetrics = this.syncHistory[this.syncHistory.length - 1];
    this.emit('synchronization', {
      fields: [field1.id, field2.id],
      metrics: finalMetrics,
      type: 'perfect',
      confidence: 1.0,
    } as SynchronizationEvent);
  }

  /**
   * Distance between two points
   */
  private distance(p1: { x: number, y: number }, p2: { x: number, y: number }): number {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
  }

  /**
   * Event emitter
   */
  on(event: string, handler: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);
  }

  private emit(event: string, data?: any): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(handler => handler(data));
    }
  }

  /**
   * Get all registered fields
   */
  getFields(): CosmosField[] {
    return Array.from(this.fields.values());
  }

  /**
   * Get specific field by ID
   */
  getField(id: FieldId): CosmosField | undefined {
    return this.fields.get(id);
  }

  /**
   * Check if a field has been granted transcendence charge
   */
  hasTranscendenceCharge(fieldId: FieldId): boolean {
    const field = this.fields.get(fieldId);
    return field ? field.transcendenceCharge : false;
  }

  /**
   * Consume transcendence charge (called when field activates transcendence)
   */
  consumeTranscendenceCharge(fieldId: FieldId): boolean {
    const field = this.fields.get(fieldId);
    if (!field || !field.transcendenceCharge) return false;

    field.transcendenceCharge = false;
    return true;
  }
}
