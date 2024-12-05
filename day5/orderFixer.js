const { isValidUpdate, findValidOrderRules, findNextPages, findPagesAfterIndex } = require('./orderChecker');

function orderFixer(orderRules, updates) {
    const fixedUpdates = [];
    const nonValidUpdates = findNonValidUpdates(orderRules, updates);
    for (let nonValidUpdatesIndx = 0; nonValidUpdatesIndx < nonValidUpdates.length; nonValidUpdatesIndx++) {
        const nonValidUpdate = nonValidUpdates[nonValidUpdatesIndx];
        const validOrderRules = findValidOrderRules(orderRules, nonValidUpdate);
        fixedUpdates.push(fixUpdate(validOrderRules, nonValidUpdate));
    }
    return fixedUpdates;
}

function findNonValidUpdates(orderRules, updates) {
    const nonValidUpdates = [];
    for (let updateIndx = 0; updateIndx < updates.length; updateIndx++) {
        const update = updates[updateIndx];
        if (!isValidUpdate(orderRules, update)) {
            nonValidUpdates.push(update);
        }
    }
    return nonValidUpdates;
}

function fixUpdate(validOrderRules, nonValidUpdate) {
    const copyOfUpdate = [...nonValidUpdate];
    while (!isValidUpdate(validOrderRules, copyOfUpdate)) {
        for (let pageIndx = 0; pageIndx < copyOfUpdate.length; pageIndx++) {
            const page = copyOfUpdate[pageIndx];
            const nextPages = findNextPages(validOrderRules, page);
            const conflictingPages = findConflictingPages(nextPages, copyOfUpdate, pageIndx);
            if (conflictingPages.length > 0) {
                const highestConflictingIndex = findHighestConflictingIndex(copyOfUpdate, conflictingPages);
                swap(copyOfUpdate, pageIndx, highestConflictingIndex);
                break;
            }
        }
    }
    return copyOfUpdate;
}

function findHighestConflictingIndex(update, conflictingPages) {
    let highest = -1;
    for (let conflictingPageIndx = 0; conflictingPageIndx < conflictingPages.length; conflictingPageIndx++) {
        const conflictingPage = conflictingPages[conflictingPageIndx];
        const pageIndex = update.indexOf(conflictingPage);
        if (pageIndex > highest) {
            highest = pageIndex;
        }
    }
    return highest;
}

function swap(update, index1, index2) {
    const temp = update[index1];
    update[index1] = update[index2];
    update[index2] = temp;
}

function findConflictingPages(nextPages, update, pageIndx) {
    const conflictingPages = [];
    const afterPages = findPagesAfterIndex(update, pageIndx);
    for (let nextPageIndx = 0; nextPageIndx < nextPages.length; nextPageIndx++) {
        const nextPage = nextPages[nextPageIndx];
        if (afterPages.indexOf(nextPage) === -1) {
            conflictingPages.push(nextPage);
        }
    }
    return conflictingPages;
}


module.exports = orderFixer;
