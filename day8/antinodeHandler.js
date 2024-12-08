function countAntinodes(antennas, resonance) {
    const groupedAntennas = groupAntennas(antennas);
    const antinodeLocations = new Set();
    const mapRowLength = antennas.length;
    const mapColLength = antennas[0].length;
    Object.entries(groupedAntennas).forEach(([antennaKey, antennaLocations]) => {
        const groupedAntinodeLocs = findGroupedAntinodes(antennaLocations, mapRowLength, mapColLength, resonance);
        for (let grAntiNodeLocIndx = 0; grAntiNodeLocIndx < groupedAntinodeLocs.length; grAntiNodeLocIndx++) {
            const grAntiNodeLoc = groupedAntinodeLocs[grAntiNodeLocIndx];
            if (inMap(grAntiNodeLoc, mapRowLength, mapColLength)) {
                antinodeLocations.add(grAntiNodeLoc.row + '-' + grAntiNodeLoc.col);
            }
        }
    });
    return antinodeLocations.size;
}

function groupAntennas(antennas) {
    const groupedAntennas = {};
    for (let row = 0; row < antennas.length; row++) {
        for (let column = 0; column < antennas[row].length; column++) {
            const mapValue = antennas[row][column];
            if (mapValue !== '.') {
                if (!groupedAntennas[mapValue]) {
                    groupedAntennas[mapValue] = [];
                }
                groupedAntennas[mapValue].push({row, column});
            }
        }
    }
    return groupedAntennas;
}

function findGroupedAntinodes(antennaLocations, mapRowLength, mapColLength, resonance) {
    const antinodeLocations = [];
    for (let antennaLocIndx = 0; antennaLocIndx < antennaLocations.length; antennaLocIndx++) {
        for (let nextAntennaLoc = antennaLocIndx + 1; nextAntennaLoc < antennaLocations.length; nextAntennaLoc++) {
            const start = antennaLocations[antennaLocIndx];
            const end = antennaLocations[nextAntennaLoc];
            findAntinodeLocations(start, end, mapRowLength, mapColLength, resonance).forEach((antinode) => antinodeLocations.push(antinode));
        }
    }
    return antinodeLocations;
}

function findAntinodeLocations(startNode, endNode, mapRowLength, mapColLength, resonance) {
    const { row: startRow, column: startCol } = startNode;
    const { row: endRow, column: endCol } = endNode;
    let antiNode1 = {};
    let antiNode2 = {};
    let rowDiff = startRow - endRow;
    antiNode1.row = startRow + rowDiff;
    antiNode2.row = endRow - rowDiff;
    let colDiff = startCol - endCol;
    antiNode1.col = startCol + colDiff;
    antiNode2.col = endCol - colDiff;
    const antiNodes = [antiNode1, antiNode2];
    if (resonance) {
        let nextAntiNode = { row: antiNode1.row, col: antiNode1.col };
        while (inMap(nextAntiNode, mapRowLength, mapColLength)) {
            nextAntiNode = { row: nextAntiNode.row + rowDiff, col: nextAntiNode.col + colDiff };
            antiNodes.push(nextAntiNode);
        }
        nextAntiNode = { row: antiNode2.row, col: antiNode2.col };
        while (inMap(nextAntiNode, mapRowLength, mapColLength)) {
            nextAntiNode = { row: nextAntiNode.row - rowDiff, col: nextAntiNode.col - colDiff };
            antiNodes.push(nextAntiNode);
        }
        // Adding start and end as well because they are considered to be antinodes as well
        antiNodes.push({ row: startRow, col: startCol });
        antiNodes.push({ row: endRow, col: endCol });
    }
    return antiNodes;
}

function inMap(antinode, rowLength, colLength) {
    return antinode.row > -1 && antinode.row < rowLength && antinode.col > -1 && antinode.col < colLength;
}

module.exports = {
    countAntinodes
}