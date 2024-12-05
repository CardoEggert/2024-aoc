const fs = require('fs');
const csv = require('csv-parser');
const xmasCounter = require('./xmascounter');
const masCounter = require('./mascounter');

// Function to parse the CSV and return results as a Promise
async function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv({ headers: false, separator: ' ' }))
            .on('data', (row) => {
                results.push(Object.values(row));
            })
            .on('end', () => {
                resolve({ results });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

async function main() {
    try {
        // Await the parsing results
        const { results } = await parseCsv('input.txt');

        const xmasCount = xmasCounter(results);
        console.log('XMAS count: ', xmasCount)

        const masCount = masCounter(results);
        console.log('MAS count: ', masCount);

    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
main();
