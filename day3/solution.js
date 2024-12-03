const fs = require('fs');
const mulParser = require('./mulParser')
const mulParserSwitched = require('./mulParserSwitched')

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

        console.log('Result of switched multiplications is ', mulParserSwitched(inputText));
    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
solution();
