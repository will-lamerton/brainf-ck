/**
 * Class to read input...
 */
class Input {
    /**
     * Constructor
     * @return {void}
     */
    constructor()
    {
        try {
            this.rl = require('readline-sync');
        } catch (e) {
            this.rl = undefined;
        }
    }

    /**
     * Method to take a user input and return it to the interpreter.
     * @return {string}
     */
    getChar()
    {
        // Get input from the standard input for the running environment.
        const input = (this.rl === undefined) ?
            this.rl.question('> ') :
            prompt('Input...')
        ;

        // Convert the first character entered to ASCII. If it's valid,
        // write the ASCII code to memory, if not, just make it 0.
        return (!isNaN(input.charCodeAt(0))) ? input.charCodeAt(0) : 0;
    }
}

module.exports = Input;
