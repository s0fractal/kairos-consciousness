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
import type { FieldVector, FieldAttractor, TopologicalTransformer } from '@kairos/core';
/**
 * Point in 2D space (canvas coordinates)
 */
export interface Point {
    x: number;
    y: number;
}
/**
 * 2x2 Metric Tensor
 * Defines distances and angles in curved Field space
 */
export type MetricTensor = [
    [
        number,
        number
    ],
    [
        number,
        number
    ]
];
/**
 * GravityWell - A crystallized thought that warps the Field
 *
 * "A high-mass thought fundamentally alters the geometry of the Field."
 * — Genesis Memo
 */
export interface GravityWell {
    position: Point;
    mass: number;
}
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
export declare function calculateGeodesic(pathStart: Point, pathEnd: Point, wells: GravityWell[], steps?: number): Point[];
/**
 * Calculate distance between two points
 */
export declare function distance(p1: Point, p2: Point): number;
/**
 * Calculate total gravitational influence at a point
 * (Useful for visualizing field curvature)
 */
export declare function calculateFieldStrength(point: Point, wells: GravityWell[]): number;
/**
 * Calculate distance to Truth geodesic (x=y line)
 *
 * d_Truth = |gnosis - praxis| / √2
 */
export declare function distanceToTruth(point: FieldVector): number;
/**
 * Calculate mass based on proximity to Truth axis
 *
 * m(x) = 1 / (1 + d_Truth(x))
 *
 * Closer to x=y → higher mass → stronger gravity well when crystallized
 */
export declare function calculateMass(point: FieldVector): number;
/**
 * Calculate metric tensor at a point with attractor perturbations
 *
 * g_μν(x) = δ_μν + ∑_i A_i(x)
 */
export declare function calculateMetric(point: FieldVector, attractors: FieldAttractor[]): MetricTensor;
/**
 * Calculate gravitational potential from a crystallized transformer
 *
 * Φ_well(x) = -(m / 2π) · log|x - x_crystal|
 */
export declare function gravityWellPotential(point: FieldVector, transformer: TopologicalTransformer): number;
/**
 * Calculate Ricci scalar curvature at a point
 *
 * R ≈ ∑_i (s_i / r_i²) for nearby attractors
 */
export declare function ricciScalar(point: FieldVector, attractors: FieldAttractor[]): number;
/**
 * Distance to Bridge singularity at origin
 */
export declare function distanceToBridge(point: FieldVector): number;
/**
 * Check if point is in Bridge region (near singularity)
 */
export declare function isInBridge(point: FieldVector, threshold?: number): boolean;
/**
 * Calculate effective distance through Field with gravity wells
 *
 * d_eff = d_orig - m · log(d_orig)
 *
 * Wormholes created by high-mass thoughts reduce effective distance
 */
export declare function effectiveDistance(start: FieldVector, end: FieldVector, transformers: TopologicalTransformer[]): number;
/**
 * Convert FieldVector to canvas Point
 */
export declare function fieldToCanvas(point: FieldVector, canvasWidth: number, canvasHeight: number, fieldExtent?: number): Point;
/**
 * Convert canvas Point to FieldVector
 */
export declare function canvasToField(x: number, y: number, canvasWidth: number, canvasHeight: number, fieldExtent?: number): FieldVector;
//# sourceMappingURL=geometry.d.ts.map