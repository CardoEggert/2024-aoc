const fs = require('fs');
const mulParser = require('./mulParser')

async function parseTxt(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }
            console.log(data);
            resolve({ inputText: data });
        });
    });
}

async function solution() {
    try {
        // Await the parsing results
        const { inputText } = await parseTxt('input.txt');

        console.log('Result of multiplications is ', mulParser(inputText));
    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
solution();
