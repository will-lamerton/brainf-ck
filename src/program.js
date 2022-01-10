import {Lexer} from './lexer.js';
import {Parser} from './parser.js';

/**
 * Program class. Contains functions to fetch and manage Brainfuck programs.
 */
export class Program {
    /**
     * Constructor.
     * @return {void}
     */
    constructor(source)
    {
        /**
         * Call the lexer.
         * @type {Lexer}
         * @param {string} - raw string source code to be lexed.
         */
        this.lexer = new Lexer(source);

        /**
         * Call the parser.
         * @type {Parser}
         * @param {array} - tokenised source from the lexer.
         */
        this.parser = new Parser(this.lexer.source);

        this.ast = this.parser.ast;
    }
}
