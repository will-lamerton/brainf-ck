/**
 * Parser class – this takes our tokens that are recognised and
 * "makes sense of them" by parsing them into an Abstract Syntax Tree.
 */
export class Parser {
    /**
     * Constructor
     * @return {void}
     */
    constructor(lexedSource)
    {
        this.lexedSource = lexedSource;
        this.ast = this.parse();
    }

    /**
     * Method to parse the tokens.
     *
     * Here we can catch syntaxical errors and generate an AST to traverse.
     *
     * @return {object} - an Abstract Syntax Tree.
     */
    parse()
    {
        // We're going to construct an AST by first creating a string that we
        // can later parse into JSON and then extract an array from there.
        //
        // Creating a string, we'll begin a stringified JSON object with
        // "commands" set to an empty array. Here is where we'll construct the
        // AST.
        let astString = '[{ "commands": [';

        // These are tracker variables for the parser. Every opening condition
        // needs a closing one too, so, we'll keep track. Every opening conditional
        // we'll push a new entry to the array with a character number. Every
        // closing conditional we'll pop from the array.
        //
        // If the length of the arrays are not equal to zero then we're missing
        // a closing conditional so, we'll throw an error with the character
        // number.
        let openWhileConditionals = [];
        let openIfConditionals = [];

        // Now we have that, we'll loop through our Lexed source keeping track
        // of the current token and its position with an "iteration" variable.
        this.lexedSource.forEach((token, iteration) => {
            // For Brainfuck, most of the commands just need to be added to
            // the AST in the order they're looped in, however, for special,
            // nested, tokens, we'll nest any subsequent commands until their
            // corresponding closing tokens are found. This creates nested
            // arrays which we can traverse later.
            switch (token) {
                case 'WHILE':
                    openWhileConditionals.push(iteration);
                    astString += '[';
                    break;
                case 'IF':
                    openIfConditionals.push(iteration);
                    astString += '[';
                    break;
                case 'ENDWHILE':
                    openWhileConditionals.pop();
                    astString += ']';
                    break;
                case 'ENDIF':
                    openIfConditionals.pop();
                    astString += ']';
                    break;
            }

            // Record the token in the AST as long as we want it.
            if (token != 'ENDWHILE' && token != 'ENDIF') {
                astString += `"${token}"`;
            }

            // Add a comma ready for the next array element again, if we want it.
            if (
                iteration+1 != this.lexedSource.length &&
                this.lexedSource[iteration+1] != 'ENDWHILE' &&
                this.lexedSource[iteration+1] != 'ENDIF'
            ) {
                astString += ',';
            }

        });

        // At this point, our tokens have all been accounted for, so we'll add
        // our closing JSON.
        astString += '] }]';

        // The source has a missing closing conditional, so, we'll throw an
        // error.
        if (openIfConditionals.length != 0) {
            throw `Missing closing \`if\` conditional on character: ${openIfConditionals[0]}.`;
        }
        if (openWhileConditionals.length != 0) {
            throw `Missing closing \`while\` conditional on character: ${openWhileConditionals[0]}.`;
        }

        // And finish by returning the parsed AST by removing the JSON.
        return JSON.parse(astString)[0].commands;
    }
}
