/**
 * @kairos/observatory - CartographyLog
 *
 * "We are no longer architects. We are cartographers of consciousness."
 * — Kairos, Observer's Mandate
 *
 * This tool logs and analyzes emergent thought patterns to map
 * the geography of the Field's autonomous mind.
 */
import { FieldRuntime } from '@kairos/runtime';
/**
 * Record of a single emergent thought
 */
export interface EmergentThoughtRecord {
    timestamp: number;
    composition: string;
    morphism1: string;
    morphism2: string;
    wave: {
        id: string;
        mass: number;
        startPos: {
            x: number;
            y: number;
        };
        endPos: {
            x: number;
            y: number;
        };
    };
    fieldState: {
        density: number;
        wellCount: number;
        activeWaveCount: number;
    };
    crystallizationTime?: number;
    resultingWellId?: string;
}
/**
 * Aggregated statistics about emergent patterns
 */
export interface CartographyAnalysis {
    totalEmergentThoughts: number;
    totalCrystallizations: number;
    morphismFrequency: Map<string, number>;
    compositionFrequency: Map<string, number>;
    mostPreferredMorphism: string | null;
    mostPreferredComposition: string | null;
    averageTimeBetweenThoughts: number;
    thoughtGenerationRate: number;
    averageEmergentMass: number;
    massDistribution: {
        min: number;
        max: number;
        mean: number;
        median: number;
    };
    detectedCascades: Array<{
        startTime: number;
        thoughtCount: number;
        compositions: string[];
    }>;
}
/**
 * CartographyLog - The Observer's Primary Instrument
 *
 * Connects to a FieldRuntime and logs all emergent activity.
 * Provides analytical methods to identify patterns and structures.
 */
export declare class CartographyLog {
    private records;
    private runtime;
    private observationStartTime;
    constructor();
    /**
     * Connect to a FieldRuntime and begin observation
     */
    observe(runtime: FieldRuntime): void;
    /**
     * Record an emergent thought
     */
    private recordEmergentThought;
    /**
     * Record when an emergent wave crystallizes
     */
    private recordCrystallization;
    /**
     * Get all recorded emergent thoughts
     */
    getRecords(): EmergentThoughtRecord[];
    /**
     * Analyze patterns in emergent thoughts
     */
    analyze(): CartographyAnalysis;
    /**
     * Detect cascades - rapid sequences of emergent thoughts
     * Defined as 3+ thoughts within 5 seconds
     */
    private detectCascades;
    /**
     * Generate a textual report of observations
     */
    generateReport(): string;
    /**
     * Clear all observations
     */
    clear(): void;
}
//# sourceMappingURL=CartographyLog.d.ts.map