import csv from 'csvtojson'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, "./Leeser-Letters2 (1).csv");
const jsonFilePath = path.join(__dirname, '../src/data/items.json')

const parseMultiFields = (item, baseField, count = 20) => {
	const values = [];
	for (let i = 0; i < count; i++) {
		const field = i === 0 ? baseField : `${baseField} ${i}`;
		if (item[field]) values.push(item[field].trim());
	}
	return values.filter(Boolean);
};

(async () => {
	try {
		const jsonArray = await csv({ separator: "," }).fromFile(csvFilePath);

		const formattedData = jsonArray.map((item, index) => {
			const creators = parseMultiFields(item, 'dcterms:creator', 20);
			const contributors = parseMultiFields(item, 'dcterms:contributor', 10);

			const authorLat = parseFloat(item['author latitude']);
			const authorLng = parseFloat(item['author longitude']);
			const recipientLat = parseFloat(item['recipient latitude']);
			const recipientLng = parseFloat(item['recipient longitude']);

			return {
				id: item['dcterms:identifier'] || '',
				tei: item['xml'],
				arkId: item['ARK ID(2)'] || '',
				title: item['dcterms:title'] || item['Title'] || '',
				type: item['Type'] || '',
				hebrewDate: item['Hebrew Date'] || '',
				dateWritten: item['dcterms:date'] || item['date written'] || '',
				hasFormat: item['hasFormat'] || '',
				link: item['Link'] || '',
				collection: item['Collection'] || '',
				collectionUri: item['Collection uri'] || '',
				duplicate: item['Duplicate'] || '',
				refersToOccident: item['Refers to the Occident'] || '',
				slug: item['dcterms:identifier 2'] || '',
				altIdentifier2: item['dcterms:identifier 2 1'] || '',
				creators,
				creatorsUri: item['dcterms:creator,uri'] || '',
				source: item['dcterms:source'] || '',
				fromLocation: item['fromLocation'] || '',
				toLocation: item['toLocation'] || '',
				spatialCoverage: item['dcterms:spatialcoverage'] || '',
				gettyId: item['Getty Thesaurus of Geographic Names ID'] || '',
				authorCoordinates: (!isNaN(authorLat) && !isNaN(authorLng)) ? { lat: authorLat, lng: authorLng } : null,
				recipientCoordinates: (!isNaN(recipientLat) && !isNaN(recipientLng)) ? { lat: recipientLat, lng: recipientLng } : null,
				contributors,
				format: item['dcterms:format'] || '',
				thumbnail: item['thumbnail'] || '',
				language: item['dcterms:language'] || '',
				column: item['Column'] || '',
				booksellerEditor: item['bookseller_editor'] || '',
				agent: item['agent'] || '',
				correspondent: item['correspondent'] || '',
				religiousLeader: item['Religious Leader'] || '',
				christian: item['Christian'] || '',
				postmaster: item['Postmaster'] || '',
				url2: item['URL 2'] || '',
				filepath: item['filepath'] || ''
			};
		});

		await fs.writeFile(jsonFilePath, JSON.stringify(formattedData, null, 2), 'utf-8');
		console.log('CSV to JSON conversion completed.');
	} catch (err) {
		console.error('Error converting CSV to JSON:', err);
	}
})();