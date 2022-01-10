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
        const Lexer = require('./lexer');
        /**
         * Call the lexer.
         * @type {Lexer}
         * @param {string} - raw string source code to be lexed.
         */
        this.lexer = new Lexer(source);

        const Parser = require('./parser');
        /**
         * Call the parser.
         * @type {Parser}
         * @param {array} - tokenised source from the lexer.
         */
        this.parser = new Parser(this.lexer.source);

        this.ast = this.parser.ast;
    }
}

module.exports = Program;
