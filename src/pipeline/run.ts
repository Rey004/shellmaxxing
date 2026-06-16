import * as fs from 'fs';
import * as path from 'path';
import { getRawCommandEntries } from './sources.js';
import { normalizeEntry } from './normalizer.js';
import { deduplicateEntries } from './deduplicator.js';
import { validateEntry } from './validator.js';
import { CommandEntry } from './types.js';

const OUTPUT_DIR = path.resolve(process.cwd(), 'src/data/categories');

async function runPipeline() {
  console.log('🚀 Shellmaxxing Pipeline: Starting Automated Dataset Generation...');

  try {
    // 1. Fetch and parse raw entries from sources
    const rawEntries = await getRawCommandEntries();
    console.log(`📥 Loaded ${rawEntries.length} raw entries from sources.`);

    // 2. Normalize entries
    const normalized = rawEntries.map(entry => normalizeEntry(entry));
    console.log('🧹 Normalization complete.');

    // 3. Deduplicate and merge records
    const deduplicated = deduplicateEntries(normalized);
    console.log(`✂️ Deduplication complete: Reduced from ${normalized.length} to ${deduplicated.length} entries.`);

    // 4. Validate and classify
    const validated: CommandEntry[] = [];
    for (const entry of deduplicated) {
      if (validateEntry(entry)) {
        validated.push(entry);
      }
    }
    console.log(`✅ Validation complete: ${validated.length} valid entries remaining.`);

    // 5. Group by category
    const categoriesMap = new Map<string, CommandEntry[]>();
    for (const entry of validated) {
      const cat = entry.category;
      if (!categoriesMap.has(cat)) {
        categoriesMap.set(cat, []);
      }
      categoriesMap.get(cat)!.push(entry);
    }

    // 6. Ensure output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
      console.log(`📁 Created output directory: ${OUTPUT_DIR}`);
    }

    // 7. Write categorized JSON files
    console.log('💾 Writing categorized JSON datasets...');
    for (const [category, entries] of categoriesMap.entries()) {
      const filePath = path.join(OUTPUT_DIR, `${category}.json`);
      fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), 'utf-8');
      console.log(`  - 📝 Written ${entries.length} commands to category "${category}" -> src/data/categories/${category}.json`);
    }

    console.log('🎉 Shellmaxxing Pipeline: Dataset generation successfully completed!');
  } catch (error) {
    console.error('❌ Shellmaxxing Pipeline: Failed during generation.', error);
    process.exit(1);
  }
}

runPipeline();
