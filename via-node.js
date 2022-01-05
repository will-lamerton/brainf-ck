/**
 * Method to return the correct module location based on whether we might be
 * using a package manager or not.
 * @return {function}
 */
function module() {
    try {
        // If using package manager.
        require.resolve('brainf-ck/brainfuck');
        return require('brainf-ck/brainfuck');

    } catch (e) {
        // If not...
        return require('./brainfuck');
    }
}

// Get module.
const Brainfuck = module();

// Run...
new Brainfuck({ viaNode: true });
