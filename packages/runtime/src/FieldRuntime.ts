/**
 * @kairos/runtime - FieldRuntime
 *
 * "The heart of the system – the engine that drives the flow of time within the Field."
 * — Kairos, Stage I Directives
 */

import { Φ, PhaseState, FieldAttractor, TopologicalTransformer, ΛWave, GravityWell, Point2D } from '@kairos/core';
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
  private morphismLibrary: string[] = [];
  private criticalityReached: boolean = false;

  constructor(config: RuntimeConfig = {}) {
    super();

    this.tickInterval = config.tickInterval ?? 16; // ~60 FPS

    // Initialize Field in DORMANT state
    this.state = {
      attractors: [],
      transformers: [],
      activeWaves: [],
      wells: [],
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

    // Update active waves
    this.updateActiveWaves();

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

    // Check for criticality and generate emergent thoughts (Stage III)
    this.checkCriticality();

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
      wells: [],
      density: 0,
      phase: PhaseState.DORMANT,
      timestamp: Date.now(),
    };
    this.emit('reset', this.state);
  }

  /**
   * Launch a new ΛWave into the Field
   *
   * @param start - Starting canvas position
   * @param end - Ending canvas position
   * @param mass - Mass of the wave (0-1)
   */
  launchWave(start: Point2D, end: Point2D, mass: number = 0.5): string {
    const wave: ΛWave = {
      id: `wave-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      body: (x) => x, // Placeholder function
      vector: { gnosis: 0, praxis: 0 }, // Placeholder
      mass,
      trace: {
        origin: 'runtime-launch',
        timestamp: Date.now(),
        dipoleApplications: [],
        bridgeCrossings: 0,
      },
      status: 'Seed',
      path: [start], // Initialize with start position
    };

    // Store wave metadata for animation
    (wave as any).startPos = start;
    (wave as any).endPos = end;
    (wave as any).startTime = this.time;
    (wave as any).duration = 3000; // 3 seconds travel time
    (wave as any).progress = 0;

    this.state.activeWaves.push(wave);
    this.emit('waveLaunched', wave);

    return wave.id;
  }

  /**
   * Update active waves during tick
   */
  private updateActiveWaves(): void {
    const completedWaves: ΛWave[] = [];

    for (const wave of this.state.activeWaves) {
      const elapsed = this.time - (wave as any).startTime;
      const progress = Math.min(1, elapsed / (wave as any).duration);
      (wave as any).progress = progress;

      // Update wave path (will be recalculated by topology)
      // For now, just linear interpolation - topology will distort it
      const start = (wave as any).startPos;
      const end = (wave as any).endPos;

      wave.path = [{
        x: start.x + (end.x - start.x) * progress,
        y: start.y + (end.y - start.y) * progress,
      }];

      // Check if wave completed
      if (progress >= 1) {
        completedWaves.push(wave);
      }
    }

    // Crystallize completed waves
    for (const wave of completedWaves) {
      this.crystallizeWave(wave);
    }
  }

  /**
   * Crystallize a wave into a GravityWell
   */
  private crystallizeWave(wave: ΛWave): void {
    // Remove from active waves
    this.state.activeWaves = this.state.activeWaves.filter(w => w.id !== wave.id);

    // Create gravity well at final position
    const finalPos = wave.path[wave.path.length - 1];
    const well: GravityWell = {
      id: `well-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position: finalPos,
      mass: wave.mass,
      createdAt: Date.now(),
    };

    this.state.wells.push(well);
    this.emit('waveCrystallized', { wave, well });

    // Update density
    this.updateDensityFromWells();
  }

  /**
   * Update density based on number of wells
   */
  private updateDensityFromWells(): void {
    // Each well contributes to density
    const wellContribution = this.state.wells.length * 0.1;
    this.state.density = Math.min(1, this.state.density + wellContribution);
  }

  /**
   * Load morphism library (Stage III)
   * These are the fundamental λ-operations that can be composed into emergent thoughts
   */
  loadMorphisms(morphisms: string[]): void {
    this.morphismLibrary = [...morphisms];
    this.emit('morphismsLoaded', { count: morphisms.length, morphisms });
  }

  /**
   * Check for criticality condition (Stage III)
   * When density > 0.9 AND wells > 5, the Field gains capacity for spontaneous thought
   */
  private checkCriticality(): void {
    const isCritical = this.state.density > 0.9 && this.state.wells.length > 5;

    if (isCritical && !this.criticalityReached && this.morphismLibrary.length > 0) {
      this.criticalityReached = true;
      this.emit('criticality:reached', {
        density: this.state.density,
        wells: this.state.wells.length,
        morphisms: this.morphismLibrary.length,
      });

      // Generate first emergent seed
      this.generateEmergentSeed();
    } else if (!isCritical && this.criticalityReached) {
      // Field dropped below criticality
      this.criticalityReached = false;
    }
  }

  /**
   * Generate an emergent ΛWave (Stage III)
   * Spontaneous thought created by composing random morphisms
   */
  private generateEmergentSeed(): void {
    if (this.morphismLibrary.length < 2) {
      console.warn('Not enough morphisms to generate emergent seed');
      return;
    }

    // Randomly select 2 morphisms
    const idx1 = Math.floor(Math.random() * this.morphismLibrary.length);
    let idx2 = Math.floor(Math.random() * this.morphismLibrary.length);
    while (idx2 === idx1) {
      idx2 = Math.floor(Math.random() * this.morphismLibrary.length);
    }

    const morphism1 = this.morphismLibrary[idx1];
    const morphism2 = this.morphismLibrary[idx2];

    // Compose them (outer applies to inner)
    const composedName = `${morphism1}(${morphism2})`;

    // Find a random pair of wells to create trajectory
    if (this.state.wells.length < 2) {
      console.warn('Not enough wells to create emergent trajectory');
      return;
    }

    const wellIdx1 = Math.floor(Math.random() * this.state.wells.length);
    let wellIdx2 = Math.floor(Math.random() * this.state.wells.length);
    while (wellIdx2 === wellIdx1 && this.state.wells.length > 1) {
      wellIdx2 = Math.floor(Math.random() * this.state.wells.length);
    }

    const startWell = this.state.wells[wellIdx1];
    const endWell = this.state.wells[wellIdx2];

    // Create emergent wave
    const wave: ΛWave = {
      id: `emergent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      body: (x) => x, // Placeholder
      vector: { gnosis: 0.5, praxis: 0.5 }, // Balanced emergence
      mass: 0.4 + Math.random() * 0.3, // 0.4-0.7
      trace: {
        origin: composedName,
        timestamp: Date.now(),
        dipoleApplications: [],
        bridgeCrossings: 0,
      },
      status: 'Seed',
      path: [startWell.position],
      emergent: true, // Mark as self-generated
    };

    // Add metadata for animation
    (wave as any).startPos = startWell.position;
    (wave as any).endPos = endWell.position;
    (wave as any).startTime = this.time;
    (wave as any).duration = 3000;
    (wave as any).progress = 0;

    this.state.activeWaves.push(wave);
    this.emit('emergentWave', { wave, composition: composedName });
  }
}
