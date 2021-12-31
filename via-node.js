// Supporting local development and anyone not using a package manager.
try {
    // If using package manager.
    const Brainfuck = require('brainf-ck/brainfuck');
} catch(e) {
    // If not...
    const Brainfuck = require('brainfuck');
}

// Run...
new Brainfuck({ viaNode: true });
