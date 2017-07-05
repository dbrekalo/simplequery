var assert = require('chai').assert;
var $ = require('../src/css');

describe('CSS', function() {

    var $element;

    beforeEach(function() {

        document.body.innerHTML = '<div class="test" style="display: block;"></div>';
        $element = $('.test');

    });

    it('gets element style properties', function() {

        assert.equal($element.css('display'), 'block');

    });

    it('sets element style properties', function() {

        $element.css('display', 'inline');
        $element.css('fontSize', '12px');

        assert.equal($element.css('display'), 'inline');
        assert.equal($element.css('fontSize'), '12px');

    });

});
