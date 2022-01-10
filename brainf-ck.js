import {Output} from './src/lang/output.js';
import {Program} from './src/program.js';
import {Interpreter} from './src/interpreter.js';

/**
 * Small initialiser class - takes the source and lexes, parses it and then
 * passes it to the interpreter in the form of an AST.
 */
export class Brainfuck {
    /**
     * Constructor
     * @param {object} options - options for the interpreter.
     * @return {void}
     */
    constructor(options)
    {
        // Init the output class.
        const output = new Output;

        // Options...
        this.options = options;

        // Set the source equal to `undefined` until we know the source.
        this.source = undefined;

        // Check the options, parse program and run interpreter, if we encounter
        // problems, we'll catch the error
        try {
            this.checkOptions();

            // Lex & parse the program source.
            this.program = new Program(this.source);

            // Interpret the AST created in the program class.
            new Interpreter(this.program.ast, output);

            // Once we're done executing instructions, we'll take the output stack and
            // create an output to either the console or HTML element passed.
            output.compileOutputStack((this.options.output === undefined) ? undefined : this.options.output);

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
