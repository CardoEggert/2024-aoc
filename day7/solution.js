const fs = require('fs');
const csv = require('csv-parser');
const { isPossibleToCalibrate } = require('./calibrationHandler');

// Function to parse the CSV and return results as a Promise
async function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const calibrations = [];

        fs.createReadStream(filePath)
            .pipe(csv({ headers: false}))
            .on('data', (row) => {
                const resSplit = Object.values(row)[0].split(': ');

                calibrations.push({ expected: Number(resSplit[0]), numbers: resSplit[1].split(' ').map(Number)});
            })
            .on('end', () => {
                resolve({ calibrations });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

async function main() {
    try {
        // Await the parsing results
        const { calibrations } = await parseCsv('input.txt');

        const possibleCalibrationsWithoutConcatenation = [];
        for (let calibrationIndx = 0; calibrationIndx < calibrations.length; calibrationIndx++) {
            const calibration = calibrations[calibrationIndx];
            if (isPossibleToCalibrate(calibration, ['+', '*'])) {
                possibleCalibrationsWithoutConcatenation.push(calibration.expected);
            }
        }
        console.log('Sum of + and * possible calibrations are ', possibleCalibrationsWithoutConcatenation.reduce((acc, currentValue) => acc + currentValue, 0));

        const possibleCalibrationsWithConcatenation = [];
        for (let calibrationIndx = 0; calibrationIndx < calibrations.length; calibrationIndx++) {
            const calibration = calibrations[calibrationIndx];
            if (isPossibleToCalibrate(calibration, ['+', '*', '||'])) {
                possibleCalibrationsWithConcatenation.push(calibration.expected);
            }
        }
        console.log('Sum of +, *, and || possible calibrations are ', possibleCalibrationsWithConcatenation.reduce((acc, currentValue) => acc + currentValue, 0));

    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
main();
