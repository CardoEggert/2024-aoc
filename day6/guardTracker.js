function trackGuard(map) {
    let editedMap = structuredClone(map);
    let guardInformation = findGuard(map);
    while (guardInformation.onMap) {
        guardInformation = moveGuard(editedMap, guardInformation);
    }
    return editedMap;
}

function guardOnMap(map) {
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (['^', 'v', '>', '<'].indexOf(map[y][x]) > -1) {
                return true;
            }
        }
    }
    return false;
}

function findGuard(map) {
    const guardInfo = {};
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[y].length; x++) {
            if (['^', 'v', '>', '<'].indexOf(map[y][x]) > -1) {
                guardInfo['direction'] = map[y][x];
                guardInfo['y'] = y;
                guardInfo['x'] = x;
                guardInfo['onMap'] = true;
            }
        }
    }
    return guardInfo;
}

function moveGuard(editedMap, guardInformation) {
    const { direction, x, y } = guardInformation;
    const nextPos = findNextPosition(direction, x, y);
    if (isNextPosOnMap(editedMap, nextPos.x, nextPos.y)) {
        if (nextPosBlocker(editedMap, nextPos.x, nextPos.y)) {
            return turnGuard(editedMap, guardInformation);
        }
        return moveGuardForward(editedMap, guardInformation, nextPos)
    }
    editedMap[y][x] = 'X';
    return { onMap: false }
}

function findNextPosition(direction, x, y) {
    const nextPos = {};
    if (direction === '^') {
        nextPos.y = y - 1;
        nextPos.x = x;
    } else if (direction === 'v') {
        nextPos.y = y + 1;
        nextPos.x = x;
    } else if (direction === '>') {
        nextPos.y = y;
        nextPos.x = x + 1;
    } else if (direction === '<') {
        nextPos.y = y;
        nextPos.x = x - 1;
    }
    return nextPos;
}

function isNextPosOnMap(editedMap, x, y) {
    return y > -1 && editedMap.length > y && x > -1 && editedMap[0].length > x;
}

function nextPosBlocker(editedMap, x, y) {
    return editedMap[y][x] === '#';
}

function turnGuard(editedMap, guardInformation) {
    const { direction, x, y } = guardInformation;
    let newDirection;
    if (direction === '^') {
        newDirection = '>';
    } else if (direction === 'v') {
        newDirection = '<';
    } else if (direction === '>') {
        newDirection = 'v';
    } else if (direction === '<') {
        newDirection = '^';
    }
    editedMap[y][x] = newDirection;
    return { direction: newDirection, y: y, x: x, onMap: true };
}

function moveGuardForward(editedMap, guardInformation, nextPos) {
    const { direction, x, y } = guardInformation;
    editedMap[nextPos.y][nextPos.x] = direction;
    editedMap[y][x] = 'X';
    return { direction, y: nextPos.y, x: nextPos.x, onMap: true };
}

module.exports = {
    trackGuard,
    guardOnMap,
    findGuard,
    moveGuard
};