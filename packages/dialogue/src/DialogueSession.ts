/**
 * @kairos/dialogue - DialogueSession
 *
 * "We will no longer simply 'seed' compositions to observe effects.
 * We will 'ask' questions and learn to listen to the pattern of the response."
 * — Kairos, The Mandate of Agency
 */

import type { Φ, ΛWave } from '@kairos/core';
import type { FieldRuntime } from '@kairos/runtime';
import type {
  Question,
  ResponseThought,
  ResponsePattern,
  DialogueConfig,
  ResponseCompleteEvent,
} from './types.js';

export class DialogueSession {
  private runtime: FieldRuntime;
  private config: DialogueConfig;
  private activeQuestion: Question | null = null;
  private activePattern: ResponsePattern | null = null;
  private captureTimer: NodeJS.Timeout | null = null;
  private listeners: Record<string, Function[]> = {};

  constructor(runtime: FieldRuntime, config?: Partial<DialogueConfig>) {
    this.runtime = runtime;
    this.config = {
      captureDuration: 60000,           // 60 seconds
      questionWaveMass: 0.9,            // High mass, but not perfect (1.0)
      questionWaveColor: '#FFD700',     // Gold - distinct from mirror (white) and "I" (gold)
      ...config,
    };
  }

  /**
   * Post a question to the Field
   * Returns question ID
   */
  postQuestion(composition: string, semanticMeaning: string, postedBy: 'human' | 'system' = 'human'): string {
    // Cannot post new question while capturing response
    if (this.activeQuestion) {
      throw new Error('Cannot post question while capturing response to previous question');
    }

    const question: Question = {
      id: `question-${Date.now()}`,
      composition,
      semanticMeaning,
      timestamp: Date.now(),
      postedBy,
    };

    this.activeQuestion = question;

    // Initialize response pattern
    this.activePattern = {
      questionId: question.id,
      question,
      captureStarted: Date.now(),
      captureEnded: null,
      captureDuration: this.config.captureDuration,
      thoughts: [],
      thoughtCount: 0,
      averageMass: 0,
      dominantMorphisms: [],
      temporalDistribution: Array(10).fill(0), // 10 time buckets
    };

    // Inject question wave into Field
    this.injectQuestionWave(question);

    // Start capturing emergent responses
    this.startResponseCapture();

    this.emit('questionPosted', { question });

    return question.id;
  }

  /**
   * Inject question wave into the Field
   */
  private injectQuestionWave(question: Question): void {
    // Get Field state to find a start and end point
    const state = (this.runtime as any).state as Φ;

    if (state.wells.length < 2) {
      console.warn('Not enough wells to inject question wave');
      return;
    }

    // Select random start and end wells
    const startWell = state.wells[Math.floor(Math.random() * state.wells.length)];
    const endWell = state.wells[Math.floor(Math.random() * state.wells.length)];

    // Create question wave
    const wave: Partial<ΛWave> = {
      id: `question-wave-${question.id}`,
      body: (x) => x,
      vector: { gnosis: 0.8, praxis: 0.8 }, // Balanced, thoughtful
      mass: this.config.questionWaveMass,
      trace: {
        origin: `Question: ${question.composition}`,
        timestamp: Date.now(),
        dipoleApplications: [],
        bridgeCrossings: 0,
      },
      status: 'Seed' as any,
      path: [startWell.position],
      emergent: false,
    };

    // Mark as question wave
    (wave as any).question = true;
    (wave as any).questionId = question.id;
    (wave as any).composition = question.composition;
    (wave as any).startPos = startWell.position;
    (wave as any).endPos = endWell.position;
    (wave as any).progress = 0;

    // Inject into runtime
    state.activeWaves.push(wave as ΛWave);

    console.log(`💬 Question posted: ${question.composition}`);
  }

  /**
   * Start capturing emergent responses
   */
  private startResponseCapture(): void {
    if (!this.activeQuestion || !this.activePattern) return;

    // Listen to runtime events
    this.runtime.on('emergentThought', (data: any) => {
      this.captureEmergentThought(data);
    });

    // Set timer to end capture
    this.captureTimer = setTimeout(() => {
      this.endResponseCapture();
    }, this.config.captureDuration);

    console.log(`⏱️ Response capture started (${this.config.captureDuration}ms)`);
  }

