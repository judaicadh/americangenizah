// pushToAlgolia.mjs
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { algoliasearch } from 'algoliasearch';

// ─── 1. Resolve __dirname & load .env ───────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../..', '.env')
});

// ─── 2. Validate env vars ───────────────────────────────────────────────────────
const { ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY } = process.env;
if (!ALGOLIA_APP_ID || !ALGOLIA_ADMIN_KEY) {
  console.error('⚠️  Missing ALGOLIA_APP_ID or ALGOLIA_ADMIN_KEY in .env');
  process.exit(1);
}

// ─── 3. Initialize Algolia ──────────────────────────────────────────────────────
const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_KEY);

// ─── 4. Helpers ─────────────────────────────────────────────────────────────────
const siteBaseUrl = 'https://judaicadhpenn.org/americangeninzah/';
const jsonFilePath = path.join(__dirname, '../data/items.json')

const flattenHierarchicalCategories = (categories = {}) => ({
  'hierarchicalCategories.lvl0': categories.lvl0?.[0] || null,
  'hierarchicalCategories.lvl1': categories.lvl1?.[0] || null,
  'hierarchicalCategories.lvl2': categories.lvl2?.[0] || null,
});

const formatRecord = (record) => {
  return {
    ...record,
    objectID: record.id,
    url: `${siteBaseUrl}item/${record.slug}`,

   };
};

async function pushDataToAlgolia(records) {
  try {
    const formattedRecords = records.map(formatRecord);

    console.log('Formatted Records:', JSON.stringify(formattedRecords, null, 2))

    // Push records to Algolia
    const response = await client.saveObjects({
      indexName: 'Dev_Genizah',
      objects: formattedRecords
    })
    console.log('Objects saved successfully:', response.objectIDs)
  } catch (error) {
    console.error('Error pushing data to Algolia:', error.message, error.stack)
  }
}

// Load data from JSON and push to Algolia
(async () => {
  try {
    const fileContent = await fs.readFile(jsonFilePath, 'utf-8')
    const records = JSON.parse(fileContent)

    console.log('Loaded Records:', records.length)

    await pushDataToAlgolia(records)
  } catch (error) {
    console.error('Error loading or processing JSON file:', error.message, error.stack)
  }
})()
    // Use saveObjects to add or update records in Algolia


