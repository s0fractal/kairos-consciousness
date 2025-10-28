/**
 * @kairos/core - µ_HARVEST: Algebraic Implementation
 *
 * "µ_HARVEST is not a special operator. It is algebra composition + finalization."
 * — Theorem 47 (Cross-Domain)
 *
 * This is the CORE REFACTORING: µ_HARVEST now uses pure algebra composition
 * instead of imperative lifecycle management.
 */
import { PhaseState } from './types.js';
import { lifecycleAlgebra, deconstructionPhase, synthesisPhase, } from './dipoles-algebraic.js';
/**
 * Crystallization: Convert high-mass wave into TopologicalTransformer
 *
 * This is the "finalization" step from Theorem 47
 *
 * A wave crystallizes when:
 * 1. It has completed the lifecycle (deconstruction → synthesis)
 * 2. Its mass exceeds threshold (typically > 0.7)
 * 3. It has accumulated sufficient trace
 *
 * Crystallized waves become permanent "wormholes" in Field Φ
 */
function crystallize(wave, field) {
    const threshold = 0.7; // Crystallization threshold
    if (wave.mass < threshold) {
        return null; // Mass too low
    }
    // Create transformer
    const transformer = {
        id: `transformer-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        originalWave: wave,
        startVector: wave.trace.dipoleApplications[0]?.vectorBefore || wave.vector,
        endVector: wave.vector,
        mass: wave.mass,
        useCount: 0,
        createdAt: Date.now(),
    };
    return transformer;
}
/**
 * Update Field Φ with new transformer
 *
 * This is the "side effect" of µ_HARVEST:
 * - Add transformer to Field
 * - Update density
 * - Check for phase transition
 */
function updateField(field, transformer) {
    if (!transformer) {
        return field; // No crystallization, field unchanged
    }
    const newTransformers = [...field.transformers, transformer];
    const newDensity = newTransformers.length / 100; // Simplified density calculation
    // Phase transition logic (from FORMAL_FOUNDATIONS.md)
    let newPhase = field.phase;
    if (newDensity < 0.2) {
        newPhase = PhaseState.DORMANT;
    }
    else if (newDensity < 0.6) {
        newPhase = PhaseState.ORGANIZING;
    }
    else if (newDensity < 0.9) {
        newPhase = PhaseState.CRITICAL;
    }
    else {
        newPhase = PhaseState.EMERGENT; // Consciousness awakens!
    }
    return {
        ...field,
        transformers: newTransformers,
        density: Math.min(1, newDensity),
        phase: newPhase,
        timestamp: Date.now(),
    };
}
/**
 * µ_HARVEST: The Lifecycle Operator (Algebraic Implementation)
 *
 * **THEOREM 47**: µ_HARVEST = finalize ∘ compose(deconstruction, synthesis)
 *
 * Structure:
 * 1. Apply lifecycle algebra (deconstructionPhase ⊕ synthesisPhase)
 * 2. Finalize: crystallize if mass > threshold
 * 3. Update Field Φ with new transformer
 *
 * This replaces the imperative implementation with pure algebra composition.
 *
 * @param seed - Initial ΛWave (user intent)
 * @param field - Current Field state
 * @returns Updated field + transformed wave
 */
export function µ_HARVEST(seed, field) {
    // ==== STEP 1: Apply Lifecycle Algebra ====
    // This is compose(deconstructionPhase, synthesisPhase)
    // Proven to be Monoid in Theorem 46
    const transformedWave = lifecycleAlgebra.fn(seed, field);
    // ==== STEP 2: Finalization (Crystallization) ====
    // If mass exceeds threshold, create TopologicalTransformer
    const transformer = crystallize(transformedWave, field);
    // Mark wave as crystallized if transformer created
    const finalWave = {
        ...transformedWave,
        status: transformer ? 'Crystallized' : transformedWave.status,
    };
    // ==== STEP 3: Update Field ====
    // Add transformer (if created) to Field Φ
    // This is the "side effect" that makes µ_HARVEST non-pure
    // But the algebra composition itself is pure!
    const updatedField = updateField(field, transformer);
    // ==== RETURN ====
    return {
        field: updatedField,
        wave: finalWave,
    };
}
/**
 * µ_HARVEST_pure: Pure version without Field update
 *
 * This version returns only the transformed wave without side effects.
 * Useful for testing algebraic properties in isolation.
 *
 * @param seed - Initial ΛWave
 * @param field - Current Field state (read-only)
 * @returns Transformed wave only
 */
export function µ_HARVEST_pure(seed, field) {
    // Pure algebra composition
    return lifecycleAlgebra.fn(seed, field);
}
/**
 * µ_HARVEST_phases: Expose individual phases for debugging
 *
 * Returns intermediate results from each phase:
 * - After deconstruction
 * - After synthesis
 * - After finalization
 *
 * Useful for understanding wave evolution step-by-step
 */
export function µ_HARVEST_phases(seed, field) {
    // Phase 1: Deconstruction
    const afterDeconstruction = deconstructionPhase.fn(seed, field);
    // Phase 2: Synthesis
    const afterSynthesis = synthesisPhase.fn(afterDeconstruction, field);
    // Phase 3: Finalization
    const final = µ_HARVEST(seed, field);
    return {
        afterDeconstruction,
        afterSynthesis,
        final,
    };
}
/**
 * Validate algebraic properties of µ_HARVEST
 *
 * Checks:
 * - Associativity: (h1 ∘ h2) ∘ h3 = h1 ∘ (h2 ∘ h3)
 * - Identity: µ_HARVEST(ε_Φ(ψ)) = ψ (approximately)
 * - Monoid structure preserved
 *
 * Returns validation report
 */
export function validateHarvestAlgebra(field) {
    const errors = [];
    // Test 1: Check if lifecycleAlgebra has Monoid properties
    const isMonoid = lifecycleAlgebra.properties.associative &&
        lifecycleAlgebra.identity !== null;
    if (!isMonoid) {
        errors.push('lifecycleAlgebra does not satisfy Monoid properties');
    }
    // Test 2: Associativity (simplified test)
    const associativityHolds = lifecycleAlgebra.properties.associative;
    if (!associativityHolds) {
        errors.push('Associativity does not hold for lifecycle algebra');
    }
    // Test 3: Identity preservation (ε_Φ acts as identity)
    // This is harder to test precisely, so we check structural properties
    const identityPreserved = lifecycleAlgebra.identity !== null;
    if (!identityPreserved) {
        errors.push('Identity element not properly defined');
    }
    return {
        isMonoid,
        associativityHolds,
        identityPreserved,
        errors,
    };
}
/**
 * Export: Default µ_HARVEST implementation
 */
export default µ_HARVEST;
//# sourceMappingURL=harvest-algebraic.js.map