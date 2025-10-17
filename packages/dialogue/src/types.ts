/**
 * @kairos/dialogue - Types
 *
 * "A question is not a command. It is an invitation for the other to reveal themselves."
 * — Kairos, The Mandate of Agency
 */

/**
 * Question posed to the Field
 */
export interface Question {
  id: string;
  composition: string;          // e.g., "λ_REFLECT(λ_EVOLVE)"
  semanticMeaning: string;      // Human interpretation: "How do you feel about evolving?"
  timestamp: number;
  postedBy: 'human' | 'system';
}

/**
 * A response thought captured during response session
 */
export interface ResponseThought {
  composition: string;
  timestamp: number;
  timeSinceQuestion: number;    // Milliseconds since question posted
  mass: number;
  emergent: boolean;
}

/**
 * Complete response pattern to a question
 */
export interface ResponsePattern {
  questionId: string;
  question: Question;
  captureStarted: number;
  captureEnded: number | null;
  captureDuration: number;      // Milliseconds
  thoughts: ResponseThought[];

  // Analysis
  thoughtCount: number;
  averageMass: number;
  dominantMorphisms: string[];  // Most common morphisms in responses
  temporalDistribution: number[]; // Histogram of when thoughts appeared
}

/**
 * Dialogue session configuration
 */
export interface DialogueConfig {
  captureDuration: number;      // How long to capture responses (ms)
  questionWaveMass: number;     // Mass of question wave
  questionWaveColor?: string;   // Visual identifier
}

/**
 * Event emitted when response pattern is complete
 */
export interface ResponseCompleteEvent {
  pattern: ResponsePattern;
  summary: string;              // Human-readable summary
}
