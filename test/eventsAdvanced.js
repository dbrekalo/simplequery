var assert = require('chai').assert;
var $ = require('../src/eventsAdvanced');
var jQuery = require('jquery');

describe('Events advanced', function() {

    beforeEach(function() {
        document.body.innerHTML =
            '<div class="guestbook">' +
                '<form><input name="input" type="text" value="" /></form>' +
            '</div>';
    });

    it('"on" adds event listener to element', function(done) {

        $('.guestbook form').on('click', function(e) {
            assert.isTrue($(e.target).is('input'));
            assert.isTrue($(e.currentTarget).is('form'));
            done();
        });

        jQuery('.guestbook form input').trigger('click');

    });

    it('"on" supports event delegation', function(done) {

        $('.guestbook').on('click', 'form', function(e) {
            e.preventDefault();
            e.stopPropagation();
            assert.isTrue($(e.target).is('input'));
            assert.isTrue($(e.currentTarget).is('form'));
            assert.isTrue($(e.delegateTarget).is('div'));
            done();
        });

        $('.guestbook').get(0).innerHTML = '<form><input type="text" /></form>';

        jQuery('.guestbook input').trigger('click');

    });

    it('"on" can add event listeners to window and document objects', function(done) {

        var resizeOccured;
        var keyupOccured;

        $(window).on('resize', function(e) {
            assert.isTrue(e.target === window);
            resizeOccured = true;
        });

        $(document).on('keyup', function(e) {
            keyupOccured = true;
        });

        window.dispatchEvent(new Event('resize'));
        document.dispatchEvent(new Event('keyup'));

        setTimeout(function() {
            assert.isTrue(resizeOccured);
            assert.isTrue(keyupOccured);
            done();
        }, 10);

    });

    it('"on" renames mouseenter and mouseleave events', function(done) {

        var mouseenterOccured = false;
        var mouseleaveOccured = false;

        $('.guestbook').on('mouseenter', function(e) {
            assert.strictEqual(e.target, $('.guestbook').get(0));
            mouseenterOccured = true;
        });

        $('.guestbook').on('mouseleave', function(e) {
            assert.strictEqual(e.target, $('.guestbook').get(0));
            mouseleaveOccured = true;
        });

        $('.guestbook').get(0).dispatchEvent(new Event('mouseover'));
        $('.guestbook').get(0).dispatchEvent(new Event('mouseout'));

        setTimeout(function() {
            assert.isTrue(mouseenterOccured);
            assert.isTrue(mouseleaveOccured);
            done();
        }, 10);

    });

    it('"one" executes event listener only once', function(done) {

        var counter = 0;
        var counterOne = 0;
        var formCounter = 0;

        $('.guestbook').one('click', function(e) {
            counterOne++;
        }).on('click', function() {
            counter++;
        }).one('click', 'form', function(e) {
            formCounter++;
        });

        jQuery('.guestbook').trigger('click').trigger('click').trigger('click');
        jQuery('.guestbook form').trigger('click').trigger('click');

        setTimeout(function() {
            assert.equal(counter, 5);
            assert.equal(counterOne, 1);
            assert.equal(formCounter, 1);
            done();
        }, 10);

    });

    it('"off" with no arguments removes all event listeners ', function(done) {

        var eventCounter = 0;

        $('.guestbook input').on('click focus', function(e) {
            eventCounter++;
        }).on('click', function() {
            eventCounter++;
        });

        jQuery('.guestbook input').trigger('click').trigger('focus');

        $('.guestbook input').off();

        jQuery('.guestbook input').trigger('click').trigger('focus');

        setTimeout(function() {
            assert.equal(eventCounter, 3);
            done();
        }, 10);

    });

    it('"off" removes namespaced event listeners ', function(done) {

        var eventCounter = 0;

        $('.guestbook input').on('click focus.namespace', function(e) {
            eventCounter++;
        });

        jQuery('.guestbook input').trigger('click').trigger('focus');

        $('.guestbook input').off('.namespace');

        jQuery('.guestbook input').trigger('click').trigger('focus');

        setTimeout(function() {
            assert.equal(eventCounter, 3);
            done();
        }, 10);

    });

    it('"off" removes specific event handler ', function(done) {

        var eventCounter = 0;
        var eventContext;

        var handler = function() {
            eventContext = this;
            eventCounter++;
            return false;
        };

        $('.guestbook input').on('click', handler);
        jQuery('.guestbook input').trigger('click');
        $('.guestbook input').off('click', handler);
        jQuery('.guestbook input').trigger('click');

        setTimeout(function() {
            assert.equal(eventCounter, 1);
            assert.strictEqual(eventContext, $('.guestbook input').get(0));
            done();
        }, 10);

    });

    it('"off" can called on elements that have no registered event handlers', function() {

        assert.doesNotThrow(function() {
            $('.guestbook').off('click');
        });

    });

});
