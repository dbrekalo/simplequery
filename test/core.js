var assert = require('chai').assert;
var $ = require('../');

describe('SimpleQuery constructor', function() {

    beforeEach(function() {
        document.body.innerHTML =
            '<div class="guestbook">' +
                '<form>' +
                    '<input class="entryInput" placeholder="Type here..." type="text">' +
                    '<input class="entryInput" placeholder="Type here..." type="text">' +
                '</form>' +
            '</div>';
    });

    it('constructs instance with or without new operator', function() {

        assert.instanceOf($('.guestbook'), $);
        assert.instanceOf(new $('.guestbook'), $);

    });

    it('returns existing instance object if one is given', function() {

        var $el1 = $('.guestbook');
        var $el2 = $($el1);

        assert.strictEqual($el1, $el2);

    });

    it('accepts dom node', function() {

        assert.strictEqual($(document.body).get(0), document.body);

    });

    it('accepts array of dom nodes', function() {

        var inputs = Array.prototype.slice.apply(document.querySelectorAll('.entryInput'));
        var $inputs = $(inputs);

        assert.equal($inputs.length, inputs.length);

    });

    it('sets correct length property', function() {

        assert.equal($('.undefinedElement').length, 0);
        assert.equal($('.guestbook').length, 1);
        assert.equal($('.entryInput').length, 2);

    });

    it('creates elements in memory', function() {

        assert.isDefined($('<div><span>Test</span></div>').get(0).nodeName);

    });

});

describe('SimpleQuery core api', function() {

    it('"each" interates over instance nodes', function() {

        var counter = 0;

        $('.entryInput').each(function(i, el) {

            assert.equal(i, counter);
            assert.isDefined(el.nodeName);
            assert.strictEqual(this, el);

            counter++;

        });

    });

    it('"map" creates new instance via function return values', function() {

        assert.equal($('.entryInput').map(function(i, el) {
            return this;
        }).length, 2);

        assert.deepEqual($('.entryInput').map(function(i, el) {
            assert.strictEqual(this, el);
            return i;
        }).get(), [0, 1]);

        assert.deepEqual($('.entryInput').map(function(i, el) {
            return i === 0 ? i : undefined;
        }).get(), [0]);

    });

    it('"each" loop can be broken when returning false', function() {

        var counter = 0;

        $('.entryInput').each(function(i, el) {

            if (i === 1) {
                return false;
            }

            counter++;

        });

        assert.equal(counter, 1);

    });

    it('"eq" returns new SimpleQuery instance for element at certain position', function() {

        assert.equal($('.entryInput').eq(0).length, 1);
        assert.equal($('.entryInput').eq(99).length, 0);

    });

    it('"get" returns element at requested position', function() {

        assert.strictEqual($('body').get(0), document.body);

    });

    it('"get" called with no arguments returns nodes array', function() {

        assert.isArray($('.entryInput').get());

    });

    it('"is" checks for elements identity', function() {

        assert.isTrue($('.guestbook').is('div'));
        assert.isTrue($('.guestbook').is($('.guestbook')));

    });

    it('api can be extended with new methods / plugins', function() {

        var $el = $('.guestbook');

        $.fn.extend({
            test: function() {
                assert.strictEqual($el, this);
            }
        });

        $el.test();

        delete $.fn.test;

    });

});

describe('SimpleQuery core utilities', function() {

    it('"isArray" checks whether the argument is an array', function() {

        assert.isTrue($.isArray([1, 2]));
        assert.isFalse($.isArray(false));
        assert.isFalse($.isArray(''));
        assert.isFalse($.isArray({}));
        assert.isFalse($.isArray(document.querySelectorAll('.entryInput')));

    });

    it('"extend" merges object properties', function() {

        assert.deepEqual($.extend({a: 'a', b: 'b'}, {b: 'b1'}), {a: 'a', b: 'b1'});
        assert.deepEqual($.extend(true, {a: 'a'}, {b: 'b'}), {a: 'a', b: 'b'});

    });

    it('"each" iterates over provided collection', function() {

        var arrayCollection = [3, 4, 5];
        var objCollection = {a: 'letterA', b: 'letterB'};

        $.each(arrayCollection, function(i, num) {
            assert.equal(num, arrayCollection[i]);
        });

        $.each(objCollection, function(key, val) {
            assert.equal(objCollection[key], val);
        });

    });

    it('"each" loop can be broken when returning false', function() {

        var arrayCounter = 0;
        var objCounter = 0;

        $.each([3, 4, 5], function(i) {
            if (i > 0) { return false; }
            arrayCounter++;
        });

        $.each({a: 'letterA', b: 'letterB'}, function(key, val) {
            return false;
        });

        assert.equal(arrayCounter, 1);
        assert.equal(objCounter, 0);

    });

    it('"map" transforms collection values', function() {

        assert.deepEqual($.map([1, 2, 3], function(num) {
            return num * 2;
        }), [2, 4, 6]);

        assert.deepEqual($.map([1, 2, 3], function(num) {
            return num === 2 ? undefined : num;
        }), [1, 3]);

        assert.deepEqual($.map([1, 2, 3], function(num) {
            return num === 2 ? null : num;
        }), [1, 3]);

        assert.deepEqual($.map({foo: 'bar', te: 'st'}, function(value, key) {
            return key + value;
        }), ['foobar', 'test']);

    });

});
