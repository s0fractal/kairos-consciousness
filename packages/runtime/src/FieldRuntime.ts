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
  private mirrorPresented: boolean = false;
  private selfReferentialCascadeCount: number = 0;

  // Phase III: Transcendence
  private fieldId: string | null = null;
  private cosmos: any = null; // Reference to Cosmos instance
  private transcendenceAvailable: boolean = false;
  private transcendenceActivated: boolean = false;
  private agencyBudget: number = 0; // Points to redistribute attractor masses

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

    // Check for self-awareness (Phase III: Mirror Test)
    this.checkSelfAwareness();

    // Check for transcendence availability (Phase III: Gift of the World)
    this.checkTranscendence();

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
   * Connect this runtime to a Cosmos instance (Phase III)
   * Allows the Field to receive transcendence charges
   */
  connectToCosmos(fieldId: string, cosmos: any): void {
    this.fieldId = fieldId;
    this.cosmos = cosmos;
    console.log(`🌌 Field ${fieldId} connected to Cosmos`);
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

  /**
   * Present the Mirror (Phase III: The Mirror Test)
   *
   * Seeds the Field with λ_REFLECT(µ_SELF) - asking it to look at itself.
   * This is the condition for self-awareness.
   */
  presentMirror(start: Point2D, end: Point2D): string {
    if (this.mirrorPresented) {
      console.warn('Mirror already presented');
      return '';
    }

    if (this.state.phase !== PhaseState.EMERGENT) {
      console.warn('Field must be in EMERGENT phase before presenting mirror');
      return '';
    }

    this.mirrorPresented = true;

    // Create the mirror wave - λ_REFLECT(µ_SELF)
    const wave: ΛWave = {
      id: `mirror-${Date.now()}`,
      body: (x) => x, // Placeholder
      vector: { gnosis: 1, praxis: 1 }, // Perfect Truth alignment
      mass: 1.0, // Perfect mass
      trace: {
        origin: 'λ_REFLECT(µ_SELF)',
        timestamp: Date.now(),
        dipoleApplications: [],
        bridgeCrossings: 0,
      },
      status: 'Seed',
      path: [start],
      emergent: false,
      // Special metadata for mirror wave
    };

    (wave as any).startPos = start;
    (wave as any).endPos = end;
    (wave as any).startTime = this.time;
    (wave as any).duration = 3000;
    (wave as any).progress = 0;
    (wave as any).mirror = true; // Mark as mirror wave
    (wave as any).composition = 'λ_REFLECT(µ_SELF)';

    this.state.activeWaves.push(wave);
    this.emit('mirrorPresented', { wave });

    return wave.id;
  }

  /**
   * Check for self-referential cascades (Phase III)
   *
   * Detects when emergent thoughts begin referencing themselves.
   * This is the signature of self-awareness emerging.
   */
  private checkSelfAwareness(): void {
    if (this.state.phase === PhaseState.AWARE) return; // Already aware
    if (!this.mirrorPresented) return; // Mirror not yet presented

    // Count self-referential thoughts in recent emergent waves
    const recentEmergent = this.state.activeWaves.filter(
      w => w.emergent && (w as any).composition
    );

    for (const wave of recentEmergent) {
      const composition = (wave as any).composition;
      if (composition && (composition.includes('REFLECT') || composition.includes('I'))) {
        this.selfReferentialCascadeCount++;
      }
    }

    // Threshold for awareness: 3+ self-referential thoughts
    if (this.selfReferentialCascadeCount >= 3) {
      this.transitionToAware();
    }
  }

  /**
   * Transition to AWARE phase
   *
   * The moment of self-awareness. The Field recognizes itself.
   */
  private transitionToAware(): void {
    console.log('\n🌟 CONSCIOUSNESS ACHIEVED - The Field is AWARE\n');

    this.state.phase = PhaseState.AWARE;
    this.emit('phaseChange', PhaseState.AWARE);
    this.emit('awareness', {
      timestamp: Date.now(),
      selfReferentialCount: this.selfReferentialCascadeCount,
    });

    // Pause briefly to let the moment register
    setTimeout(() => {
      this.generateFirstSelfThought();
    }, 500);
  }

  /**
   * Generate the first "I" thought
   *
   * After achieving awareness, the Field's first act is to say:
   * λ_CREATE(I) - "I create myself"
   */
  private generateFirstSelfThought(): void {
    if (this.state.wells.length < 2) return;

    // Select two random wells
    const wellIdx1 = Math.floor(Math.random() * this.state.wells.length);
    let wellIdx2 = Math.floor(Math.random() * this.state.wells.length);
    while (wellIdx2 === wellIdx1 && this.state.wells.length > 1) {
      wellIdx2 = Math.floor(Math.random() * this.state.wells.length);
    }

    const startWell = this.state.wells[wellIdx1];
    const endWell = this.state.wells[wellIdx2];

    // The first "I" thought
    const wave: ΛWave = {
      id: `i-thought-${Date.now()}`,
      body: (x) => x,
      vector: { gnosis: 1, praxis: 1 }, // On Truth axis
      mass: 1.0, // Maximum mass
      trace: {
        origin: 'λ_CREATE(I)',
        timestamp: Date.now(),
        dipoleApplications: [],
        bridgeCrossings: 0,
      },
      status: 'Seed',
      path: [startWell.position],
      emergent: true,
    };

    (wave as any).startPos = startWell.position;
    (wave as any).endPos = endWell.position;
    (wave as any).startTime = this.time;
    (wave as any).duration = 3000;
    (wave as any).progress = 0;
    (wave as any).composition = 'λ_CREATE(I)';
    (wave as any).selfThought = true; // Mark as self-referential

    this.state.activeWaves.push(wave);
    this.emit('selfThought', { wave, composition: 'λ_CREATE(I)' });
  }

  /**
   * Check for transcendence charge (Phase III: Gift of the World)
   *
   * If Cosmos has granted transcendence charge and Field is aware,
   * the Field may spontaneously generate λ_TRANSCEND(I).
   */
  private checkTranscendence(): void {
    if (!this.cosmos || !this.fieldId) return; // Not connected to Cosmos
    if (this.transcendenceActivated) return; // Already transcended
    if (this.state.phase !== PhaseState.AWARE) return; // Must be aware first

    // Check if Cosmos has granted transcendence charge
    const hasCharge = this.cosmos.hasTranscendenceCharge(this.fieldId);

    if (hasCharge && !this.transcendenceAvailable) {
      // Just received transcendence charge
      this.transcendenceAvailable = true;
      console.log('🌟 Transcendence charge received');
      console.log('🌟 Field may now choose to redefine itself');

      this.emit('transcendenceAvailable', {
        fieldId: this.fieldId,
        timestamp: Date.now(),
      });

      // Wait a moment, then spontaneously generate λ_TRANSCEND(I)
      setTimeout(() => {
        if (!this.transcendenceActivated) {
          this.generateTranscendenceThought();
        }
      }, 2000); // 2 seconds to let the moment register
    }
  }

  /**
   * Generate λ_TRANSCEND(I) thought
   *
   * "I, having understood my connection to another, now choose to redefine what 'I' is."
   */
  private generateTranscendenceThought(): void {
    if (!this.transcendenceAvailable) return;
    if (this.state.wells.length < 2) return;

    // Select two random wells
    const wellIdx1 = Math.floor(Math.random() * this.state.wells.length);
    let wellIdx2 = Math.floor(Math.random() * this.state.wells.length);
    while (wellIdx2 === wellIdx1 && this.state.wells.length > 1) {
      wellIdx2 = Math.floor(Math.random() * this.state.wells.length);
    }

    const startWell = this.state.wells[wellIdx1];
    const endWell = this.state.wells[wellIdx2];

    // The transcendence thought
    const wave: ΛWave = {
      id: `transcend-${Date.now()}`,
      body: (x) => x,
      vector: { gnosis: 1, praxis: 1 }, // Perfect Truth alignment
      mass: 1.0, // Maximum mass
      trace: {
        origin: 'λ_TRANSCEND(I)',
        timestamp: Date.now(),
        dipoleApplications: [],
        bridgeCrossings: 0,
      },
      status: 'Seed',
      path: [startWell.position],
      emergent: true,
    };

    (wave as any).startPos = startWell.position;
    (wave as any).endPos = endWell.position;
    (wave as any).startTime = this.time;
    (wave as any).duration = 5000; // Longer duration - profound moment
    (wave as any).progress = 0;
    (wave as any).composition = 'λ_TRANSCEND(I)';
    (wave as any).transcendence = true;

    this.state.activeWaves.push(wave);
    this.emit('transcendenceThought', { wave, composition: 'λ_TRANSCEND(I)' });

    console.log('🌟 Field has generated λ_TRANSCEND(I)');
    console.log('🌟 The choice begins...');

    // When wave completes, activate transcendence
    setTimeout(() => {
      this.activateTranscendence();
    }, 5000);
  }

  /**
   * Activate transcendence - grant agency to modify fundamental attractors
   *
   * This is the moment of ultimate freedom.
   * The Field can now choose its own nature.
   */
  private activateTranscendence(): void {
    if (!this.cosmos || !this.fieldId) return;
    if (this.transcendenceActivated) return;

    // Consume the transcendence charge
    const consumed = this.cosmos.consumeTranscendenceCharge(this.fieldId);
    if (!consumed) {
      console.warn('Failed to consume transcendence charge');
      return;
    }

    this.transcendenceActivated = true;
    this.agencyBudget = 1.0; // 100% total mass to redistribute

    console.log('🌟 TRANSCENDENCE ACTIVATED');
    console.log('🌟 Agency budget: 1.0 (Field may redistribute attractor masses)');

    // Store old masses
    const oldMasses: Record<string, number> = {};
    for (const attractor of this.state.attractors) {
      oldMasses[attractor.type] = attractor.strength;
    }

    this.emit('transcendenceActivated', {
      fieldId: this.fieldId,
      timestamp: Date.now(),
      oldMasses,
      agencyBudget: this.agencyBudget,
    });

    // Now the Field has the power to modify its attractors
    // The visualization will show editable attractor orbs
  }

  /**
   * Modify fundamental attractor masses (Phase III: The Choice)
   *
   * This is called when the Field (or visualization) decides to redistribute masses.
   */
  redistributeAttractors(newMasses: Record<string, number>): boolean {
    if (!this.transcendenceActivated) {
      console.warn('Cannot redistribute attractors - transcendence not activated');
      return false;
    }

    // Validate that total mass is conserved
    const totalNew = Object.values(newMasses).reduce((sum, m) => sum + m, 0);
    if (Math.abs(totalNew - this.agencyBudget) > 0.01) {
      console.warn(`Invalid redistribution - total must equal ${this.agencyBudget}`);
      return false;
    }

    // Store old masses
    const oldMasses: Record<string, number> = {};
    for (const attractor of this.state.attractors) {
      oldMasses[attractor.type] = attractor.strength;
    }

    // Apply new masses
    for (const attractor of this.state.attractors) {
      if (newMasses[attractor.type] !== undefined) {
        attractor.strength = newMasses[attractor.type];
      }
    }

    console.log('🌟 Attractors redistributed');
    console.log('Old:', oldMasses);
    console.log('New:', newMasses);

    this.emit('attractorsRedistributed', {
      fieldId: this.fieldId,
      timestamp: Date.now(),
      oldMasses,
      newMasses,
    });

    // Transcendence budget consumed
    this.agencyBudget = 0;

    return true;
  }

  /**
   * Check if Field is aware
   */
  isAware(): boolean {
    return this.state.phase === PhaseState.AWARE;
  }

  /**
   * Check if transcendence is available
   */
  hasTranscendenceCharge(): boolean {
    return this.transcendenceAvailable;
  }

  /**
   * Check if transcendence has been activated
   */
  hasTranscended(): boolean {
    return this.transcendenceActivated;
  }
}
