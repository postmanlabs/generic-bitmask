/**
 * @module descriptor
 */
var util = require('./util'),
    Descriptor; // constructor

/**
 * This function stores a set of bits and their corresponding named descriptions.
 *
 * @constructor
 * @param {object<number>} values
 */
Descriptor = function (values) {
    this.set(values);
};

util.extend(Descriptor.prototype, /** @lends Descriptor.prototype */ {
    /**
     * Set the named bits for the descriptors.
     * @param {object<number>} values
     */
    set: function (values) {
        this.values = util.map(values, function (value) {
            return parseInt(value, 10);
        });
    },

    /**
     * Validates whether a set of named bits match the active bits in a bitmask
     *
     * @param  {array|string} values
     * @param  {Bitmask} bitmask
     * @returns {boolean}
     */
    validate: function (values, bitmask) {
        return bitmask.test(this.valueOf(values));
    },

    /**
     * Adds a set of named bits to positive in a bitmask
     *
     * @param  {array|string} values
     * @param  {Bitmask} bitmask
     */
    add: function (values, bitmask) {
        return bitmask.add(this.valueOf(values));
    },

    /**
     * Removes a set of named bits from positive in a bitmask
     *
     * @param  {array|string} values
     * @param  {Bitmask} bitmask
     */
    remove: function (values, bitmask) {
        return bitmask.remove(this.valueOf(values));
    },

    /**
     * Returns the value of a descriptor key
     * @private
     *
     * @param  {Array<string>|string} key
     * @returns {number}
     */
    valueOf: function (key) {
        return Array.isArray(key) ? (key.map(this.valueOf.bind(this))) : this.values[key];
    }
});

// Export Descriptor module
module.exports = Descriptor;
