var assert = require('chai').assert;
var $ = require('../src/dimensions');
var jQuery = require('jquery');

describe('Dimensions', function() {

    beforeEach(function() {

        var windowHeight = window.innerHeight;

        document.body.innerHTML =
            '<div class="spacer1" style="height: ' + 2 * windowHeight + 'px; padding: 10px;"></div>' +
            '<div class="spacer2"></div>' +
            '<style>.spacer2 { height: ' + windowHeight + 'px; padding: 10px; }</style>';
    });

    it('"height" gets elements height', function() {

        assert.equal($(window).height(), jQuery(window).height());
        assert.equal($('.spacer1').height(), jQuery('.spacer1').height());
        assert.equal($('.spacer2').height(), jQuery('.spacer2').height());

    });

    it('"width" gets elements width', function() {

        assert.equal($(window).width(), jQuery(window).width());
        assert.equal($('.spacer1').width(), jQuery('.spacer1').width());
        assert.equal($('.spacer2').width(), jQuery('.spacer2').width());

    });

    it('"outerHeight" gets elements outer height', function() {

        assert.equal($('.spacer1').outerHeight(), jQuery('.spacer1').outerHeight());
        assert.equal($('.spacer2').outerHeight(), jQuery('.spacer2').outerHeight());

    });

    it('"outerWidth" gets elements outer height', function() {

        assert.equal($('.spacer1').outerWidth(), jQuery('.spacer1').outerWidth());
        assert.equal($('.spacer2').outerWidth(), jQuery('.spacer2').outerWidth());

    });

    it('"outerWidth" gets elements outer height', function() {

        assert.equal($('.spacer1').outerWidth(), jQuery('.spacer1').outerWidth());
        assert.equal($('.spacer2').outerWidth(), jQuery('.spacer2').outerWidth());

    });

    it('"offset" gets element offset', function() {

        assert.deepEqual($('.spacer1').offset(), jQuery('.spacer1').offset());
        assert.deepEqual($('.spacer2').offset(), jQuery('.spacer2').offset());

    });

    it('"scrollTop" gets element scroll position', function(done) {

        assert.equal($(window).scrollTop(), jQuery(window).scrollTop());
        assert.equal($('.spacer1').scrollTop(), jQuery('.spacer1').scrollTop());
        assert.equal($('.spacer2').scrollTop(), jQuery('.spacer2').scrollTop());

        window.scrollTo(0, jQuery(window).height());

        setTimeout(function() {
            assert.equal($(window).scrollTop(), jQuery(window).scrollTop());
            done();
        }, 10);

    });

});
