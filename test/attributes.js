var assert = require('chai').assert;
var $ = require('../src/attributes');

describe('Attributes', function() {

    var $elements;

    beforeEach(function() {
        document.body.innerHTML =
            '<input class="entryInput" value="Test text" placeholder="Type here..." type="text">' +
            '<input class="entryInput" placeholder="Also Type here..." type="text">' +
            '<select class="entryInput">' +
                '<option selected value="test1">Test1</option>' +
                '<option value="test2">Test2</option></select>' +
            '</select>';
        $elements = $('.entryInput');
    });

    it('"attr" gets element attribute', function() {

        assert.equal($elements.attr('placeholder'), 'Type here...');
        assert.equal($elements.eq(1).attr('placeholder'), 'Also Type here...');

    });

    it('"attr" sets element attribute', function() {

        $elements.attr('placeholder', 'test');

        assert.equal($elements.attr('placeholder'), 'test');
        assert.equal($elements.eq(1).attr('placeholder'), 'test');

    });

    it('"removeAttr" removes element attribute', function() {

        $elements.removeAttr('placeholder');

        assert.equal($elements.attr('placeholder'), undefined);
        assert.equal($elements.eq(1).attr('placeholder'), undefined);

    });

    it('"val" gets element value', function() {

        assert.equal($elements.val(), 'Test text');
        assert.equal($elements.eq(2).val(), 'test1');

    });

    it('"val" sets element value', function() {

        $elements.eq(0).val('Changed text');
        assert.equal($elements.eq(0).val(), 'Changed text');

    });

});
