var assert = require('chai').assert;
var $ = require('../src/classes');

describe('Classes', function() {

    var $elements;

    beforeEach(function() {
        document.body.innerHTML = '<div></div><div class="test"></div>';
        $elements = $('div');

    });

    it('"addClass" appends to element class list', function() {

        $elements.addClass('test test2').each(function(i, el) {
            assert.equal(el.getAttribute('class'), 'test test2');
        });

    });

    it('"removeClass" removes classes from element class list', function() {

        $elements.removeClass('test test2').each(function(i, el) {
            assert.isTrue(el.getAttribute('class') === null || el.getAttribute('class') === '');
        });

    });

    it('"hasClass" checks if className exists in element class list', function() {

        assert.isFalse($elements.eq(0).hasClass('test'));
        assert.isTrue($elements.eq(1).hasClass('test'));

    });

    it('"toggleClass" toggles classes in element class list', function() {

        assert.isTrue($elements.eq(0).toggleClass('test').hasClass('test'));
        assert.isTrue($elements.eq(0).toggleClass('test2', true).hasClass('test2'));

        assert.isFalse($elements.eq(1).toggleClass('test').hasClass('test'));
        assert.isFalse($elements.eq(1).toggleClass('test', false).hasClass('test'));

    });

});
