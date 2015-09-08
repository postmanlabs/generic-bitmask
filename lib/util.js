/**
 * @module util
 */
module.exports = {

    /**
     * Performs shallow copy of one object into another.
     *
     * @param {object} recipient
     * @param {object} donor
     * @returns {object} - returns the seeded recipient parameter
     */
    extend: function (recipient, donor) {
        for (var prop in donor) {
            donor.hasOwnProperty(prop) && (recipient[prop] = donor[prop]);
        }
        return recipient;
    }
};
