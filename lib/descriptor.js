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
    set: function (names) {
        this.names = Object.keys(names); // store the keys
        this.hash = util.map(names, function (value) { // store values for corresponding keys
            return parseInt(value, 10);
        });
    },

    /**
     * Verifies whether the specified named bits are defined in the descriptor
     * @param  {Array<string>|string} name
     * @param  {boolean=} [lazy=false] - if set to true, this function will return true for empty names or array
     * @return {boolean}
     */
    defined: function (name, lazy) {
        return Array.isArray(name) ? (name.length ? name.every(function (name) {
            return this.defined(name, lazy);
        }, this) : !!lazy) : (name ? !!this.hash[name] : !!lazy);
    },

    /**
     * Returns the value of a descriptor name
     *
     * @param  {Array<string>|string} name
     * @returns {number}
     */
    valueOf: function (name) {
        return Array.isArray(name) ? (name.map(this.valueOf.bind(this))) : this.hash[name];
    },

    /**
     * Returns the bitmask representation of the binary bits
     * @private
     *
     * @param  {Array<string>|sring} names
     * @returns {bitmask}
     */
    compoundMaskOf: function (names) {
        var mask = new Mask(); // create a new mask
        mask.add(this.valueOf(names)); // set it to have the named bits mentioned in the names
        return mask;
    },

    /**
     * Returns the compunded decimal representation of the binary bits
     * @private
     *
     * @param  {Array<string>|sring} names
     * @returns {number}
     */
    compoundValueOf: function (names) {
        // the mask will compute their conjugation and as such retrieve the result.
        return this.compoundMaskOf(names).get();
    },

    /**
     * Gets the maximum permission set for this descriptor
     * @returns {number}
     */
    compoundValueOfAll: function () {
        return this.compoundValueOf(this.names);
    },

    /**
     * Extracts the named bits from a mask
     *
     * @param  {bitmask} mask
     * @returns {array}
     */
    extract: function (mask) {
        return this.names.filter(function (name) {
            return mask.test(this.valueOf(name));
        }, this);
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
    }
});

// Export Descriptor module
module.exports = Descriptor;
