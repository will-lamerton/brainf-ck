/**
 * Class to interpret the passed Brainfuck source file.
 * @return {void}
 */
class Brainfuck {
    /*
     * Constructor.
     * @return {void}
     */
    constructor()
    {
        /**
         * Import Brainfuck interpreter libraries.
         *
         * These themselves will also import other core libraries.
         *
         * @type {Program} - this class fetches the program file, sends it
         * through the lexer & parser to generate an AST for us to run here.
         *
         * @type {Memory} - Handles the creation and manipulation of the program
         * memory allocated to Brainfuck.
         *
         * @type {Output} - Handles interpreter output.
         *
         */
        const Program = require('./program');
        this.program = new Program;

        const Memory = require('./lang/memory');
        this.memory = new Memory;

        const Output = require('./lang/output');
        this.output = new Output;

        // Run the program.
        this.run(this.program.ast);

        // Once we're done executing instructions, we'll take the output stack and
        // create a console output for it.
        this.output.compileOutputStack();
    }

    /**
     * Method to run our program!
     * @param  {object} ast - An Abstract Syntax Tree.
     * @return {void}
     */
    run(ast) {
        // If we're running in a conditional branch, this will be registered
        // using this variable. Set to `null` otherwise.
        let conditionalType = null;

        // This is out program pointer based locally on the AST being run.
        let instruction = 0;

        // Now we're setup, we'll open a while loop that takes the local
        // instruction pointer and uses to reference a point on the AST and
        // incrementing by one every loop until all instructions have been
        // executed.
        while (instruction <= ast.length) {

            // In the AST, we might find a conditional branch, if we do, we
            // basically want to call the `run` method again and pass it the
            // snippet of AST.
            if (typeof ast[instruction] == 'object' || typeof ast[instruction] == 'array') {
                this.run(ast[instruction]);

                // ^ Once the conditional branch has been executed, we'll be
                // back in the original while loop and able to carry on
                // executing where we left off.
            }

            // Choose the intruction to execute.
            switch (ast[instruction]) {
                // This instruction moves the memory pointer forward by one.
                case 'RIGHT': this.memory.right(); break;

                // This instruction moves the memory pointer backward by one.
                case 'LEFT': this.memory.left(); break;

                // This instruction increases the integer stored in the current memory
                // address by one.
                case 'ADD': this.memory.add(); break;

                // This instruction decreases the integer stored in the current memory
                // address by one.
                case 'SUBTRACT': this.memory.subtract(); break;

                // This instruction outputs the integer stored in the current memory
                // address to the output stack.
                case 'OUTPUT': this.output.pushToStack(this.memory.stack[this.memory.pointer]); break;

                // This instruction takes input from the user via CL.
                case 'INPUT': this.memory.writeFromUserInput(); break;

                // This instruction tells the `run` method that we're in a
                // while loop so below, our condition to keep looping will be
                // checked.
                case 'WHILE': conditionalType = 'WHILE'; break;

                // This instruction tells the `run` method that we're in a
                // if statement so below, our condition to keep run the rest
                // of the branch will be checked.
                case 'IF': conditionalType = 'IF'; break;

                // This instruction is for debugging and dumps the memory to the
                // console.
                case 'DUMP': this.memory.dump(); break;
            }

            // Because this `run` method can be invoked to handle a conditional
            // branch, we have to check the condition to know what to do next.
            switch (conditionalType) {
                // If we're in a while loop...
                case 'WHILE':
                    // We'll always run the loop at least once but any more iterations
                    // will need to be checked. So, if we're at the end of a loop...
                    if (instruction == ast.length) {
                        // The conditon is that the current memory address is not equal
                        // to 0. We'll return and exit the branch if it is.
                        if (this.memory.stack[this.memory.pointer] == 0) {
                            return;
                        }
                        // Else, let's reloop!
                        instruction=0;
                    }
                    break;

                // If we're at an if statement.
                case 'IF':
                    // To run the if statement - the condition is that the current
                    // memory address is not equal to 0. We'll return and exit the
                    // branch if it is.
                    if (this.memory.stack[this.memory.pointer] == 0) {
                        return;
                    }
                    // Because we don't want to check this again, we'll let the
                    // `run` function know we've settled the if statement by
                    // setting `conditionalType` back to `null`.
                    else {
                        conditionalType = null;
                    }

                    break;
            }

            // Increment the program pointer.
            instruction++;
        }

        // End of program.
        return;
    }
}

module.exports = Brainfuck;
