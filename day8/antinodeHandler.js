function countAntinodes(antennas) {
    const groupedAntennas = groupAntennas(antennas);
    const antinodeLocations = new Set();
    const mapRowLength = antennas.length;
    const mapColLength = antennas[0].length;
    Object.entries(groupedAntennas).forEach(([antennaKey, antennaLocations]) => {
        const groupedAntinodeLocs = findGroupedAntinodes(antennaLocations);
        for (let grAntiNodeLocIndx = 0; grAntiNodeLocIndx < groupedAntinodeLocs.length; grAntiNodeLocIndx++) {
            const grAntiNodeLoc = groupedAntinodeLocs[grAntiNodeLocIndx];
            if (grAntiNodeLoc.row > -1 && grAntiNodeLoc.row < mapRowLength
                && grAntiNodeLoc.col > -1 && grAntiNodeLoc.col < mapColLength) {
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

function findGroupedAntinodes(antennaLocations) {
    const antinodeLocations = [];
    for (let antennaLocIndx = 0; antennaLocIndx < antennaLocations.length; antennaLocIndx++) {
        for (let nextAntennaLoc = antennaLocIndx + 1; nextAntennaLoc < antennaLocations.length; nextAntennaLoc++) {
            const start = antennaLocations[antennaLocIndx];
            const end = antennaLocations[nextAntennaLoc];
            findAntinodeLocations(start, end).forEach((antinode) => antinodeLocations.push(antinode));
        }
    }
    return antinodeLocations;
}

function findAntinodeLocations(startNode, endNode) {
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
    return [antiNode1, antiNode2];
}

module.exports = {
    countAntinodes
}