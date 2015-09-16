/**
 * @module descriptor
 */
var util = require('./util'),
    Mask = require('./bitmask'),
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
     * @param  {array<string>|string} values
     * @param  {Bitmask} bitmask
     * @returns {boolean}
     */
    validate: function (values, bitmask) {
        return bitmask.test(this.valueOf(values));
    },

    /**
     * Adds a set of named bits to positive in a bitmask
     *
     * @param  {array<string>|string} values
     * @param  {Bitmask} bitmask
     */
    add: function (values, bitmask) {
        return bitmask.add(this.valueOf(values));
    },

    /**
     * Removes a set of named bits from positive in a bitmask
     *
     * @param  {array<string>|string} values
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
    },

    /**
     * Returns the compunded decimal representation of the binary bits
     * @private
     *
     * @param  {Array<string>|sring} keys
     * @returns {number}
     */
    compoundValueOf: function (keys) {
        var mask = new Mask(); // create a new mask
        mask.add(this.valueOf(keys)); // set it to have the named bits mentioned in the keys
        // the mask will compute their conjugation and as such retrieve the result.
        return mask.get();
    },

    /**
     * Verifies whether the specified named bits are defined in the descriptor
     * @param  {Array<string>|string} name
     * @return {boolean}
     */
    check: function (name) {
        return Array.isArray(name) ? (name.length && name.every(this.check.bind(this))) : !!this.values[name];
    }
});

// Export Descriptor module
module.exports = Descriptor;
