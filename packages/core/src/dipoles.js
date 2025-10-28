/**
 * @kairos/core - Dipole Operators
 *
 * "The dynamics of the system are driven by fundamental operators—the Dipoles.
 * They are not functions that a user calls directly.
 * They are the 'laws of physics' of the Field."
 * — Kairos Calculus
 */
/**
 * Calculate distance from vector to Truth geodesic (x=y line)
 */
function distanceToTruth(vector) {
    return Math.abs(vector.gnosis - vector.praxis) / Math.sqrt(2);
}
/**
 * Calculate mass based on proximity to Truth axis
 * Closer to x=y → higher mass → stronger gravity well when crystallized
 */
export function calculateMass(vector) {
    const distance = distanceToTruth(vector);
    // Inverse relationship: distance 0 → mass 1, distance ∞ → mass 0
    return 1 / (1 + distance);
}
/**
 * Calculate distance to Bridge singularity (0,0)
 */
function distanceToBridge(vector) {
    return Math.sqrt(vector.gnosis ** 2 + vector.praxis ** 2);
}
/**
 * δ_decompose: Breaks down, moves toward (0,0)
 * Acts in Deconstruction quadrant (-X, -Y)
 */
export function δ_decompose(wave, field) {
    const vectorBefore = wave.vector;
    const massBefore = wave.mass;
    // Move 10% closer to origin
    const newVector = {
        gnosis: wave.vector.gnosis * 0.9,
        praxis: wave.vector.praxis * 0.9,
    };
    const newMass = calculateMass(newVector);
    // Check if entering Bridge
    const inBridge = distanceToBridge(newVector) < 0.1;
    const application = {
        dipole: 'δ_decompose',
        timestamp: Date.now(),
        vectorBefore,
        vectorAfter: newVector,
        massBefore,
        massAfter: newMass,
    };
    return {
        ...wave,
        vector: newVector,
        mass: newMass,
        status: inBridge ? 'InBridge' : 'Deconstructing',
        trace: {
            ...wave.trace,
            dipoleApplications: [...wave.trace.dipoleApplications, application],
        },
    };
}
/**
 * δ_forget: Simplifies trace, reduces complexity
 */
export function δ_forget(wave, field) {
    const vectorBefore = wave.vector;
    const massBefore = wave.mass;
    // Simplify by reducing mass slightly
    const newMass = wave.mass * 0.95;
    const application = {
        dipole: 'δ_forget',
        timestamp: Date.now(),
        vectorBefore,
        vectorAfter: wave.vector,
        massBefore,
        massAfter: newMass,
    };
    return {
        ...wave,
        mass: newMass,
        trace: {
            ...wave.trace,
            dipoleApplications: [...wave.trace.dipoleApplications, application],
        },
    };
}
/**
 * δ_compose: Integrates, moves away from (0,0)
 * Acts in Synthesis quadrant (+X, +Y)
 */
export function δ_compose(wave, field) {
    const vectorBefore = wave.vector;
    const massBefore = wave.mass;
    // Move away from origin, toward synthesis
    // Try to stay close to x=y (Truth) to maximize mass
    const distance = distanceToBridge(wave.vector);
    const newDistance = distance + 0.5;
    // Project onto line that maintains distance to x=y
    const currentDistToTruth = distanceToTruth(wave.vector);
    const angle = Math.PI / 4; // 45° (toward x=y)
    const newVector = {
        gnosis: newDistance * Math.sin(angle),
        praxis: newDistance * Math.cos(angle),
    };
    const newMass = calculateMass(newVector);
    const application = {
        dipole: 'δ_compose',
        timestamp: Date.now(),
        vectorBefore,
        vectorAfter: newVector,
        massBefore,
        massAfter: newMass,
    };
    return {
        ...wave,
        vector: newVector,
        mass: newMass,
        status: 'Synthesizing',
        trace: {
            ...wave.trace,
            dipoleApplications: [...wave.trace.dipoleApplications, application],
        },
    };
}
/**
 * δ_memoize: Enriches trace, prepares for crystallization
 */
export function δ_memoize(wave, field) {
    const vectorBefore = wave.vector;
    const massBefore = wave.mass;
    // Increase mass by enriching the trace
    const newMass = Math.min(1, wave.mass * 1.1);
    const application = {
        dipole: 'δ_memoize',
        timestamp: Date.now(),
        vectorBefore,
        vectorAfter: wave.vector,
        massBefore,
        massAfter: newMass,
    };
    return {
        ...wave,
        mass: newMass,
        trace: {
            ...wave.trace,
            dipoleApplications: [...wave.trace.dipoleApplications, application],
        },
    };
}
//# sourceMappingURL=dipoles.js.map