function safeValidator(input) {
    // Expecting input to be an array of numbers
    const decreasing = input[0] - input[1] > 0;
    for (let i = 0; i < input.length - 1; i++) {
        const diff = input[i] - input[i + 1];
        if (decreasing) {
            if (diff > 0 && diff < 4) {
                continue;
            } else {
                return false;
            }
        } else {
            if (diff < 0 && diff > -4) {
                continue;
            } else {
                return false;
            }
        }
    }
    return true;
}

module.exports = safeValidator;
