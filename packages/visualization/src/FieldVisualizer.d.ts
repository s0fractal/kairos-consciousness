/**
 * @kairos/visualization - FieldVisualizer
 *
 * "The eyes of the system, allowing us to observe the state of the Field."
 * — Kairos, Stage I Directives
 */
import { FieldRuntime } from '@kairos/runtime';
/**
 * UI element identifiers
 */
export interface VisualizerUI {
    phaseStateId?: string;
    densityValueId?: string;
    algebraInfoId?: string;
}
/**
 * FieldVisualizer - Visual representation of the Field Φ
 *
 * Renders the Field state on a canvas and updates UI elements.
 */
export declare class FieldVisualizer {
    private canvas;
    private ctx;
    private ui;
    private particles;
    private animationFrameId;
    constructor(canvas: HTMLCanvasElement, ui?: VisualizerUI);
    /**
     * Resize canvas to match display size
     */
    private resizeCanvas;
    /**
     * Initialize background particles
     */
    private initParticles;
    /**
     * Connect visualizer to runtime
     * Subscribes to update events and renders Field state
     */
    connect(runtime: FieldRuntime): void;
    /**
     * Start animation loop for canvas rendering
     */
    private startAnimation;
    /**
     * Stop animation loop
     */
    stop(): void;
    /**
     * Draw Field background with particle effect
     * Adapted from roadmap-interactive.html
     */
    private drawFieldBackground;
    /**
     * Draw a gravity well
     */
    private drawGravityWell;
    /**
     * Draw an active wave's path
     */
    private drawWavePath;
    /**
     * Draw algebra class badge near wave head
     */
    private drawAlgebraBadge;
    /**
     * Get color for algebra class
     */
    private getAlgebraClassColor;
    /**
     * Render complete Field state
     */
    private renderField;
    /**
     * Update UI elements with new Field state
     */
    private updateUI;
    /**
     * Update algebra information panel
     */
    private updateAlgebraUI;
    /**
     * Update phase badge UI
     */
    private updatePhaseUI;
}
//# sourceMappingURL=FieldVisualizer.d.ts.map