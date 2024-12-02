const fs = require('fs');
const csv = require('csv-parser');
const safeValidator = require('./safeValidator');
const safeValidatorDampened = require('./safeValidatorDampener');

// Function to parse the CSV and return results as a Promise
async function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv({ headers: false, separator: ' ' }))
            .on('data', (row) => {
                const res = Object.values(row).map(Number);
                results.push(res);
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

        let safeCount = 0;
        results.forEach(result => {
            if (safeValidator(result)) {
                safeCount++;
            }
        });
        console.log('Safe count is ', safeCount);

        let dampenedSafeCount = 0;
        results.forEach(result => {
            if (safeValidatorDampened(result)) {
                dampenedSafeCount++;
            }
        });
        console.log('Dampened safe count is ', dampenedSafeCount);

    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
main();
