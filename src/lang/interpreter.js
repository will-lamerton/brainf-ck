/**
 * Class to interpret the passed Brainfuck source file.
 * @param {string} program - BF program.
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
         * @type {Program}
         * - Handles the Brainfuck program source. It fetches it, transforms it
         * and links the instruction pointer to it.
         *
         * @type {Memory}
         * - Handles the creation and manipulation of the program memory
         * allocated to Brainfuck.
         *
         * @type {Conditionals}
         * - Handles conditional operations in Brainfuck.
         *
         * @type {Output}
         * - Handles interpreter output.
         *
         */
        const Program = require('./program');
        this.program = new Program;

        const Memory = require('./memory');
        this.memory = new Memory;

        const Conditionals = require('./conditionals');
        this.conditionals = new Conditionals;

        const Output = require('./output');
        this.output = new Output;

        // Run the program.
        this.run();
    }

    /**
     * Method to run the Brainfuck program.
     * @return {void)
     */
    run()
    {
        // Run a while loop that loops as long as the instruction pointer isn't equal
        // to the length of the program.
        //
        // Because Brainfuck is such a simple language with no real syntax, we're not
        // going to implement a lexer, parser and AST as it'll be overkill for this
        // language.
        //
        // Each loop, once the current program instruction has been executed, adds one to
        // the instruction pointer.
        while (this.program.pointer <= this.program.source.length) {
            // Take the current instruction and match it to a case.
            // If it doesn't match it'll be ignored as a comment.
            switch (this.program.source[this.program.pointer]) {
                // This instruction moves the memory pointer forward by one.
                case '>': this.memory.right(); break;

                // This instruction moves the memory pointer backward by one.
                case '<': this.memory.left(); break;

                // This instruction increases the integer stored in the current memory
                // address by one.
                case '+': this.memory.add(); break;

                // This instruction decreases the integer stored in the current memory
                // address by one.
                case '-': this.memory.subtract(); break;

                // This instruction outputs the integer stored in the current memory
                // address to the output stack.
                case '.': this.output.pushToStack(this.memory.stack[this.memory.pointer]); break;

                // This instruction takes input from the user via CL.
                case ',': this.memory.writeFromUserInput(); break;

                // This instruction opens a while loop that will carry on executing until
                // the current memory address is equal to zero. The program pointer will
                // be set to the instruction after this one and will point back to it too
                // when the loop repeats.
                case '[': this.conditionals.register('while', this.program.pointer); break;

                // This instruction marks where the while loop ends. If the memory
                // address is not zero, this instruction jumps the program pointer back
                // to the beginning of the loop, however, if it is zero, the program
                // pointer will be set to the instruction after this one and the program
                // will continue.
                case ']':
                    (this.conditionals.testMemoryAddress(this.memory.stack[this.memory.pointer])) ?
                        this.conditionals.destroy('while') :
                        this.program.setPointer(this.conditionals.jumpTo('while'))
                    ;
                    break;

                // This instruction marks where an if statement begins. If the
                // memory address is not zero, we'll execute the contents of the
                // statement. If it is zero, we'll skip over it and continue
                // after the closing character.
                case '{':
                    this.conditionals.register('if', this.program.pointer, this.program.source);

                    (this.conditionals.testMemoryAddress(this.memory.stack[this.memory.pointer])) ?
                        this.program.setPointer(this.conditionals.jumpTo('if')) :
                        false
                    ;

                    break;

                // This instruction marks the closure of an if statement.
                case '}': this.conditionals.destroy('if'); break;

                // More of a debug instruction, this character dumps the memory
                // stack to view.
                case '~': this.memory.dump(); break;
            }

            // Increment the program pointer.
            this.program.incrementPointer();
        }

        // Once we're done executing instructions, we'll take the output stack and
        // create a console output for it.
        this.output.compileOutputStack();
    }
}

module.exports = Brainfuck;
