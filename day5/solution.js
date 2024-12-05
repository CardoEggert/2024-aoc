const fs = require('fs');
const csv = require('csv-parser');
const  { orderChecker } = require('./orderChecker');
const  orderFixer = require('./orderFixer');

// Function to parse the CSV and return results as a Promise
async function parseCsv(filePath) {
    return new Promise((resolve, reject) => {
        const orderRules = [];
        const updates = [];

        fs.createReadStream(filePath)
            .pipe(csv({ headers: false}))
            .on('data', (row) => {
                const res = Object.values(row);
                if (res && res.length === 1 && res[0].indexOf('|') > -1) {
                    orderRules.push(res[0].split('|').map(Number));
                } else if (res && res.length === 0) {
                } else {
                    updates.push(res.map(Number));
                }
            })
            .on('end', () => {
                resolve({ orderRules, updates });
            })
            .on('error', (err) => {
                reject(err);
            });
    });
}

async function main() {
    try {
        // Await the parsing results
        const { orderRules, updates } = await parseCsv('input.txt');

        const validOrders = orderChecker(orderRules, updates);
        console.log('Valid orders are: ', validOrders);

        const middlePages = [];
        for (let i = 0; i < validOrders.length; i++) {
            const validOrder = validOrders[i];
            const middleIndex = Math.floor(validOrder.length / 2);
            middlePages.push(validOrder[middleIndex]);
        }
        console.log('Middle pages are: ', middlePages);

        console.log('Sum of middle pages are: ', middlePages.reduce((acc, curr) => acc + curr, 0));

        const fixedOrders = orderFixer(orderRules, updates);
        console.log('Fixed orders are: ', fixedOrders);

        const fixedMiddlePages = [];
        for (let i = 0; i < fixedOrders.length; i++) {
            fixedMiddlePages.push(fixedOrders[i][Math.floor(fixedOrders[i].length / 2)]);
        }
        console.log('Fixed middle pages are: ', fixedMiddlePages);

        console.log('Sum of fixed middle pages are: ', fixedMiddlePages.reduce((acc, curr) => acc + curr, 0));


    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
main();
