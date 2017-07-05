var assert = require('chai').assert;
var $ = require('../src/manipulation');
var jQuery = require('jquery');

require('../src/events');
require('../src/traversing');

describe('Manipulation', function() {

    beforeEach(function() {
        document.body.innerHTML =
            '<div class="guestbook">' +
                '<form>' +
                    '<input class="entryInput" placeholder="Type here..." type="text">' +
                    '<input class="entryInput" placeholder="Type here..." type="text">' +
                    '<button>OK</button>' +
                '</form>' +
            '</div>';
    });

    it('"append" appends content to current instance elements', function() {

        $('.guestbook')
            .append('<span class="test1"></span>')
            .append($('<span class="test2"></span>'));

        assert.equal($('.guestbook .test1').length, 1);
        assert.equal($('.guestbook .test1').index(), 1);
        assert.equal($('.guestbook .test2').length, 1);
        assert.equal($('.guestbook .test2').index(), 2);

    });

    it('"prepend" prepends content to current instance elements', function() {

        $('.guestbook').prepend('<span class="test1"></span>');

        assert.equal($('.guestbook .test1').length, 1);
        assert.equal($('.guestbook .test1').index(), 0);

    });

    it('"appendTo" appends current instance elements to target instance elements', function() {

        $('<span class="test1"></span>').appendTo('.guestbook');

        assert.equal($('.guestbook .test1').length, 1);
        assert.equal($('.guestbook .test1').index(), 1);

    });

    it('"prependTo" prepends current instance elements to target instance elements', function() {

        $('<span class="test1"></span>').prependTo('.guestbook');

        assert.equal($('.guestbook .test1').length, 1);
        assert.equal($('.guestbook .test1').index(), 0);

    });

    it('"remove" removes current instance elements', function() {

        $('.guestbook input').remove();

        assert.equal($('.guestbook input').length, 0);

    });

    it('"detach" detaches current instance elements', function(done) {

        var clickOccured;

        var $input = $('.guestbook input').on('click', function() {
            clickOccured = true;
        }).detach();

        assert.equal($('.guestbook input').length, 0);

        $input.appendTo('.guestbook form');

        jQuery('.guestbook input').trigger('click');

        setTimeout(function() {
            assert.isTrue(clickOccured);
            done();
        }, 10);

    });

    it('"empty" cleans instance elements content', function() {

        $('.guestbook').empty();

        assert.equal($('.guestbook form').length, 0);

    });

    it('"html" gets and sets instance elements html', function() {

        assert.equal(
            $('.guestbook form').html(),
            '<input class="entryInput" placeholder="Type here..." type="text">' +
            '<input class="entryInput" placeholder="Type here..." type="text">' +
            '<button>OK</button>'
        );

        $('.guestbook').html('<span>Test</span>');

        assert.equal($('.guestbook').html(), '<span>Test</span>');

        $('.guestbook').html('Test');

        assert.equal($('.guestbook').html(), 'Test');

    });

    it('"text" gets and sets instance elements text content', function() {

        assert.equal($('.guestbook button').text(), 'OK');

        $('.guestbook button').text('OK test');

        assert.equal($('.guestbook button').text(), 'OK test');

    });

    it('"replaceWith" replaces instance elements', function() {

        $('.guestbook input').replaceWith('<span class="test1"></span>');

        assert.equal($('.guestbook input').length, 0);
        assert.equal($('.guestbook .test1').length, 2);

    });

});
