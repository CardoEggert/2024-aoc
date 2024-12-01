const fs = require('fs');
const csv = require('csv-parser');

// Function to parse the CSV and return results as a Promise
async function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const leftResults = [];
        const rightResults = [];

        fs.createReadStream(filePath)
            .pipe(csv({ headers: false, separator: ' ' }))
            .on('data', (row) => {
                const res = Object.values(row).filter(element => element !== '').map(Number);
                leftResults.push(res[0]);
                rightResults.push(res[1]);
            })
            .on('end', () => {
                resolve({ leftResults, rightResults });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

async function main() {
    try {
        // Await the parsing results
        const { leftResults, rightResults } = await parseCsv('input.txt');

        // Sort the results after parsing
        const leftResultsOrdered = leftResults.sort((a, b) => a - b);
        const rightResultsOrdered = rightResults.sort((a, b) => a - b);

        // Calculate diff of each index
        const diffList = [];
        for (let i = 0; i < leftResultsOrdered.length; i++) {
            const left = leftResultsOrdered[i];
            const right = rightResultsOrdered[i];
            diffList.push(Math.max(left, right) - Math.min(left,right));
        }

        // Sum up the diffs
        const sum = diffList.reduce((acc, el) => acc + el, 0);
        console.log('Sum of diffs is ', sum);

        // Similarity score
        const similarities = [];
        for (let i = 0; i < leftResultsOrdered.length; i++) {
            const nrOfLeftList = leftResultsOrdered[i];
            const occurencesInRightList = rightResultsOrdered.filter(element => element === nrOfLeftList).length;
            similarities.push(nrOfLeftList * occurencesInRightList);
        }

        // Sum up the similarity score
        const similaritySum = similarities.reduce((acc, el) => acc + el, 0);
        console.log('Sum of similarities is ', similaritySum);

    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
main();
