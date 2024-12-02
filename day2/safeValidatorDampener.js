const safeValidator = require('./safeValidator');

function safeValidatorDampener(input) {
    const validatedInput = safeValidator(input);
    const dampeningNeeded = !validatedInput;
    if (dampeningNeeded) {
        const allVariants = input.map((_, indexToRemove) => input.filter((_, index) => index !== indexToRemove));
        for (let variantIndx = 0; variantIndx < allVariants.length; variantIndx++) {
            const variant = allVariants[variantIndx];
            if (safeValidator(variant)) {
                return true;
            }
        }
        return false;
    }
    return validatedInput;
}

module.exports = safeValidatorDampener;
