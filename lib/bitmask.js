/**
 * @module bitmask
 */
var util = require('./util'),
	Bitmask; // constructor

/**
 * Create a new bitmask
 * @constructor
 * @param {string=} [hex] hexadecimal number containig the bitmask
 */
Bitmask = function (hex) {
    this.set(hex); // defaults to 0
};

// Add static functions to the Bitmask constructor.
// These are ususally stateless and instance independent helper functions.
util.extend(Bitmask, /** @lends Bitmask */ {
    /**
     * This function acts as a translator to internally get corresponding integer value for individual bits.
     * @param  {number} value
     * @returns {number}
     */
    translate: function (value) {
        return Math.pow(2, value);
    }
});

util.extend(Bitmask.prototype, /** @lends Bitmask.prototype */ {
    /**
     * Sets the raw value of the bitmask
     * @param {string} value decimal number containig the bitmask
     */
    set: function (value) {
        return this.mask = parseInt(value, 10) || 0;
    },

    /**
     * Gets the raw value of the bitmask
     * @returns {number} decimal code of the bitmask
     */
    get: function () {
        return this.mask;
    },

    /**
     * Verifies whether a bit has been set within the mask
     * @param  {number} item
     * @returns {boolean}
     */
    test: function (item) {
        return (this.mask & (item = Bitmask.translate(item))) === item;
    },

    /**
     * Sets a particular bit to `true`. A number of bits can be sent as an array.
     * @param {number|Array<number>} item
     */
    add: function (item) {
        return Array.isArray(item) ?
            item.map(this.add.bind(this)) :
            !!(!this.test(item) && (this.mask += Bitmask.translate(item)));
    },

    /**
     * Sets a particular bit to `false`. A number of bits can be sent as an array.
     * @param {number|Array<number>} item
     */
    remove: function (item) {
        return Array.isArray(item) ?
            item.map(this.remove.bind(this)) :
            !!(this.test(item) && (this.mask -= Bitmask.translate(item)));
    }
});

// Export Bitmask module
module.exports = Bitmask;