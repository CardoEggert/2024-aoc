const fs = require('fs');
const csv = require('csv-parser');
const { countAntinodes } = require('./antinodeHandler');

// Function to parse the CSV and return results as a Promise
async function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const antennas = [];

        fs.createReadStream(filePath)
            .pipe(csv({ headers: false}))
            .on('data', (row) => {
                antennas.push(Object.values(row)[0].split(''));
            })
            .on('end', () => {
                resolve({ antennas });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

async function main() {
    try {
        // Await the parsing results
        const { antennas } = await parseCsv('input.txt');
        console.log('How many unique locations within the bounds of the map contain an antinode? Answer: ', countAntinodes(antennas));
    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
main();
