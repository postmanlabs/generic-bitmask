var expect = require('expect.js');

/* global describe, it, expect */
describe('descriptor', function () {
    var Descriptor = require('../../index').Descriptor,
        Bitmask = require('../../index').Mask;

    it('should map', function () {
        var d = new Descriptor({ r: 3, w: '5' });
        expect(d.values).to.eql({ r: 3, w: 5 });
    });

    it('should map when values are reset', function () {
        var d = new Descriptor({ r: 3, w: '5' });
        expect(d.values).to.eql({ r: 3, w: 5 });

        d.set({ r: 1, w: 2 });
        expect(d.values).to.eql({ r: 1, w: 2 });
    });

    it('should validate named bit', function () {
        var d = new Descriptor({ r: 3, w: 5, x: 9 }),
            b = new Bitmask(40);

        expect(d.validate('r', b)).to.be.ok();
        expect(d.validate('x', b)).to.not.be.ok();
        expect(d.validate('w', b)).to.be.ok();
    });

    it('should validate array of named bits', function () {
        var d = new Descriptor({ r: 3, w: 5, x: 9 }),
            b = new Bitmask(40);

        expect(d.validate(['r'], b)).to.be.ok();
        expect(d.validate(['r', 'w'], b)).to.be.ok();
        expect(d.validate(['w', 'x'], b)).to.not.be.ok();
        expect(d.validate(['x'], b)).to.not.be.ok();
    });

    it('should add named bits', function () {
        var d = new Descriptor({ r: 3, w: 5 }),
            b = new Bitmask();

        d.add('r', b);
        expect(b.get()).to.be(8);

        d.add('w', b);
        expect(b.get()).to.be(40);
    });

    it('should add array of named bits', function () {
        var d = new Descriptor({ r: 3, w: 5 }),
            b = new Bitmask();

        d.add(['r', 'w'], b);
        expect(b.get()).to.be(40);
    });

    it('should remove named bits', function () {
        var d = new Descriptor({ r: 3, w: 5 }),
            b = new Bitmask(40);

        d.remove('r', b);
        expect(b.get()).to.be(32);

        d.remove('w', b);
        expect(b.get()).to.be(0);
    });

    it('should remove array of named bits', function () {
        var d = new Descriptor({ r: 3, w: 5 }),
            b = new Bitmask(168);

        d.remove(['r', 'w'], b);
        expect(b.get()).to.be(128);
    });

    it('[private] should return translated values for named bits', function () {
        var d = new Descriptor({ r: 3, w: 5 });

        expect(d.valueOf('r')).to.be(3);
        expect(d.valueOf(['r', 'w'])).to.eql([3, 5]);
    });
});
