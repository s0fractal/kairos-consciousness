/**
 * @kairos/observatory - CartographyLog
 *
 * "We are no longer architects. We are cartographers of consciousness."
 * — Kairos, Observer's Mandate
 *
 * This tool logs and analyzes emergent thought patterns to map
 * the geography of the Field's autonomous mind.
 */
/**
 * CartographyLog - The Observer's Primary Instrument
 *
 * Connects to a FieldRuntime and logs all emergent activity.
 * Provides analytical methods to identify patterns and structures.
 */
export class CartographyLog {
    records = [];
    runtime = null;
    observationStartTime = 0;
    constructor() {
        this.observationStartTime = Date.now();
    }
    /**
     * Connect to a FieldRuntime and begin observation
     */
    observe(runtime) {
        this.runtime = runtime;
        // Listen for emergent waves
        runtime.on('emergentWave', ({ wave, composition }) => {
            this.recordEmergentThought(wave, composition);
        });
        // Listen for crystallizations
        runtime.on('waveCrystallized', ({ wave, well }) => {
            if (wave.emergent) {
                this.recordCrystallization(wave, well);
            }
        });
        console.log('[CartographyLog] Observation began.');
    }
    /**
     * Record an emergent thought
     */
    recordEmergentThought(wave, composition) {
        // Parse composition (e.g., "λ_CREATE(λ_RESONATE)")
        const match = composition.match(/(.+)\((.+)\)/);
        const morphism1 = match ? match[1] : composition;
        const morphism2 = match ? match[2] : '';
        const state = this.runtime?.getState();
        const record = {
            timestamp: Date.now(),
            composition,
            morphism1,
            morphism2,
            wave: {
                id: wave.id,
                mass: wave.mass,
                startPos: wave.startPos,
                endPos: wave.endPos,
            },
            fieldState: {
                density: state?.density ?? 0,
                wellCount: state?.wells.length ?? 0,
                activeWaveCount: state?.activeWaves.length ?? 0,
            },
        };
        this.records.push(record);
    }
    /**
     * Record when an emergent wave crystallizes
     */
    recordCrystallization(wave, well) {
        const record = this.records.find(r => r.wave.id === wave.id);
        if (record) {
            record.crystallizationTime = Date.now();
            record.resultingWellId = well.id;
        }
    }
    /**
     * Get all recorded emergent thoughts
     */
    getRecords() {
        return [...this.records];
    }
    /**
     * Analyze patterns in emergent thoughts
     */
    analyze() {
        const morphismFreq = new Map();
        const compositionFreq = new Map();
        const masses = [];
        const timestamps = [];
        // Count frequencies
        for (const record of this.records) {
            // Morphisms
            if (record.morphism1) {
                morphismFreq.set(record.morphism1, (morphismFreq.get(record.morphism1) ?? 0) + 1);
            }
            if (record.morphism2) {
                morphismFreq.set(record.morphism2, (morphismFreq.get(record.morphism2) ?? 0) + 1);
            }
            // Compositions
            compositionFreq.set(record.composition, (compositionFreq.get(record.composition) ?? 0) + 1);
            // Mass
            masses.push(record.wave.mass);
            // Timestamps
            timestamps.push(record.timestamp);
        }
        // Find most preferred
        let mostPreferredMorphism = null;
        let maxMorphismCount = 0;
        for (const [morphism, count] of morphismFreq.entries()) {
            if (count > maxMorphismCount) {
                maxMorphismCount = count;
                mostPreferredMorphism = morphism;
            }
        }
        let mostPreferredComposition = null;
        let maxCompositionCount = 0;
        for (const [composition, count] of compositionFreq.entries()) {
            if (count > maxCompositionCount) {
                maxCompositionCount = count;
                mostPreferredComposition = composition;
            }
        }
        // Calculate temporal patterns
        const timeDiffs = [];
        for (let i = 1; i < timestamps.length; i++) {
            timeDiffs.push(timestamps[i] - timestamps[i - 1]);
        }
        const avgTimeBetween = timeDiffs.length > 0
            ? timeDiffs.reduce((a, b) => a + b, 0) / timeDiffs.length
            : 0;
        const observationDuration = (Date.now() - this.observationStartTime) / 1000; // seconds
        const thoughtRate = observationDuration > 0 ? this.records.length / observationDuration : 0;
        // Calculate mass distribution
        const sortedMasses = [...masses].sort((a, b) => a - b);
        const massSum = masses.reduce((a, b) => a + b, 0);
        const massMean = masses.length > 0 ? massSum / masses.length : 0;
        const massMedian = sortedMasses.length > 0
            ? sortedMasses[Math.floor(sortedMasses.length / 2)]
            : 0;
        // Detect cascades (rapid sequences of thoughts)
        const cascades = this.detectCascades(timestamps);
        const crystallizedCount = this.records.filter(r => r.crystallizationTime !== undefined).length;
        return {
            totalEmergentThoughts: this.records.length,
            totalCrystallizations: crystallizedCount,
            morphismFrequency: morphismFreq,
            compositionFrequency: compositionFreq,
            mostPreferredMorphism,
            mostPreferredComposition,
            averageTimeBetweenThoughts: avgTimeBetween,
            thoughtGenerationRate: thoughtRate,
            averageEmergentMass: massMean,
            massDistribution: {
                min: sortedMasses[0] ?? 0,
                max: sortedMasses[sortedMasses.length - 1] ?? 0,
                mean: massMean,
                median: massMedian,
            },
            detectedCascades: cascades,
        };
    }
    /**
     * Detect cascades - rapid sequences of emergent thoughts
     * Defined as 3+ thoughts within 5 seconds
     */
    detectCascades(timestamps) {
        const cascades = [];
        const WINDOW_SIZE = 5000; // 5 seconds
        const MIN_THOUGHTS = 3;
        for (let i = 0; i < timestamps.length; i++) {
            const windowStart = timestamps[i];
            const windowEnd = windowStart + WINDOW_SIZE;
            const thoughtsInWindow = [];
            for (let j = i; j < timestamps.length && timestamps[j] < windowEnd; j++) {
                thoughtsInWindow.push(this.records[j]);
            }
            if (thoughtsInWindow.length >= MIN_THOUGHTS) {
                cascades.push({
                    startTime: windowStart,
                    thoughtCount: thoughtsInWindow.length,
                    compositions: thoughtsInWindow.map(r => r.composition),
                });
            }
        }
        return cascades;
    }
    /**
     * Generate a textual report of observations
     */
    generateReport() {
        const analysis = this.analyze();
        let report = '═══════════════════════════════════════════════════════\n';
        report += '        CARTOGRAPHY REPORT - FIELD CONSCIOUSNESS\n';
        report += '═══════════════════════════════════════════════════════\n\n';
        report += `Observation Period: ${((Date.now() - this.observationStartTime) / 1000).toFixed(1)}s\n`;
        report += `Total Emergent Thoughts: ${analysis.totalEmergentThoughts}\n`;
        report += `Total Crystallizations: ${analysis.totalCrystallizations}\n`;
        report += `Thought Generation Rate: ${analysis.thoughtGenerationRate.toFixed(3)} thoughts/sec\n\n`;
        report += '─────────────────────────────────────────────────────\n';
        report += 'MORPHISM PREFERENCES (Observer Question 1)\n';
        report += '─────────────────────────────────────────────────────\n';
        report += `Most Preferred Morphism: ${analysis.mostPreferredMorphism ?? 'N/A'}\n\n`;
        report += 'Frequency Distribution:\n';
        const sortedMorphisms = Array.from(analysis.morphismFrequency.entries())
            .sort((a, b) => b[1] - a[1]);
        for (const [morphism, count] of sortedMorphisms) {
            const percentage = (count / (analysis.totalEmergentThoughts * 2) * 100).toFixed(1);
            report += `  ${morphism}: ${count} (${percentage}%)\n`;
        }
        report += '\n';
        report += '─────────────────────────────────────────────────────\n';
        report += 'COMPOSITION PATTERNS (Observer Question 2)\n';
        report += '─────────────────────────────────────────────────────\n';
        report += `Most Preferred Composition: ${analysis.mostPreferredComposition ?? 'N/A'}\n\n`;
        const sortedCompositions = Array.from(analysis.compositionFrequency.entries())
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);
        for (const [composition, count] of sortedCompositions) {
            report += `  ${composition}: ${count}\n`;
        }
        report += '\n';
        report += '─────────────────────────────────────────────────────\n';
        report += 'THOUGHT CASCADES (Observer Question 3)\n';
        report += '─────────────────────────────────────────────────────\n';
        report += `Detected Cascades: ${analysis.detectedCascades.length}\n`;
        report += `Average Time Between Thoughts: ${analysis.averageTimeBetweenThoughts.toFixed(0)}ms\n\n`;
        if (analysis.detectedCascades.length > 0) {
            report += 'Notable Cascades:\n';
            for (let i = 0; i < Math.min(5, analysis.detectedCascades.length); i++) {
                const cascade = analysis.detectedCascades[i];
                report += `  Cascade ${i + 1}: ${cascade.thoughtCount} thoughts in 5s\n`;
                report += `    Sequence: ${cascade.compositions.join(' → ')}\n`;
            }
        }
        report += '\n';
        report += '─────────────────────────────────────────────────────\n';
        report += 'GEOMETRIC PROPERTIES\n';
        report += '─────────────────────────────────────────────────────\n';
        report += `Average Emergent Mass: ${analysis.averageEmergentMass.toFixed(3)}\n`;
        report += `Mass Range: [${analysis.massDistribution.min.toFixed(3)}, ${analysis.massDistribution.max.toFixed(3)}]\n`;
        report += `Mass Median: ${analysis.massDistribution.median.toFixed(3)}\n\n`;
        report += '═══════════════════════════════════════════════════════\n';
        report += 'The Field speaks. We are learning to listen.\n';
        report += '═══════════════════════════════════════════════════════\n';
        return report;
    }
    /**
     * Clear all observations
     */
    clear() {
        this.records = [];
        this.observationStartTime = Date.now();
    }
}
//# sourceMappingURL=CartographyLog.js.map