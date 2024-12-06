const { findGuard, moveGuard } = require('./guardTracker');

function countPossibleBlocks(map) {
    let count = 0;
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (map[y][x] === '.' && isGuardInLoop(map, y, x)) {
                count += 1;
            }
        }
    }
    return count;
}

function isGuardInLoop(obstructedMap, obstructionY, obstructionX) {
    let editedMap = structuredClone(obstructedMap);
    editedMap[obstructionY][obstructionX] = '#';
    let loopCount = 0;
    let guardInformation = findGuard(obstructedMap);
    while (guardInformation.onMap) {
        if (loopCount >= 50000) {
            return true;
        }
        guardInformation = moveGuard(editedMap, guardInformation);
        loopCount += 1;
    }
    return false;
}

module.exports = countPossibleBlocks;