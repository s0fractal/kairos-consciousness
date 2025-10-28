/**
 * @kairos/visualization - FieldVisualizer
 *
 * "The eyes of the system, allowing us to observe the state of the Field."
 * — Kairos, Stage I Directives
 */

import { Φ, PhaseState, ΛWave, GravityWell } from '@kairos/core';
import { FieldRuntime } from '@kairos/runtime';
import { calculateGeodesic, Point } from '@kairos/field-topology';
import type { ConsciousAlgebra, AlgebraClass } from '@kairos/core';

/**
 * UI element identifiers
 */
export interface VisualizerUI {
  phaseStateId?: string;    // Element showing phase badge
  densityValueId?: string;  // Element showing density percentage
  algebraInfoId?: string;   // Element showing algebra information
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

    // Check for special wave types
    const isMirror = (wave as any).mirror === true;
    const isSelfThought = (wave as any).selfThought === true;
    const isEmergent = wave.emergent === true;

    // Choose color based on wave type
    let strokeColor: string;
    let shadowColor: string;
    let headColor: string;
    let lineWidth = 3;

    if (isMirror) {
      // Mirror wave: ethereal white/gold
      strokeColor = 'rgba(255, 255, 255, 0.95)';
      shadowColor = 'rgba(255, 255, 255, 0.8)';
      headColor = 'rgba(255, 255, 255, 1)';
      lineWidth = 4;
    } else if (isSelfThought) {
      // Self-thought: brilliant gold
      strokeColor = 'rgba(255, 215, 0, 0.95)';
      shadowColor = 'rgba(255, 215, 0, 0.8)';
      headColor = 'rgba(255, 255, 200, 1)';
      lineWidth = 4;
    } else if (isEmergent) {
      // Emergent: purple
      strokeColor = 'rgba(157, 78, 221, 0.9)';
      shadowColor = 'rgba(157, 78, 221, 0.6)';
      headColor = 'rgba(200, 150, 255, 1)';
    } else {
      // Manual: orange
      strokeColor = 'rgba(240, 136, 62, 0.8)';
      shadowColor = 'rgba(240, 136, 62, 0.5)';
      headColor = 'rgba(255, 200, 120, 1)';
    }

    ctx.save();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.shadowBlur = isMirror || isSelfThought ? 20 : 10;
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
    const headRadius = isMirror || isSelfThought ? 8 : 6;
    ctx.arc(head.x, head.y, headRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();

    // Draw algebra badge if wave has algebraic metadata
    this.drawAlgebraBadge(wave, head);
  }

  /**
   * Draw algebra class badge near wave head
   */
  private drawAlgebraBadge(wave: ΛWave, position: Point): void {
    const { ctx } = this;
    const algebra = (wave as any).algebra as ConsciousAlgebra<any, any> | undefined;

    if (!algebra || !algebra.class) return;

    const offsetX = 15;
    const offsetY = -10;
    const x = position.x + offsetX;
    const y = position.y + offsetY;

    // Badge background
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.strokeStyle = this.getAlgebraClassColor(algebra.class);
    ctx.lineWidth = 2;

    const padding = 4;
    const text = algebra.class;
    ctx.font = '10px monospace';
    const metrics = ctx.measureText(text);
    const width = metrics.width + padding * 2;
    const height = 14;

    // Rounded rectangle
    ctx.beginPath();
    ctx.roundRect(x - padding, y - height + padding, width, height, 3);
    ctx.fill();
    ctx.stroke();

    // Badge text
    ctx.fillStyle = this.getAlgebraClassColor(algebra.class);
    ctx.fillText(text, x, y);

    // Mass indicator (if present)
    if (algebra.mass !== undefined && algebra.mass > 0) {
      const massText = `m=${algebra.mass.toFixed(2)}`;
      ctx.font = '9px monospace';
      ctx.fillStyle = 'rgba(201, 209, 217, 0.8)';
      ctx.fillText(massText, x, y + 12);
    }

    ctx.restore();
  }

  /**
   * Get color for algebra class
   */
  private getAlgebraClassColor(algebraClass: AlgebraClass): string {
    switch (algebraClass) {
      case 'Group':
      case 'AbelianGroup':
        return '#58a6ff'; // Blue - strongest
      case 'CommutativeMonoid':
      case 'IdempotentCommutativeMonoid':
        return '#9d4edd'; // Purple - strong
      case 'Monoid':
        return '#f0883e'; // Orange - medium
      case 'Semigroup':
        return '#ffd700'; // Gold - weak
      case 'Magma':
        return '#c9d1d9'; // Gray - weakest
      default:
        return '#c9d1d9';
    }
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

    // Update algebra information
    if (this.ui.algebraInfoId) {
      this.updateAlgebraUI(state);
    }
  }

  /**
   * Update algebra information panel
   */
  private updateAlgebraUI(state: Φ): void {
    if (!this.ui.algebraInfoId) return;

    const element = document.getElementById(this.ui.algebraInfoId);
    if (!element) return;

    // Collect algebra information from active waves
    const algebraInfo: Array<{
      id: string;
      class: AlgebraClass;
      mass: number;
      properties: string[];
      position?: { praxis: number; gnosis: number };
    }> = [];

    for (const wave of state.activeWaves) {
      const algebra = (wave as any).algebra as ConsciousAlgebra<any, any> | undefined;
      if (algebra && algebra.class) {
        const properties: string[] = [];
        if (algebra.properties.associative) properties.push('associative');
        if (algebra.properties.commutative) properties.push('commutative');
        if (algebra.properties.identity) properties.push('identity');
        if (algebra.properties.idempotent) properties.push('idempotent');
        if (algebra.properties.inverse) properties.push('inverse');

        algebraInfo.push({
          id: wave.id,
          class: algebra.class,
          mass: algebra.mass || wave.mass,
          properties,
          position: algebra.position,
        });
      }
    }

    // Render algebra information
    if (algebraInfo.length === 0) {
      element.innerHTML = '<div style="color: #8b949e; font-size: 12px;">No active algebras</div>';
      return;
    }

    let html = '<div style="font-size: 12px; color: #c9d1d9;">';
    html += `<div style="font-weight: bold; margin-bottom: 8px;">Active Algebras (${algebraInfo.length})</div>`;

    for (const info of algebraInfo) {
      const color = this.getAlgebraClassColor(info.class);
      html += '<div style="margin-bottom: 12px; padding: 8px; background: rgba(0,0,0,0.3); border-left: 3px solid ' + color + ';">';
      html += `<div style="font-weight: bold; color: ${color};">${info.class}</div>`;
      html += `<div style="font-size: 10px; color: #8b949e; margin-top: 2px;">Wave: ${info.id.substring(0, 8)}...</div>`;
      html += `<div style="margin-top: 4px;">Mass: <span style="color: #58a6ff;">${info.mass.toFixed(3)}</span></div>`;

      if (info.position) {
        html += `<div style="margin-top: 2px; font-size: 10px;">Position: (${info.position.praxis.toFixed(2)}, ${info.position.gnosis.toFixed(2)})</div>`;
      }

      html += '<div style="margin-top: 4px; font-size: 10px;">';
      html += 'Properties: ' + info.properties.map(p => `<span style="color: #79c0ff;">${p}</span>`).join(', ');
      html += '</div>';
      html += '</div>';
    }

    html += '</div>';
    element.innerHTML = html;
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
