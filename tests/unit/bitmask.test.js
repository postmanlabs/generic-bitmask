var expect = require('expect.js'),

    /**
     * Helper function to return array ranging from 0 to count
     * @param  {number} count
     * @returns {Array}
     */
    utilFillArray = function (count) {
        return (new Array(count)).join().split(',').map(Number.call, Number);
    };

/* global describe, it */
describe('bitmask', function () {
    var Bitmask = require('../../index').Mask;

    it('should have initial mask to zero', function () {
        var mask = new Bitmask();
        expect(mask.get()).to.be(0);
    });

    it('should allow to set initial permissions in hex', function () {
        var mask = new Bitmask(40);
        expect(mask.get()).to.be(40);
    });

    it('should validate bits when set', function () {
        var mask = new Bitmask(40);
        expect(mask.test(3)).to.ok();
        expect(mask.test(5)).to.ok();
    });

    it('should return true for only the valid bits (0 to 2^100)', function () {
        var mask = new Bitmask(40);
        expect(utilFillArray(100).filter(mask.test.bind(mask))).to.eql([3, 5]);
    });

    it('can set individual bits', function () {
        var mask = new Bitmask(40);
        mask.add(9);
        mask.add(12);
        expect(utilFillArray(100).filter(mask.test.bind(mask))).to.eql([3, 5, 9, 12]);
    });

    it('can set remove individual bits', function () {
        var mask = new Bitmask(40);
        mask.add(9);
        mask.add(12);
        mask.remove(12);
        expect(utilFillArray(100).filter(mask.test.bind(mask))).to.eql([3, 5, 9]);
    });

    it('duplicate addition or removal of bits have no effect', function () {
        var mask = new Bitmask(40);
        mask.add(9);
        mask.add(9);
        mask.remove(12);
        mask.remove(12);
        expect(utilFillArray(100).filter(mask.test.bind(mask))).to.eql([3, 5, 9]);

        mask.remove(9);
        expect(utilFillArray(100).filter(mask.test.bind(mask))).to.eql([3, 5]);
    });

    it('can get final bit hex', function () {
        var mask = new Bitmask(40);
        mask.add(9);
        mask.add(12);
        expect(mask.get()).to.eql(4648);
    });

    it('allow adding multiple bits as an array', function () {
        var mask = new Bitmask(40);
        mask.add([9, 12]);
        expect(mask.get()).to.eql(4648);
    });

    it('allow removing multiple bits as an array', function () {
        var mask = new Bitmask(4648);
        mask.remove([9, 12]);
        expect(mask.get()).to.eql(40);
    });

    it('can test multiple bits when sent as an array', function () {
        var mask = new Bitmask(4648);
        expect(mask.test([5, 9, 12])).to.be.ok();
        expect(mask.test([5, 9, 12, 17])).to.not.be.ok();
        expect(mask.test([])).to.not.be.ok();
    });

    it('should return negative for non numeric values', function () {
        var mask = new Bitmask();
        expect(mask.test([])).to.not.be.ok();
        expect(mask.test('')).to.not.be.ok();
        expect(mask.test({})).to.not.be.ok();
        expect(mask.test(null)).to.not.be.ok();
        expect(mask.test(false)).to.not.be.ok();
        expect(mask.test(true)).to.not.be.ok();
        expect(mask.test(NaN)).to.not.be.ok();
        expect(mask.test(Infinity)).to.not.be.ok();
    });
});
