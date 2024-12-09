function fragmentDisk(diskMap, wholeDisk) {
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
    if (wholeDisk) {
        moveWholeFilesFromRightToLeft(compactedResult);
    } else {
        while (gapsRemaining(compactedResult)) {
            moveFileFromRightToLeft(compactedResult);
        }
    }
    return compactedResult;
}

function moveWholeFilesFromRightToLeft(result) {
    const fileIdsDecreasing = getFileIdsDecreasing(result);
    for (let fileIdIndx = 0; fileIdIndx < fileIdsDecreasing.length; fileIdIndx++) {
        const fileId = fileIdsDecreasing[fileIdIndx];
        if (fileIdIndx % 100 === 0) {
            console.log('Handling ', fileIdIndx, ' of ', fileIdsDecreasing.length);
        }
        const requiredSize = result.filter(f => f === fileId).length;
        if (fileMovable(result, fileId, requiredSize)) {
            for (let resultIndx = result.indexOf('.'); resultIndx < result.lastIndexOf('.'); resultIndx++) {
                if (result[resultIndx] === '.' && fileIdFits(result, resultIndx, requiredSize)) {
                    moveWholeFile(result, fileId, resultIndx, requiredSize);
                    break;
                }
            }
        }
    }
}

function moveWholeFile(result, fileId, freeSpaceStartIndex, requiredSize) {
    for (let freeSpaceIndx = freeSpaceStartIndex; freeSpaceIndx < freeSpaceStartIndex + requiredSize; freeSpaceIndx++) {
        swap(result, freeSpaceIndx, result.lastIndexOf(fileId));
    }
}

function gapsRemaining(result) {
    for (let indx = result.indexOf('.'); indx < result.length; indx++) {
        if (result[indx] !== '.') {
            return true;
        }
    }
    return false;
}

function getFileIdsDecreasing(result) {
    const fileIds = [...new Set(result.filter(f => f !== '.'))];
    fileIds.sort((a, b) => b - a);
    return fileIds;
}

function fileMovable(result, fileId, requiredSize) {
    for (let i = result.indexOf('.'); i < result.indexOf(fileId); i++) {
        if (fileIdFits(result, i, requiredSize)) {
            return true;
        }
    }
    return false;
}

function fileIdFits(result, resultIndx, requiredSize) {
    let address = '';
    for (let i = resultIndx; i < resultIndx + requiredSize; i++) {
        address += result[i];
    }
    return address === '.'.repeat(requiredSize);
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
    for (let resultIndx = 0; resultIndx < result.length; resultIndx++) {
        if (result[resultIndx] !== '.') {
            checksum += resultIndx * Number(result[resultIndx]);
        }
    }
    return checksum;
}

module.exports = {
    fragmentDisk,
    calculateChecksum
};
