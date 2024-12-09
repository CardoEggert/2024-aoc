const fs = require('fs');
const { fragmentDisk, calculateChecksum } = require('./disk-fragmenter');

async function parseTxt(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading the file:', err);
                return;
            }
            resolve({ inputText: data });
        });
    });
}

async function solution() {
    try {
        // Await the parsing results
        const { inputText } = await parseTxt('input.txt');
        const fragmentedDisk = fragmentDisk(inputText, false);
        console.log('Checksum is : ', calculateChecksum(fragmentedDisk));
        const fragmentedWholeDisk = fragmentDisk(inputText, true);
        console.log('Checksum is (whole disk): ', calculateChecksum(fragmentedWholeDisk));
    } catch (error) {
        console.error('Error processing the CSV file:', error);
    }
}

// Run the main function
solution();