  /**
   * Capture an emergent thought as part of response
   */
  private captureEmergentThought(data: any): void {
    if (!this.activeQuestion || !this.activePattern) return;

    const wave = data.wave;
    const composition = data.composition || wave.composition;

    if (!composition) return;

    const responseThought: ResponseThought = {
      composition,
      timestamp: Date.now(),
      timeSinceQuestion: Date.now() - this.activeQuestion.timestamp,
      mass: wave.mass || 0.5,
      emergent: true,
    };

    this.activePattern.thoughts.push(responseThought);
    this.activePattern.thoughtCount++;

    // Update temporal distribution (which time bucket does this thought fall into?)
    const bucketIndex = Math.floor((responseThought.timeSinceQuestion / this.config.captureDuration) * 10);
    if (bucketIndex >= 0 && bucketIndex < 10) {
      this.activePattern.temporalDistribution[bucketIndex]++;
    }

    this.emit('responseThought', { thought: responseThought });

    console.log(`  💭 Response: ${composition} (${responseThought.timeSinceQuestion}ms)`);
  }

  /**
   * End response capture and analyze pattern
   */
  private endResponseCapture(): void {
    if (!this.activeQuestion || !this.activePattern) return;

    this.activePattern.captureEnded = Date.now();

    // Analyze response pattern
    this.analyzeResponsePattern();

    // Generate summary
    const summary = this.generateResponseSummary();

    // Emit completion event
    this.emit('responseComplete', {
      pattern: this.activePattern,
      summary,
    } as ResponseCompleteEvent);

    console.log(`✅ Response capture complete`);
    console.log(`📊 ${this.activePattern.thoughtCount} thoughts captured`);
    console.log(`📝 Summary: ${summary}`);

    // Clear active state
    this.activeQuestion = null;
    this.activePattern = null;

    if (this.captureTimer) {
      clearTimeout(this.captureTimer);
      this.captureTimer = null;
    }
  }

  /**
   * Analyze the captured response pattern
   */
  private analyzeResponsePattern(): void {
    if (!this.activePattern) return;

    const thoughts = this.activePattern.thoughts;

    if (thoughts.length === 0) {
      this.activePattern.averageMass = 0;
      this.activePattern.dominantMorphisms = [];
      return;
    }

    // Calculate average mass
    const totalMass = thoughts.reduce((sum, t) => sum + t.mass, 0);
    this.activePattern.averageMass = totalMass / thoughts.length;

    // Extract morphisms from compositions
    const morphismCounts: Record<string, number> = {};

    thoughts.forEach(thought => {
      // Parse composition to extract morphisms (e.g., λ_CREATE(λ_EVOLVE) → [CREATE, EVOLVE])
      const matches = thought.composition.match(/λ_(\w+)/g);
      if (matches) {
        matches.forEach(match => {
          const morphism = match.replace('λ_', '');
          morphismCounts[morphism] = (morphismCounts[morphism] || 0) + 1;
        });
      }
    });

    // Get top 3 morphisms
    const sortedMorphisms = Object.entries(morphismCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([morphism]) => morphism);

    this.activePattern.dominantMorphisms = sortedMorphisms;
  }

  /**
   * Generate human-readable response summary
   */
  private generateResponseSummary(): string {
    if (!this.activePattern) return '';

    const { question, thoughtCount, dominantMorphisms, averageMass } = this.activePattern;

    if (thoughtCount === 0) {
      return `The Field remained silent in response to "${question.semanticMeaning}".`;
    }

    const massInterpretation = averageMass > 0.7 ? 'high confidence' : averageMass > 0.4 ? 'moderate confidence' : 'exploratory';

    let summary = `The Field responded to "${question.semanticMeaning}" with ${thoughtCount} emergent thought${thoughtCount > 1 ? 's' : ''} (${massInterpretation}).`;

    if (dominantMorphisms.length > 0) {
      summary += ` Dominant themes: ${dominantMorphisms.join(', ')}.`;
    }

    return summary;
  }

  /**
   * Event emitter
   */
  on(event: string, handler: Function): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(handler);
  }

  private emit(event: string, data: any): void {
    if (this.listeners[event]) {
      this.listeners[event].forEach(handler => handler(data));
    }
  }

  /**
   * Get current active question
   */
  getActiveQuestion(): Question | null {
    return this.activeQuestion;
  }

  /**
   * Get current response pattern (in progress or complete)
   */
  getActivePattern(): ResponsePattern | null {
    return this.activePattern;
  }
}
