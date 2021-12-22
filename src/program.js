/**
 * Program class. Contains functions to fetch and manage Brainfuck programs.
 */
class Program {
    /**
     * Constructor.
     * @return {void}
     */
    constructor()
    {
        const Output = require('./lang/output');
        this.output = new Output;

        const Lexer = require('./lexer');
        /**
         * Call the lexer.
         * @type {Lexer}
         * @param {string} - raw string source code to be lexed.
         */
        this.lexer = new Lexer(this.getRawSourceFromFile());

        const Parser = require('./parser');
        /**
         * Call the parser.
         * @type {Parser}
         * @param {array} - tokenised source from the lexer.
         */
        this.parser = new Parser(this.lexer.source);
        this.ast = this.parser.ast;

        this.pointer = 0;
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
            this.output.error(`No input source file. Interpreter expects a ".bf" or ".b" source file passed as the first argument.\n\n"node brainfuck INPUT_SOURCE_FILE.bf"`);
            process.exit();
        }

        // We also need to make sure we're inporting a `.bf` or `.b` file.
        //
        // We'll start by gettng the path and extension of the file passed to Brainfuck.
        const extension = require('path').extname(process.argv[2]);

        // Then we'll test for the correct extension.
        if (extension != '.bf' && extension != '.b') {
            // Error and exit if it's not.
            this.output.error(`Interpreter expects a ".bf" or ".b" source file. "${extension}" file given.`);
            process.exit();
        }

        // Return source by reading the file using `readFileSync` and then converting
        // the buffer output to a string.
        return require('fs')
                    .readFileSync(process.argv[2])      // Get file based on console argument 2.
                    .toString()                         // Convert it to a string.
        ;
    }

    /**
     * Method to set the instruction pointer to a passed number.
     * @param {number} position - pointer position to set the pointer to.
     * @return {void}
     */
    setPointer(position)
    {
        this.pointer = position;
    }

    /**
     * Method to increment the pointer by one.
     * @return {void}
     */
    incrementPointer()
    {
        this.pointer++;
    }
}

module.exports = Program;
