/**
 * If statement conditional class.
 */
class If {
    /**
     * Constructor
     * @param {number} location - program location that the if statement started
     * on. We'll calculate where to jump to if the condition isn't met.
     * @return {void}
     */
    constructor(location, program)
    {
        // If's can nest, so we'll keep track of how nested we are so we don't
        // accidently set the wrong jump location based on a nested if inside
        // this if.
        let nestLevel = 0;

        // We'll need the original location in case of error.
        const originalLocation = location;

        // Start a loop that will run until we tell it not to.
        while (true) {
            // Increase the pointer by one.
            location++;

            // Each loop we'll test to see if the current instruction is another
            // opening if statement. If it, that means we're nested and the next
            // closing character won't count.
            //
            // So we can keep track of that, we'll increase the nesting level by
            // one.
            (program[location] == '{') ? nestLevel++ : false;

            // If we find a closing if statement character. We'll need to do a
            // couple of tests to make sure we're not closing prematurely.
            if (program[location] == '}') {

                // If the nesting level is more than 0. That means we're still
                // nested and therefore, this closing character isn't this
                // instances.
                if (nestLevel > 0) {
                    // However, we can decrease the nest level by one now.
                    nestLevel--;
                }
                // If the nesting level is 0 and we've found a closing bracket,
                // that means we've found our location to jump to should the if
                // statement fail.
                else {
                    // Break as we're done.
                    break;
                }
            }

            // If we're at the end of the program and we haven't managed to find
            // a closing character, then, it's missing and that's a program error
            // so we'll need to error.
            if (location == program.length) {
                const Output = require('../output');
                const output = new Output;
                output.error(`Missing closing "}" on character ${originalLocation}`);
            }

            // If we didn't break, onwards and loop again.
        }

        // We've found the location, so set this instance to it.
        this.location = location;
    }
}

module.exports = If;
