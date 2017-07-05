var assert = require('chai').assert;
var $ = require('../src/events');
var jQuery = require('jquery');

describe('Events', function() {

    beforeEach(function() {
        document.body.innerHTML =
            '<div class="guestbook">' +
                '<form></form>' +
            '</div>';
    });

    it('"on" adds event listener to element', function(done) {

        $('.guestbook').on('click', function(e) {
            assert.isTrue($(e.target).is('.guestbook'));
            assert.isTrue($(e.currentTarget).is('.guestbook'));
            done();
        });

        jQuery('.guestbook').trigger('click');

    });

    it('"on" adds event listener to elements found via selector', function(done) {

        $('.guestbook').on('click.myNamespace', 'form', function(e) {
            assert.isTrue($(e.target).is('form'));
            assert.isTrue($(e.currentTarget).is('form'));
            done();
        });

        jQuery('.guestbook form').trigger('click');

    });

    it('"off" removes attached event listeners', function(done) {

        var clicked = false;
        var handler = function(e) {
            clicked = true;
        };

        $('.guestbook').on('click', handler).off('click', handler);

        jQuery('.guestbook').trigger('click');

        setTimeout(function() {
            assert.isFalse(clicked);
            done();
        }, 10);

    });

    it('"off" removes attached event listeners to elements found via selector', function(done) {

        var clicked = false;
        var handler = function(e) {
            clicked = true;
        };

        $('.guestbook').on('click', 'form', handler).off('click', 'form', handler);

        jQuery('.guestbook form').trigger('click');

        setTimeout(function() {
            assert.isFalse(clicked);
            done();
        }, 10);

    });

});
