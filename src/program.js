/**
 * Program class. Contains functions to fetch and manage Brainfuck programs.
 */
class Program {
    /**
     * Constructor.
     * @return {void}
     */
    constructor(source)
    {
        this.rawSource = (source == null) ? this.getRawSourceFromFile() : source;

        const Lexer = require('./lexer');
        /**
         * Call the lexer.
         * @type {Lexer}
         * @param {string} - raw string source code to be lexed.
         */
        this.lexer = new Lexer(this.rawSource);

        const Parser = require('./parser');
        /**
         * Call the parser.
         * @type {Parser}
         * @param {array} - tokenised source from the lexer.
         */
        this.parser = new Parser(this.lexer.source);

        this.ast = this.parser.ast;
    }

    /**
     * Method to read a Brainfuck source file and return it back to the interpreter.
     * @return {string} - Brainfuck source.
     */
    getRawSourceFromFile()
    {
        // Check there is a input file as interpreter requires one passed to it as
        // its first CL arugment.
        if (process.argv[2] === undefined) {
            // Error and exit if there's not.
            throw `No input source file. Interpreter expects a ".bf" or ".b" source file passed as the first argument.`;
            process.exit();
        }

        // We also need to make sure we're inporting a `.bf` or `.b` file.
        //
        // We'll start by gettng the path and extension of the file passed to Brainfuck.
        const extension = require('path').extname(process.argv[2]);

        // Then we'll test for the correct extension.
        if (extension != '.bf' && extension != '.b') {
            // Error and exit if it's not.
            throw `Interpreter expects a ".bf" or ".b" source file. "${extension}" file given.`;
            process.exit();
        }

        // Return source by reading the file using `readFileSync` and then converting
        // the buffer output to a string.

        return require('fs')
                    .readFileSync(process.argv[2])      // Get file based on console argument 2.
                    .toString()                         // Convert it to a string.
        ;
    }
}

module.exports = Program;
