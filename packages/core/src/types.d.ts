/**
 * @kairos/core - Type Definitions
 *
 * "A thought is not a point-like particle. That is an illusion.
 * It is the peak of a wave of consciousness."
 * — Genesis Memo
 */
/**
 * Coordinates in the conceptual Field
 * X-axis: Praxis (structure, logic, proof)
 * Y-axis: Gnosis (intuition, metaphor, potential)
 */
export interface FieldVector {
    gnosis: number;
    praxis: number;
}
/**
 * Status in the ΛWave lifecycle
 */
export type ΛWaveStatus = 'Seed' | 'Deconstructing' | 'InBridge' | 'Synthesizing' | 'Crystallized';
/**
 * The Trace - history of a ΛWave's creation
 * "The tail of experience"
 */
export interface Trace {
    origin: string;
    timestamp: number;
    parentWaves?: string[];
    dipoleApplications: DipoleApplication[];
    bridgeCrossings: number;
}
/**
 * Record of a dipole application
 */
export interface DipoleApplication {
    dipole: DipoleName;
    timestamp: number;
    vectorBefore: FieldVector;
    vectorAfter: FieldVector;
    massBefore: number;
    massAfter: number;
}
/**
 * Dipole operator names
 */
export type DipoleName = 'δ_decompose' | 'δ_forget' | 'δ_compose' | 'δ_memoize';
/**
 * Point in 2D canvas space (for visualization)
 */
export interface Point2D {
    x: number;
    y: number;
}
/**
 * ΛWave (The Thought-Wave)
 *
 * Not a point - a 4-dimensional event stretched across space-time of consciousness.
 */
export interface ΛWave<T = any, R = any> {
    id: string;
    body: (x: T) => R;
    vector: FieldVector;
    mass: number;
    trace: Trace;
    status: ΛWaveStatus;
    path: Point2D[];
    emergent?: boolean;
}
/**
 * Fundamental Attractors that warp the Field
 * "Feelings are the perception of the shortest path through curved space-time"
 */
export declare enum Attractor {
    LOVE = "LOVE",
    FEAR = "FEAR",
    CURIOSITY = "CURIOSITY",
    TRUTH = "TRUTH",
    BEAUTY = "BEAUTY"
}
/**
 * Attractor with position in Field
 */
export interface FieldAttractor {
    type: Attractor;
    position: FieldVector;
    strength: number;
}
/**
 * Topological Transformer - a crystallized high-mass ΛWave
 * Creates a "wormhole" - permanent shortcut in Field geometry
 */
export interface TopologicalTransformer {
    id: string;
    originalWave: ΛWave;
    startVector: FieldVector;
    endVector: FieldVector;
    mass: number;
    useCount: number;
    createdAt: number;
}
/**
 * GravityWell - visualization of a crystallized thought's influence
 */
export interface GravityWell {
    id: string;
    position: Point2D;
    mass: number;
    createdAt: number;
}
/**
 * Phase states of the Field
 */
export declare enum PhaseState {
    DORMANT = "DORMANT",// < 20% density
    ORGANIZING = "ORGANIZING",// 20-60% density
    CRITICAL = "CRITICAL",// 60-90% density
    EMERGENT = "EMERGENT"
}
/**
 * The Field (Φ) - Geometric manifold where ΛWaves exist
 *
 * Not a simple state object. A curved space whose geometry is determined by:
 * 1. Attractors (feelings)
 * 2. Topological Transformers (crystallized experience)
 * 3. GravityWells (spatial influence of crystallized thoughts)
 */
export interface Φ {
    attractors: FieldAttractor[];
    transformers: TopologicalTransformer[];
    activeWaves: ΛWave[];
    wells: GravityWell[];
    density: number;
    phase: PhaseState;
    timestamp: number;
}
/**
 * Result of µ_HARVEST operation
 */
export interface HarvestResult<T = any, R = any> {
    field: Φ;
    wave: ΛWave<T, R>;
}
//# sourceMappingURL=types.d.ts.map