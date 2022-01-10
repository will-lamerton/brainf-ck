/**
 * Output class. Module contains functions to handle interpreter output.
 */
export class Output {
    /**
     * Constructor
     * @return {void}
     */
    constructor()
    {
        this.stack = [];
    }

    /**
     * Method to return an error in encountered.
     * @param {string} - error message.
     * @return {void}
     */
    error(message)
    {
        console.error('\x1b[31m%s\x1b[0m', message, '\n');
    }

    /**
     * Method to push a payload to the output stack.
     * @param {number} payload - ASCII character to push to stack.
     */
    pushToStack(payload)
    {
        this.stack.push(String.fromCharCode(payload));
    }

    /**
     * Method to compile the output stack into a single string and output it to
     * a passed location.
     * @param {string|undefined} outputTo - location to put program output.
     * @return {void}
     */
    compileOutputStack(outputTo)
    {
        (outputTo === undefined) ?
            console.log(this.stack.join(''),'\n') :
            document.getElementById(outputTo).innerHTML = this.stack.join('')
        ;
    }
}
