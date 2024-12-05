function orderChecker(orderRules, updates) {
    const validUpdates = [];
    for (let updateIndx = 0; updateIndx < updates.length; updateIndx++) {
        const update = updates[updateIndx];
        if (isValidUpdate(orderRules, update)) {
            validUpdates.push(update);
        }
    }
    return validUpdates;
}

function isValidUpdate(orderRules, update) {
    const validRules = findValidOrderRules(orderRules, update);
    for (let i = 0; i < update.length; i++) {
        const page = update[i];
        const afterPages = findPagesAfterIndex(update, i);
        const nextPages = findNextPages(validRules, page);
        if (nextPages) {
            for (let nextPageIndx = 0; nextPageIndx < nextPages.length; nextPageIndx++) {
                const nextPage = nextPages[nextPageIndx];
                if (afterPages.indexOf(nextPage) === -1) {
                    return false;
                }
            }
        }
    }
    return true;
}

function findValidOrderRules(orderRules, update) {
    const validOrderRules = [];
    for (let orderRule of orderRules) {
        if (update.indexOf(orderRule[0]) > -1 && update.indexOf(orderRule[1]) > -1) {
            validOrderRules.push(orderRule);
        }
    }
    return validOrderRules;
}

function findPagesAfterIndex(update, index) {
    const pages = [];
    for (let updateIndex = index; updateIndex < update.length; updateIndex++) {
        pages.push(update[updateIndex]);
    }
    return pages;
}

function findNextPages(orderRules, page) {
    const nextPages = [];
    for (let orderRule of orderRules) {
        if (orderRule[0] === page) {
            nextPages.push(orderRule[1]);
        }
    }
    return nextPages;
}

module.exports = orderChecker;
