function trackGuard(map) {
    let editedMap = [...map];
    while (guardOnMap(editedMap)) {
        const guardInformation = findGuard(editedMap);
        if (guardInformation && guardInformation.direction) {
            editedMap = moveGuard(editedMap, guardInformation);
        }
    }
    return editedMap;
}

function guardOnMap(map) {
    for (let x = 0; x < map.length; x++) {
        for (let y = 0; y < map[x].length; y++) {
            if (['^', 'v', '>', '<'].indexOf(map[x][y]) > -1) {
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
            }
        }
    }
    return guardInfo;
}

function moveGuard(editedMap, guardInformation) {
    const mapCopy = [...editedMap];
    const { direction, x, y } = guardInformation;
    const nextPos = findNextPosition(direction, x, y);
    if (isNextPosOnMap(editedMap, nextPos.x, nextPos.y)) {
        if (nextPosBlocker(editedMap, nextPos.x, nextPos.y)) {
            return turnGuard(editedMap, guardInformation);
        }
        return moveGuardForward(editedMap, guardInformation, nextPos)
    }
    mapCopy[y][x] = 'X';
    return mapCopy
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
    const mapCopy = [...editedMap];
    const { direction, x, y } = guardInformation;
    if (direction === '^') {
        mapCopy[y][x] = '>';
    } else if (direction === 'v') {
        mapCopy[y][x] = '<';
    } else if (direction === '>') {
        mapCopy[y][x] = 'v';
    } else if (direction === '<') {
        mapCopy[y][x] = '^';
    }
    return mapCopy;

}

function moveGuardForward(editedMap, guardInformation, nextPos) {
    const mapCopy = [...editedMap];
    const { direction, x, y } = guardInformation;
    mapCopy[nextPos.y][nextPos.x] = direction;
    mapCopy[y][x] = 'X';
    return mapCopy;
}

module.exports = trackGuard;