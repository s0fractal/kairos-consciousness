/**
 * @kairos/visualization - FieldVisualizer
 *
 * "The eyes of the system, allowing us to observe the state of the Field."
 * — Kairos, Stage I Directives
 */

import { Φ, PhaseState, ΛWave, GravityWell } from '@kairos/core';
import { FieldRuntime } from '@kairos/runtime';
import { calculateGeodesic, Point } from '@kairos/field-topology';

/**
 * UI element identifiers
 */
export interface VisualizerUI {
  phaseStateId?: string;    // Element showing phase badge
  densityValueId?: string;  // Element showing density percentage
}

/**
 * Particle for background animation
 */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
}

/**
 * FieldVisualizer - Visual representation of the Field Φ
 *
 * Renders the Field state on a canvas and updates UI elements.
 */
export class FieldVisualizer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private ui: VisualizerUI;
  private particles: Particle[] = [];
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement, ui: VisualizerUI = {}) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Failed to get 2D context from canvas');
    }
    this.ctx = ctx;
    this.ui = ui;

    // Set canvas size
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Initialize particles
    this.initParticles();

    // Start animation loop
    this.startAnimation();
  }

  /**
   * Resize canvas to match display size
   */
  private resizeCanvas(): void {
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }

  /**
   * Initialize background particles
   */
  private initParticles(count: number = 30): void {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
  }

  /**
   * Connect visualizer to runtime
   * Subscribes to update events and renders Field state
   */
  connect(runtime: FieldRuntime): void {
    runtime.on('update', (state: Φ) => {
      this.updateUI(state);
      // Update animation state
      if ((this as any).updateLastState) {
        (this as any).updateLastState(state);
      }
    });

    runtime.on('phaseChange', (phase: PhaseState) => {
      this.updatePhaseUI(phase);
    });

    runtime.on('waveCrystallized', ({ wave, well }: { wave: ΛWave; well: GravityWell }) => {
      console.log('Wave crystallized:', wave.id, 'created well:', well.id);
    });

    runtime.on('start', () => {
      console.log('FieldVisualizer: Connected to runtime');
    });
  }

  /**
   * Start animation loop for canvas rendering
   */
  private startAnimation(): void {
    let lastState: Φ | null = null;

    const animate = () => {
      if (lastState) {
        this.renderField(lastState);
      } else {
        this.drawFieldBackground();
      }
      this.animationFrameId = requestAnimationFrame(animate);
    };

    // Store reference to update lastState
    (this as any).updateLastState = (state: Φ) => {
      lastState = state;
    };

    animate();
  }

  /**
   * Stop animation loop
   */
  stop(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Draw Field background with particle effect
   * Adapted from roadmap-interactive.html
   */
  private drawFieldBackground(): void {
    const { ctx, canvas, particles } = this;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#0D1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach((p) => {
      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201, 209, 217, ${p.opacity})`;
      ctx.fill();
    });
  }

  /**
   * Draw a gravity well
   */
  private drawGravityWell(well: GravityWell): void {
    const { ctx } = this;
    const { position, mass } = well;
    const radius = 50 * mass;

    // Gradient glow
    const gradient = ctx.createRadialGradient(
      position.x, position.y, 0,
      position.x, position.y, radius
    );
    gradient.addColorStop(0, 'rgba(88, 166, 255, 0.4)');
    gradient.addColorStop(0.5, 'rgba(88, 166, 255, 0.2)');
    gradient.addColorStop(1, 'rgba(88, 166, 255, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(position.x, position.y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Core
    ctx.fillStyle = 'rgba(88, 166, 255, 0.8)';
    ctx.beginPath();
    ctx.arc(position.x, position.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  /**
   * Draw an active wave's path
   */
  private drawWavePath(wave: ΛWave): void {
    const { ctx } = this;
    const path = wave.path;

    if (path.length < 2) return;

    // Choose color based on wave type (emergent vs manual)
    const isEmergent = wave.emergent === true;
    const strokeColor = isEmergent ? 'rgba(157, 78, 221, 0.9)' : 'rgba(240, 136, 62, 0.8)';
    const shadowColor = isEmergent ? 'rgba(157, 78, 221, 0.6)' : 'rgba(240, 136, 62, 0.5)';
    const headColor = isEmergent ? 'rgba(200, 150, 255, 1)' : 'rgba(255, 200, 120, 1)';

    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = shadowColor;

    ctx.beginPath();
    ctx.moveTo(path[0].x, path[0].y);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i].x, path[i].y);
    }
    ctx.stroke();

    // Draw wave head
    const head = path[path.length - 1];
    ctx.fillStyle = headColor;
    ctx.beginPath();
    ctx.arc(head.x, head.y, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Render complete Field state
   */
  private renderField(state: Φ): void {
    this.drawFieldBackground();

    // Draw gravity wells
    for (const well of state.wells) {
      this.drawGravityWell(well);
    }

    // Draw active waves with topology-distorted paths
    for (const wave of state.activeWaves) {
      // Recalculate path with current wells
      const start = (wave as any).startPos;
      const end = (wave as any).endPos;
      const progress = (wave as any).progress || 0;

      if (start && end && state.wells.length > 0) {
        // Calculate geodesic through gravity wells
        const topologyWells = state.wells.map(w => ({
          position: w.position,
          mass: w.mass
        }));

        const fullPath = calculateGeodesic(start, end, topologyWells, 50);

        // Show only travelled portion
        const travelledLength = Math.floor(fullPath.length * progress);
        wave.path = fullPath.slice(0, Math.max(1, travelledLength));
      }

      this.drawWavePath(wave);
    }
  }

  /**
   * Update UI elements with new Field state
   */
  private updateUI(state: Φ): void {
    // Update density
    if (this.ui.densityValueId) {
      const element = document.getElementById(this.ui.densityValueId);
      if (element) {
        element.textContent = `${(state.density * 100).toFixed(1)}%`;
      }
    }
  }

  /**
   * Update phase badge UI
   */
  private updatePhaseUI(phase: PhaseState): void {
    if (!this.ui.phaseStateId) return;

    const element = document.getElementById(this.ui.phaseStateId);
    if (!element) return;

    element.textContent = phase;

    // Update badge styling
    element.className = 'phase-badge';
    switch (phase) {
      case PhaseState.DORMANT:
        element.classList.add('phase-dormant');
        break;
      case PhaseState.ORGANIZING:
        element.classList.add('phase-organizing');
        break;
      case PhaseState.CRITICAL:
        element.classList.add('phase-critical');
        break;
      case PhaseState.EMERGENT:
        element.classList.add('phase-emergent');
        break;
    }
  }
}
