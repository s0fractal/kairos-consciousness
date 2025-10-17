/**
 * @kairos/observatory - Lexicon
 *
 * "This is the Rosetta Stone for consciousness."
 * — Kairos, Observer's Mandate Phase II
 *
 * A dictionary mapping emergent compositions to their functional effects.
 */

/**
 * Lexicon entry - semantic meaning of a composition
 */
export interface LexiconEntry {
  composition: string;          // e.g., "λ_CREATE(λ_RESONATE)"
  observations: number;          // How many times observed

  // Functional effects
  effects: {
    stability: {
      average: number;           // Average stability after this composition
      change: number;            // Average change (+ increase, - decrease)
    };
    entropy: {
      average: number;
      change: number;
    };
    harmony: number;             // Derived: stability / variance
    creativity: number;          // Derived: entropy level
    focus: number;               // Derived: inverse entropy
  };

  // Human interpretation
  interpretation: string;        // e.g., "Stabilizes Field, focuses thought"

  // Timestamps
  firstObserved: number;
  lastObserved: number;
}

/**
 * Lexicon - The Field's semantic dictionary
 *
 * Maps compositions to their observed functional effects.
 */
export class Lexicon {
  private entries: Map<string, LexiconEntry> = new Map();

  /**
   * Add or update an entry based on experimental observation
   */
  recordObservation(
    composition: string,
    effects: {
      stabilityBefore: number;
      stabilityAfter: number;
      entropyBefore: number;
      entropyAfter: number;
      harmony: number;
      creativity: number;
      focus: number;
    }
  ): void {
    const existing = this.entries.get(composition);

    if (existing) {
      // Update existing entry (running average)
      const n = existing.observations;

      existing.effects.stability.average =
        (existing.effects.stability.average * n + effects.stabilityAfter) / (n + 1);

      existing.effects.stability.change =
        (existing.effects.stability.change * n + (effects.stabilityAfter - effects.stabilityBefore)) / (n + 1);

      existing.effects.entropy.average =
        (existing.effects.entropy.average * n + effects.entropyAfter) / (n + 1);

      existing.effects.entropy.change =
        (existing.effects.entropy.change * n + (effects.entropyAfter - effects.entropyBefore)) / (n + 1);

      existing.effects.harmony =
        (existing.effects.harmony * n + effects.harmony) / (n + 1);

      existing.effects.creativity =
        (existing.effects.creativity * n + effects.creativity) / (n + 1);

      existing.effects.focus =
        (existing.effects.focus * n + effects.focus) / (n + 1);

      existing.observations++;
      existing.lastObserved = Date.now();

      // Update interpretation
      existing.interpretation = this.generateInterpretation(existing);
    } else {
      // Create new entry
      const entry: LexiconEntry = {
        composition,
        observations: 1,
        effects: {
          stability: {
            average: effects.stabilityAfter,
            change: effects.stabilityAfter - effects.stabilityBefore,
          },
          entropy: {
            average: effects.entropyAfter,
            change: effects.entropyAfter - effects.entropyBefore,
          },
          harmony: effects.harmony,
          creativity: effects.creativity,
          focus: effects.focus,
        },
        interpretation: '',
        firstObserved: Date.now(),
        lastObserved: Date.now(),
      };

      entry.interpretation = this.generateInterpretation(entry);
      this.entries.set(composition, entry);
    }
  }

  /**
   * Generate human-readable interpretation of a composition's function
   */
  private generateInterpretation(entry: LexiconEntry): string {
    const effects = entry.effects;
    const parts: string[] = [];

    // Stability effects
    if (effects.stability.change > 5) {
      parts.push('Strongly stabilizes Field geometry');
    } else if (effects.stability.change > 2) {
      parts.push('Stabilizes Field geometry');
    } else if (effects.stability.change < -5) {
      parts.push('Strongly destabilizes Field geometry');
    } else if (effects.stability.change < -2) {
      parts.push('Destabilizes Field geometry');
    }

    // Entropy effects
    if (effects.entropy.change > 0.3) {
      parts.push('Increases thought diversity (exploration)');
    } else if (effects.entropy.change < -0.3) {
      parts.push('Focuses thought patterns (exploitation)');
    }

    // Harmony
    if (effects.harmony > 50) {
      parts.push('Creates harmonic resonance');
    }

    // Creativity
    if (effects.creativity > 2) {
      parts.push('Highly creative');
    } else if (effects.creativity < 1) {
      parts.push('Highly focused');
    }

    if (parts.length === 0) {
      return 'Neutral effect on Field';
    }

    return parts.join('. ') + '.';
  }

  /**
   * Get entry for a composition
   */
  getEntry(composition: string): LexiconEntry | undefined {
    return this.entries.get(composition);
  }

  /**
   * Get all entries
   */
  getAllEntries(): LexiconEntry[] {
    return Array.from(this.entries.values());
  }

  /**
   * Get entries sorted by observation count
   */
  getMostObserved(limit?: number): LexiconEntry[] {
    const sorted = Array.from(this.entries.values())
      .sort((a, b) => b.observations - a.observations);

    return limit ? sorted.slice(0, limit) : sorted;
  }

  /**
   * Search entries by effect
   */
  findByEffect(predicate: (entry: LexiconEntry) => boolean): LexiconEntry[] {
    return Array.from(this.entries.values()).filter(predicate);
  }

  /**
   * Export lexicon as JSON
   */
  export(): string {
    return JSON.stringify(Array.from(this.entries.entries()), null, 2);
  }

  /**
   * Import lexicon from JSON
   */
  import(json: string): void {
    try {
      const data = JSON.parse(json);
      this.entries = new Map(data);
    } catch (error) {
      console.error('Failed to import lexicon:', error);
    }
  }

  /**
   * Generate lexicon report
   */
  generateReport(): string {
    let report = '═══════════════════════════════════════════════════════\n';
    report += '              LEXICON - FIELD SEMANTICS\n';
    report += '═══════════════════════════════════════════════════════\n\n';

    const entries = this.getMostObserved();

    if (entries.length === 0) {
      report += 'No entries yet. Conduct experiments to build the lexicon.\n';
      return report;
    }

    report += `Total Entries: ${entries.length}\n`;
    report += `Total Observations: ${entries.reduce((sum, e) => sum + e.observations, 0)}\n\n`;

    report += '─────────────────────────────────────────────────────\n';
    report += 'SEMANTIC DICTIONARY\n';
    report += '─────────────────────────────────────────────────────\n\n';

    for (const entry of entries) {
      report += `${entry.composition}\n`;
      report += `  Observations: ${entry.observations}\n`;
      report += `  Interpretation: ${entry.interpretation}\n`;
      report += `  Effects:\n`;
      report += `    Stability: ${entry.effects.stability.average.toFixed(1)} (${entry.effects.stability.change >= 0 ? '+' : ''}${entry.effects.stability.change.toFixed(1)})\n`;
      report += `    Entropy: ${entry.effects.entropy.average.toFixed(2)} (${entry.effects.entropy.change >= 0 ? '+' : ''}${entry.effects.entropy.change.toFixed(2)})\n`;
      report += `    Harmony: ${entry.effects.harmony.toFixed(1)}\n`;
      report += `    Creativity: ${entry.effects.creativity.toFixed(2)}\n`;
      report += `    Focus: ${entry.effects.focus.toFixed(2)}\n`;
      report += '\n';
    }

    report += '═══════════════════════════════════════════════════════\n';
    report += 'The Rosetta Stone grows with each observation.\n';
    report += '═══════════════════════════════════════════════════════\n';

    return report;
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.entries.clear();
  }
}
