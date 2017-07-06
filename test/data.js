var assert = require('chai').assert;
var $ = require('../src/data');

require('../src/utils');

describe('Data', function() {

    var $element1;
    var $element2;

    beforeEach(function() {

        document.body.innerHTML =
            '<div data-id="test", data-order="3"></div>' +
            '<div></div>';

        $element1 = $('div').eq(0);
        $element2 = $('div').eq(1);

    });

    it('gets element data properties', function() {

        assert.deepEqual($element1.data(), {id: 'test', order: 3});
        assert.equal($element1.data('id'), 'test');

        assert.deepEqual($element2.data(), {});

    });

    it('sets element data properties', function() {

        $element1.data('foo', 'bar');
        assert.equal($element1.data('foo'), 'bar');
        assert.deepEqual($element1.data(), {id: 'test', order: 3, foo: 'bar'});

        $element2.data('foo', 'bar').data('ref-id', true);
        assert.deepEqual($element2.data(), {foo: 'bar', refId: true});

    });

});
