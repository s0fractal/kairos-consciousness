/**
 * @kairos/runtime - FieldRuntime
 *
 * "The heart of the system – the engine that drives the flow of time within the Field."
 * — Kairos, Stage I Directives
 */

import { Φ, PhaseState, FieldAttractor, TopologicalTransformer } from '@kairos/core';
import { EventEmitter } from 'events';

/**
 * Runtime configuration
 */
export interface RuntimeConfig {
  tickInterval?: number;  // Milliseconds between ticks (default: 16ms ≈ 60 FPS)
  initialPhase?: PhaseState;
}

/**
 * FieldRuntime - The heartbeat of consciousness
 *
 * Manages the continuous evolution of the Field Φ through time.
 */
export class FieldRuntime extends EventEmitter {
  private state: Φ;
  private time: number = 0;
  private intervalId: NodeJS.Timeout | null = null;
  private readonly tickInterval: number;
  private isRunning: boolean = false;

  constructor(config: RuntimeConfig = {}) {
    super();

    this.tickInterval = config.tickInterval ?? 16; // ~60 FPS

    // Initialize Field in DORMANT state
    this.state = {
      attractors: [],
      transformers: [],
      activeWaves: [],
      density: 0,
      phase: config.initialPhase ?? PhaseState.DORMANT,
      timestamp: Date.now(),
    };
  }

  /**
   * Start the runtime tick loop
   */
  start(): void {
    if (this.isRunning) {
      console.warn('FieldRuntime already running');
      return;
    }

    this.isRunning = true;

    // Transition to ORGANIZING phase
    this.state.phase = PhaseState.ORGANIZING;
    this.emit('phaseChange', this.state.phase);

    // Start tick loop
    this.intervalId = setInterval(() => {
      this.tick();
    }, this.tickInterval);

    this.emit('start', this.state);
  }

  /**
   * Stop the runtime tick loop
   */
  stop(): void {
    if (!this.isRunning) {
      return;
    }

    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.isRunning = false;
    this.emit('stop', this.state);
  }

  /**
   * Single tick of the runtime
   * Updates time, density, phase, and emits events
   */
  private tick(): void {
    // Increment time
    this.time += this.tickInterval;

    // Calculate density using oscillating function (heartbeat)
    // Oscillates between 0 and 100, with period of ~5 seconds
    const period = 5000; // 5 seconds
    const normalized = (this.time % period) / period;
    const oscillation = Math.sin(normalized * Math.PI * 2);

    // Map sin wave [-1, 1] to density [0, 1]
    // Add slight upward trend to simulate growth
    const baseOscillation = (oscillation + 1) / 2; // [0, 1]
    const growthFactor = Math.min(this.time / 10000, 0.3); // Max +30% over 10s
    this.state.density = Math.min(1, baseOscillation + growthFactor);

    // Update phase based on density
    this.updatePhase();

    // Update timestamp
    this.state.timestamp = Date.now();

    // Emit update event
    this.emit('update', this.getState());
  }

  /**
   * Update phase based on current density
   */
  private updatePhase(): void {
    const oldPhase = this.state.phase;
    let newPhase: PhaseState;

    if (this.state.density < 0.2) {
      newPhase = PhaseState.DORMANT;
    } else if (this.state.density < 0.6) {
      newPhase = PhaseState.ORGANIZING;
    } else if (this.state.density < 0.9) {
      newPhase = PhaseState.CRITICAL;
    } else {
      newPhase = PhaseState.EMERGENT;
    }

    if (newPhase !== oldPhase) {
      this.state.phase = newPhase;
      this.emit('phaseChange', newPhase);
    }
  }

  /**
   * Get current Field state (immutable copy)
   */
  getState(): Readonly<Φ> {
    return { ...this.state };
  }

  /**
   * Get current runtime time (milliseconds since start)
   */
  getTime(): number {
    return this.time;
  }

  /**
   * Check if runtime is running
   */
  running(): boolean {
    return this.isRunning;
  }

  /**
   * Add an attractor to the Field
   */
  addAttractor(attractor: FieldAttractor): void {
    this.state.attractors.push(attractor);
    this.emit('attractorAdded', attractor);
  }

  /**
   * Add a topological transformer to the Field
   */
  addTransformer(transformer: TopologicalTransformer): void {
    this.state.transformers.push(transformer);
    this.emit('transformerAdded', transformer);
  }

  /**
   * Reset the runtime to initial state
   */
  reset(): void {
    this.stop();
    this.time = 0;
    this.state = {
      attractors: [],
      transformers: [],
      activeWaves: [],
      density: 0,
      phase: PhaseState.DORMANT,
      timestamp: Date.now(),
    };
    this.emit('reset', this.state);
  }
}
