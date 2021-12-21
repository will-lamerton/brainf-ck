/**
 * While loop conditional class.
 */
class While {
    /**
     * Constructor
     * @param {number} location - program location to jump back to should the
     * while loop condition not be met.
     * @return {void}
     */
    constructor(location)
    {
        this.location = location;
    }
}

module.exports = While;
