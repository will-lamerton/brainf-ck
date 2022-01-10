/**
 * Class to handle Brainfuck memory functions.
 */
import {Input} from './input.js';

export class Memory {
    /**
     * Constructor to create instance of memory.
     * @return {void}
     */
    constructor()
    {
        this.input = new Input;

        this.stack = Array.from(Array(10).keys()).fill(0);
        this.pointer = 0;
    }

    /**
     * Method to handle memory overflows.
     *
     * If the instruction sends the memory pointer past the allocated stack memory
     * size then we'll dynamically expand the memory allocated.
     *
     * @return {void}
     */
    handleOverflow()
    {
        (this.pointer >= this.stack.length) ? this.stack.push(0) : false;
    }

    /**
     * Method to handle memory underflows.
     *
     * If the instruction goes below zero we'll set the memory pointer to
     * at it's maximum.
     *
     * @return {void}
     */
    handleUnderflow()
    {
        (this.pointer < 0) ? this.stack.length : this.pointer;
    }

    /**
     * Method to move the memory pointer right.
     * @return {void}
     */
    right()
    {
        this.pointer++;
        this.handleOverflow();
    }

    /**
     * Method to move the memory pointer left.
     * @return {void}
     */
    left()
    {
        this.pointer--;
        this.handleUnderflow();
    }

    /**
     * Method to add one to the current memory address.
     * @return {void}
     */
    add()
    {
        this.stack[this.pointer]++;

        if (this.stack[this.pointer] > 256) {
            this.stack[this.pointer] = 0;
        }
    }

    /**
     * Method to subtract one from the current memory address.
     * @return {void}
     */
    subtract()
    {
        this.stack[this.pointer]--;

        if (this.stack[this.pointer] < 0) {
            this.stack[this.pointer] = 256;
        }
    }

    /**
     * Method to write to memory from user input.
     * @return {void}
     */
    writeFromUserInput()
    {
        this.stack[this.pointer] = this.input.getChar();
    }

    /**
     * Method to dump the memory stack.
     * @return {void}
     */
    dump()
    {
        console.log(this.stack);
    }
}
