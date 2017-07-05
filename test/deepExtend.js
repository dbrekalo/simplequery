var assert = require('chai').assert;
var $ = require('../src/deepExtend');

describe('Deep extend', function() {

    it('deep extends objects', function() {

        assert.deepEqual($.extend(true, {
            foo: 'bar',
            a: {b: 'b'}
        }, {
            a: {c: 'c'},
            d: {f: 'f'}
        }, false, undefined), {
            foo: 'bar',
            a: {b: 'b', c: 'c'},
            d: {f: 'f'}
        });

    });

    it('keeps shallow extends when first parameter is not true', function() {

        assert.deepEqual($.extend({
            foo: 'bar',
            a: {b: 'b'}
        }, {
            a: {c: 'c'},
            d: {f: 'f'}
        }, false, undefined), {
            foo: 'bar',
            a: {c: 'c'},
            d: {f: 'f'}
        });

    });

});
