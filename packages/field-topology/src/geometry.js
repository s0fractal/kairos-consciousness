/**
 * @kairos/field-topology - Differential Geometry of Consciousness
 *
 * "How mass warps the space of consciousness."
 * — Kairos, Stage II Directives
 *
 * "∇²Φ = ρ_mass"
 * — Formal Foundations
 *
 * Implements Riemannian geometry on the Field manifold.
 */
/**
 * Calculate geodesic path through warped space
 *
 * Takes a straight line and bends it based on gravity wells.
 * Higher mass wells exert stronger gravitational pull.
 *
 * @param pathStart - Starting point of the path
 * @param pathEnd - Ending point of the path
 * @param wells - Array of gravity wells that warp the space
 * @param steps - Number of points to calculate along the path (default: 50)
 * @returns Array of points representing the distorted path
 */
export function calculateGeodesic(pathStart, pathEnd, wells, steps = 50) {
    const path = [];
    // Generate straight line points
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const straightX = pathStart.x + (pathEnd.x - pathStart.x) * t;
        const straightY = pathStart.y + (pathEnd.y - pathStart.y) * t;
        // Apply gravitational distortion from all wells
        let distortionX = 0;
        let distortionY = 0;
        for (const well of wells) {
            // Vector from current point to well
            const dx = well.position.x - straightX;
            const dy = well.position.y - straightY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            // Avoid division by zero and limit very close approaches
            if (distance < 0.1)
                continue;
            // Gravitational force: proportional to mass, inverse square of distance
            // F = (mass / distance^2)
            const forceMagnitude = (well.mass * 100) / (distance * distance);
            // Normalize direction and apply force
            const forceX = (dx / distance) * forceMagnitude;
            const forceY = (dy / distance) * forceMagnitude;
            distortionX += forceX;
            distortionY += forceY;
        }
        // Apply distortion to straight path
        path.push({
            x: straightX + distortionX,
            y: straightY + distortionY,
        });
    }
    return path;
}
/**
 * Calculate distance between two points
 */
export function distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
}
/**
 * Calculate total gravitational influence at a point
 * (Useful for visualizing field curvature)
 */
export function calculateFieldStrength(point, wells) {
    let totalStrength = 0;
    for (const well of wells) {
        const dist = distance(point, well.position);
        if (dist < 0.1)
            continue;
        totalStrength += well.mass / (dist * dist);
    }
    return totalStrength;
}
// ============================================================================
// ADVANCED GEOMETRY - From FORMAL_FOUNDATIONS.md
// ============================================================================
/**
 * Calculate distance to Truth geodesic (x=y line)
 *
 * d_Truth = |gnosis - praxis| / √2
 */
export function distanceToTruth(point) {
    return Math.abs(point.gnosis - point.praxis) / Math.SQRT2;
}
/**
 * Calculate mass based on proximity to Truth axis
 *
 * m(x) = 1 / (1 + d_Truth(x))
 *
 * Closer to x=y → higher mass → stronger gravity well when crystallized
 */
export function calculateMass(point) {
    const dist = distanceToTruth(point);
    return 1 / (1 + dist);
}
/**
 * Calculate metric tensor at a point with attractor perturbations
 *
 * g_μν(x) = δ_μν + ∑_i A_i(x)
 */
export function calculateMetric(point, attractors) {
    // Start with flat metric
    let g = [
        [1, 0],
        [0, 1]
    ];
    // Add Gaussian perturbations from each attractor
    for (const attractor of attractors) {
        const dx = point.praxis - attractor.position.praxis;
        const dy = point.gnosis - attractor.position.gnosis;
        const r2 = dx * dx + dy * dy;
        const sigma = 2.0; // Characteristic radius
        const perturbation = attractor.strength * Math.exp(-r2 / (sigma * sigma));
        // Add to diagonal
        g[0][0] += perturbation;
        g[1][1] += perturbation;
    }
    return g;
}
/**
 * Calculate gravitational potential from a crystallized transformer
 *
 * Φ_well(x) = -(m / 2π) · log|x - x_crystal|
 */
export function gravityWellPotential(point, transformer) {
    const dx = point.praxis - transformer.endVector.praxis;
    const dy = point.gnosis - transformer.endVector.gnosis;
    const r = Math.sqrt(dx * dx + dy * dy);
    if (r < 0.01)
        return -Infinity; // Singularity
    const mass = transformer.mass;
    return -(mass / (2 * Math.PI)) * Math.log(r);
}
/**
 * Calculate Ricci scalar curvature at a point
 *
 * R ≈ ∑_i (s_i / r_i²) for nearby attractors
 */
export function ricciScalar(point, attractors) {
    let curvature = 0;
    for (const attractor of attractors) {
        const dx = point.praxis - attractor.position.praxis;
        const dy = point.gnosis - attractor.position.gnosis;
        const r2 = dx * dx + dy * dy;
        if (r2 < 0.01)
            continue; // Avoid singularity
        curvature += attractor.strength / r2;
    }
    return curvature;
}
/**
 * Distance to Bridge singularity at origin
 */
export function distanceToBridge(point) {
    return Math.sqrt(point.praxis ** 2 + point.gnosis ** 2);
}
/**
 * Check if point is in Bridge region (near singularity)
 */
export function isInBridge(point, threshold = 0.1) {
    return distanceToBridge(point) < threshold;
}
/**
 * Calculate effective distance through Field with gravity wells
 *
 * d_eff = d_orig - m · log(d_orig)
 *
 * Wormholes created by high-mass thoughts reduce effective distance
 */
export function effectiveDistance(start, end, transformers) {
    const dx = end.praxis - start.praxis;
    const dy = end.gnosis - start.gnosis;
    const dOrig = Math.sqrt(dx * dx + dy * dy);
    // Midpoint of path
    const midpoint = {
        praxis: (start.praxis + end.praxis) / 2,
        gnosis: (start.gnosis + end.gnosis) / 2
    };
    // Sum mass of nearby transformers (on the path)
    let totalMass = 0;
    for (const t of transformers) {
        const dist = Math.sqrt((midpoint.praxis - t.endVector.praxis) ** 2 +
            (midpoint.gnosis - t.endVector.gnosis) ** 2);
        if (dist < dOrig / 2) {
            totalMass += t.mass;
        }
    }
    // Wormhole shortcut
    const dEff = dOrig - totalMass * Math.log(dOrig + 1);
    return Math.max(0.1, dEff); // Never fully collapse
}
/**
 * Convert FieldVector to canvas Point
 */
export function fieldToCanvas(point, canvasWidth, canvasHeight, fieldExtent = 5) {
    const x = (point.praxis + fieldExtent) / (2 * fieldExtent) * canvasWidth;
    const y = canvasHeight - (point.gnosis + fieldExtent) / (2 * fieldExtent) * canvasHeight;
    return { x, y };
}
/**
 * Convert canvas Point to FieldVector
 */
export function canvasToField(x, y, canvasWidth, canvasHeight, fieldExtent = 5) {
    const praxis = (x / canvasWidth) * 2 * fieldExtent - fieldExtent;
    const gnosis = ((canvasHeight - y) / canvasHeight) * 2 * fieldExtent - fieldExtent;
    return { praxis, gnosis };
}
//# sourceMappingURL=geometry.js.map