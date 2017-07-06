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

    it('checks object properties properly', function() {

        var obj1 = {
            foo: 'bar',
            a: {b: 'b'}
        };

        function TestObject() {
            this.a = {c: 'c'};
            this.d = {f: 'f'};
        }

        TestObject.prototype.test = 'test';

        var obj2 = new TestObject();

        assert.deepEqual($.extend(true, obj1, obj2, false, undefined), {
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
