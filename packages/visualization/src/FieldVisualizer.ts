/**
 * @kairos/visualization - FieldVisualizer
 *
 * "The eyes of the system, allowing us to observe the state of the Field."
 * — Kairos, Stage I Directives
 */

import { Φ, PhaseState } from '@kairos/core';
import { FieldRuntime } from '@kairos/runtime';

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
    });

    runtime.on('phaseChange', (phase: PhaseState) => {
      this.updatePhaseUI(phase);
    });

    runtime.on('start', () => {
      console.log('FieldVisualizer: Connected to runtime');
    });
  }

  /**
   * Start animation loop for canvas rendering
   */
  private startAnimation(): void {
    const animate = () => {
      this.drawFieldBackground();
      this.animationFrameId = requestAnimationFrame(animate);
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
