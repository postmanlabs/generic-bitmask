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
    },

    /**
     * Creates a new object with mapped values from another object
     *
     * @param  {object} obj
     * @param  {function} mapper
     * @param  {*=} [scope]
     * @returns {object}
     */
    map: function (obj, mapper, scope) {
        var map = {},
            prop;
        scope = scope || obj;

        for (prop in obj) {
            obj.hasOwnProperty(prop) && (map[prop] = mapper.call(scope, obj[prop], prop, obj));
        }

        return map;
    }
};
