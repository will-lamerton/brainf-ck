/**
 * Lexer class - rudimentary, prepares the source into a series of tokens to
 * be parsed.
 */
class Lexer {
    /**
     * Constructor.
     * @return {void}
     */
    constructor(rawSource)
    {
        this.rawSource = rawSource;

        this.tokens = [
            {regex: /\>/, token: 'RIGHT'},
            {regex: /\</, token: 'LEFT'},
            {regex: /\+/, token: 'ADD'},
            {regex: /\-/, token: 'SUBTRACT'},
            {regex: /\./, token: 'OUTPUT'},
            {regex: /\,/, token: 'INPUT'},
            {regex: /\[/, token: 'WHILE'},
            {regex: /\]/, token: 'ENDWHILE'},
            {regex: /\{/, token: 'IF'},
            {regex: /\}/, token: 'ENDIF'},
            {regex: /\~/, token: 'DUMP'},
        ];

        this.splitType = ''; // '' = char, ' ' = word.

        this.source = this.lex();
    }

    /**
     * Method to run the source code through the lexer.
     * @return {array}
     */
    lex()
    {
        // Split the source into an array of proposed tokens.
        const splitSource = this.rawSource.split(this.splitType);

        // Create an empty array for the lexed tokens.
        const lexedSource = [];

        // Then, we'll loop through the source and check if it matches any of
        // the tokens.
        splitSource.forEach(proposedToken => {
            this.tokens.forEach(token => {
                // If it does, we'll push the token to the lexed source array.
                token.regex.test(proposedToken) ? lexedSource.push(token.token) : false;
            });
        });

        // Return for parsing.
        return lexedSource;
    }
}

module.exports = Lexer;
