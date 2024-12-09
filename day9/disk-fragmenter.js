function fragmentDisk(diskMap) {
    const files = []; // even indexes
    const freeSpace = []; // odd indexes
    for (let diskMapIndx = 0; diskMapIndx < diskMap.length; diskMapIndx++) {
        if (diskMapIndx % 2 === 0) {
            files.push(diskMap[diskMapIndx]);
        } else {
            freeSpace.push(diskMap[diskMapIndx]);
        }
    }
    const compactedResult = [];
    for (let fileIndx = 0; fileIndx < files.length; fileIndx++) {
        const fileId = fileIndx;
        const file = files[fileId];
        for (let times = 0; times < Number(file); times++) {
            compactedResult.push(fileId);
        }
        if (freeSpace[fileId]) {
            for (let times = 0; times < freeSpace[fileId]; times++) {
                compactedResult.push('.');
            }
        }
    }
    while (gapsRemaining(compactedResult)) {
        moveFileFromRightToLeft(compactedResult);
    }
    return compactedResult;
}

function gapsRemaining(result) {
    for (let indx = result.indexOf('.'); indx < result.length; indx++) {
        if (result[indx] !== '.') {
            return true;
        }
    }
    return false;
}

function moveFileFromRightToLeft(result) {
    const lastLetterIndex = findLastLetterIndex(result);
    if (lastLetterIndex > -1) {
        swap(result, result.indexOf('.'), lastLetterIndex);
    }
}

function findLastLetterIndex(result) {
    for (let indx = result.length - 1; indx >= 0; indx--) {
        if (result[indx] !== '.') {
            return indx;
        }
    }
    return -1;
}

function swap(result, index1, index2) {
    const temp = result[index1];
    result[index1] = result[index2];
    result[index2] = temp;
}

function calculateChecksum(result) {
    let checksum = 0;
    for (let resultIndx = 0; resultIndx < result.indexOf('.'); resultIndx++) {
        checksum += resultIndx * Number(result[resultIndx]);
    }
    return checksum;
}

module.exports = {
    fragmentDisk,
    calculateChecksum
};
