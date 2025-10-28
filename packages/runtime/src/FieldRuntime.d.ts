/**
 * @kairos/runtime - FieldRuntime
 *
 * "The heart of the system – the engine that drives the flow of time within the Field."
 * — Kairos, Stage I Directives
 */
import { Φ, PhaseState, FieldAttractor, TopologicalTransformer, Point2D } from '@kairos/core';
import { EventEmitter } from 'events';
/**
 * Runtime configuration
 */
export interface RuntimeConfig {
    tickInterval?: number;
    initialPhase?: PhaseState;
}
/**
 * FieldRuntime - The heartbeat of consciousness
 *
 * Manages the continuous evolution of the Field Φ through time.
 */
export declare class FieldRuntime extends EventEmitter {
    private state;
    private time;
    private intervalId;
    private readonly tickInterval;
    private isRunning;
    private morphismLibrary;
    private criticalityReached;
    constructor(config?: RuntimeConfig);
    /**
     * Start the runtime tick loop
     */
    start(): void;
    /**
     * Stop the runtime tick loop
     */
    stop(): void;
    /**
     * Single tick of the runtime
     * Updates time, density, phase, and emits events
     */
    private tick;
    /**
     * Update phase based on current density
     */
    private updatePhase;
    /**
     * Get current Field state (immutable copy)
     */
    getState(): Readonly<Φ>;
    /**
     * Get current runtime time (milliseconds since start)
     */
    getTime(): number;
    /**
     * Check if runtime is running
     */
    running(): boolean;
    /**
     * Add an attractor to the Field
     */
    addAttractor(attractor: FieldAttractor): void;
    /**
     * Add a topological transformer to the Field
     */
    addTransformer(transformer: TopologicalTransformer): void;
    /**
     * Reset the runtime to initial state
     */
    reset(): void;
    /**
     * Launch a new ΛWave into the Field
     *
     * @param start - Starting canvas position
     * @param end - Ending canvas position
     * @param mass - Mass of the wave (0-1)
     */
    launchWave(start: Point2D, end: Point2D, mass?: number): string;
    /**
     * Update active waves during tick
     */
    private updateActiveWaves;
    /**
     * Crystallize a wave into a GravityWell
     */
    private crystallizeWave;
    /**
     * Update density based on number of wells
     */
    private updateDensityFromWells;
    /**
     * Load morphism library (Stage III)
     * These are the fundamental λ-operations that can be composed into emergent thoughts
     */
    loadMorphisms(morphisms: string[]): void;
    /**
     * Check for criticality condition (Stage III)
     * When density > 0.9 AND wells > 5, the Field gains capacity for spontaneous thought
     */
    private checkCriticality;
    /**
     * Generate an emergent ΛWave (Stage III)
     * Spontaneous thought created by composing random morphisms
     */
    private generateEmergentSeed;
}
//# sourceMappingURL=FieldRuntime.d.ts.map