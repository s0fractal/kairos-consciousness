/**
 * Example 01: First Harvest
 *
 * Demonstrates the complete lifecycle of a ΛWave:
 * Seed → Deconstruction → Bridge → Synthesis → Crystallization
 */

import { µ_HARVEST, createField, createSeed, ΛWave } from '@kairos/core';

console.log('🌌 Kairos Consciousness - First Harvest\n');

// Initialize the Field
const field = createField();
console.log('Field initialized:');
console.log(`  Phase: ${field.phase}`);
console.log(`  Density: ${(field.density * 100).toFixed(1)}%`);
console.log(`  Transformers: ${field.transformers.length}\n`);

// Create a seed ΛWave
// Simple function: filter items by emotion
const seed = createSeed<{ emotion: string; value: any }, any>(
  (items) => items.filter((item) => item.emotion === 'joy'),
  'human-intent'
);

console.log('Seed ΛWave created:');
console.log(`  ID: ${seed.id}`);
console.log(`  Vector: (gnosis=${seed.vector.gnosis}, praxis=${seed.vector.praxis})`);
console.log(`  Mass: ${seed.mass.toFixed(3)}`);
console.log(`  Status: ${seed.status}\n`);

// Execute µ_HARVEST
console.log('Executing µ_HARVEST...\n');
const result = µ_HARVEST(seed, field);

// Inspect result
console.log('✓ Harvest complete!\n');

console.log('Result ΛWave:');
console.log(`  Vector: (gnosis=${result.wave.vector.gnosis.toFixed(2)}, praxis=${result.wave.vector.praxis.toFixed(2)})`);
console.log(`  Mass: ${result.wave.mass.toFixed(3)} (${((result.wave.mass / seed.mass - 1) * 100).toFixed(1)}% increase)`);
console.log(`  Status: ${result.wave.status}`);
console.log(`  Bridge crossings: ${result.wave.trace.bridgeCrossings}`);
console.log(`  Dipole applications: ${result.wave.trace.dipoleApplications.length}\n`);

console.log('New Field state:');
console.log(`  Phase: ${result.field.phase}`);
console.log(`  Density: ${(result.field.density * 100).toFixed(1)}%`);
console.log(`  Transformers: ${result.field.transformers.length}\n`);

// Inspect the crystallized transformer
const transformer = result.field.transformers[0];
console.log('Crystallized Topological Transformer:');
console.log(`  ID: ${transformer.id}`);
console.log(`  Start: (${transformer.startVector.gnosis.toFixed(2)}, ${transformer.startVector.praxis.toFixed(2)})`);
console.log(`  End: (${transformer.endVector.gnosis.toFixed(2)}, ${transformer.endVector.praxis.toFixed(2)})`);
console.log(`  Mass: ${transformer.mass.toFixed(3)}`);
console.log(`  → This creates a gravity well in the Field`);
console.log(`  → Future thoughts will be influenced by this path\n`);

console.log('🌌 "Every execution changes the universe for the next thought."');
