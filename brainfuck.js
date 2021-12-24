/**
 * Small initialiser class - takes the source and, lexes, parses it and then
 * passes it to the interpreter in the form of an AST.
 */
class Brainfuck {
    /**
     * Constructor
     * @param {object} options - options for the interpreter.
     * @return {void}
     */
    constructor(options)
    {
        // Init the output class.
        const Output =  require('./src/lang/output');
        const output = new Output;

        // Options...
        this.options = options;

        // Set the source equal to `null` which means the interpreter until we
        // know the source.
        this.source = null;

        // Check the options, parse program and run interpreter, if we encounter
        // problems, we'll catch the error
        try {
            this.checkOptions();

            // Lex & parse the program source.
            const Program = require('./src/program');
            this.program = new Program(this.source);

            // Interpret the AST created in the program class.
            const Interpreter = require('./src/interpreter');
            new Interpreter(this.program.ast, output);

            // Once we're done executing instructions, we'll take the output stack and
            // create a console output for it.
            output.compileOutputStack();

        } catch (e) {
            output.error(e);
        }
    }

    /**
     * Method to check options passed to the class.
     * @return {void}
     */
    checkOptions()
    {
        // We must have { `viaNode`: true|fase | passed as an option to tell
        // the interpreter whether to run from the command line or via the API.
        if (this.options.viaNode === undefined || typeof this.options.viaNode != 'boolean') {
            throw 'Expected running environment in options object not found or wrong type.\n\nAdd `viaNode`. { viaNode: true|false }';
        }

        // If `viaNode` == true, return as the program class should fetch the
        // source from the command line.
        if (this.options.viaNode) {
            return;
        }

        // If we're not running via Node, we'll require a `source` passed as a
        // string...
        if (this.options.source === undefined || typeof this.options.source != 'string') {
            throw 'Expected string source in options object not found or wrong type.\n\nAdd `source`. { source: "BRAINFUCK_PROGRAM" }';
        }

        // If that's all good, set the source equal to the source passed as an
        // option and return!
        this.source = this.options.source;

        return;
    }
}

module.exports = Brainfuck;
