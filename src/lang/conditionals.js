/**
 * Conditionals class. This module holds the conditionals stack so we can
 * keep track of what conditions we have in action and what they are.
 */
class Conditionals {
    /**
     * Constructor
     * @return {void}
     */
    constructor()
    {
        this.stack = [];

        this.types = [
            {
                string: 'while',
                instance: require ('./conditionals/while')
            },
            {
                string: 'if',
                instance: require('./conditionals/if')
            }
        ];
    }

    /**
     * Method to register a new conditional in the program.
     * @param  {string} type - the type of conditional to create.
     * @param  {number} location - location in the program. This is used for jumping
     * to the correct position in the program once a condition is or isn't met.
     * @param  {mixed} program - optional program argument, should the conditional
     * need access.
     * @return {void}
     */
    register(type, location, program = null)
    {
        const Instance = this.translateType(type);
        this.stack.push(new Instance(location, program));
    }

    /**
     * Method to translate type passed as string to instance.
     * It does this by using a dictionary defined in the class which contains
     * a list of conditional classes and their associated string names.
     * @param  {string} type - type in string form.
     * @return {function}
     */
    translateType(type)
    {
        return this.types.filter(conditional => conditional.string.includes(type))[0].instance;
    }

    /**
     * Method to pop a conditional off of the stack once it's been met. It's
     * a fairly primitive nesting type, simply popping the latest conditional that
     * matches the type off of the stack.
     * @param  {string} type - conditional type to filter stack by.
     * @return {void}
     */
    destroy(type)
    {
        const filteredStack = this.stack.filter(conditional => conditional instanceof this.translateType(type));
        filteredStack.pop();
        this.stack = filteredStack;
    }

    /**
     * Method to return a program position for the instruction pointer based on
     * the latest conditional that matches the type.
     * @param  {string} type - conditional type to filter by.
     * @return {number}
     */
    jumpTo(type)
    {
        const filteredStack = this.stack.filter(conditional => conditional instanceof this.translateType(type));
        return filteredStack[filteredStack.length-1].location;
    }

    /**
     * Method to test whether a memory address is equal to zero or not as this
     * is the only condition in Brainfuck. Returns `true` or `false`.
     * @param  {number} memoryAddress - memory address to test
     * @return {bool}
     */
    testMemoryAddress(memoryAddress)
    {
        return (memoryAddress == 0) ? true : false;
    }
}

module.exports = Conditionals;
