const fs = require('fs');
const csv = require('csv-parser');
const { trackGuard } = require('./guardTracker');
const countPossibleBlocks = require('./guardBlocker');

// Function to parse the CSV and return results as a Promise
async function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const map = [];

        fs.createReadStream(filePath)
            .pipe(csv({ headers: false}))
            .on('data', (row) => {
                const res = Object.values(row);
                map.push(res[0].split(''));
            })
            .on('end', () => {
                resolve({ map });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

async function main() {
    try {
        // Await the parsing results
        const { map } = await parseCsv('input.txt');

        // Track guard
        const guardTracked = trackGuard(map);
        let distinctCount = 0;
        for (let y = 0; y < guardTracked.length; y++) {
            for (let x = 0; x < guardTracked[y].length; x++) {
                if (guardTracked[y][x] === 'X') {
                    distinctCount += 1;
                }
            }
        }
        console.log('Count of distinct positions is ', distinctCount)

        // Find possible looping count
        console.log('Count of possible obstructions are ' , countPossibleBlocks(map));
    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
main();
