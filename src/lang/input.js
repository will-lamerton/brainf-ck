/**
 * Class to read input...
 */
class Input {
    /**
     * Method to take a user input and return it to the interpreter.
     * @return {string}
     */
    getChar()
    {
        // Get input from the standard input for the running environment.
        const input = prompt('Input...');

        // Convert the first character entered to ASCII. If it's valid,
        // write the ASCII code to memory, if not, just make it 0.
        return (!isNaN(input.charCodeAt(0))) ? input.charCodeAt(0) : 0;
    }
}

module.exports = Input;
