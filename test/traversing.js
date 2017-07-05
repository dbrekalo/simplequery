var assert = require('chai').assert;
var $ = require('../src/traversing');

describe('Traversing', function() {

    beforeEach(function() {
        document.body.innerHTML =
            '<div class="guestbook">' +
                '<form>' +
                    '<input class="entryInput" placeholder="Type here..." type="text">' +
                    '<input class="entryInput" placeholder="Type here..." type="text">' +
                    '<span>Test</span>' +
                '</form>' +
            '</div>' +
            '<div class="guestbook">' +
                '<form>' +
                    '<input class="entryInput" placeholder="Type here..." type="text">' +
                    '<input class="entryInput" placeholder="Type here..." type="text">' +
                '</form>' +
            '</div>';
    });

    it('"find" searches for elements inside current instance', function() {

        var $inputs = $('.guestbook').find('input');

        assert.instanceOf($inputs, $);
        assert.equal($inputs.length, document.querySelectorAll('.entryInput').length);
        assert.strictEqual($inputs.get(0), document.querySelectorAll('.entryInput')[0]);

        assert.equal($('.undefinedSelector').length, 0);
        assert.equal($(window).find('inputs').length, 0);

    });

    it('"filter" filters current node collection', function() {

        assert.equal($('form').children().filter('input').length, 4);

    });

    it('"parent" creates nodes collection from parent nodes', function() {

        assert.isTrue($('.guestbook > form').parent().is('.guestbook'));
        assert.equal($('.guestbook > form').parent().length, 2);

    });

    it('"children" creates nodes collection from child nodes', function() {

        assert.equal($('.guestbook > form').children().length, 5);
        assert.equal($('.guestbook > form').children('input').length, 4);

    });

    it('"closest" creates nodes collection from ancestors', function() {

        assert.equal($('.guestbook span').closest('.guestbook').length, 1);
        assert.equal($('form').closest('.guestbook').length, 2);

    });

    it('"index" gets element index', function() {

        assert.equal($('.guestbook span').index(), 2);
        assert.equal($('.guestbook input').eq(0).index(), 0);

        assert.equal($('.guestbook input').index($('.guestbook input').eq(1)), 1);

    });

    it('"first" gets first element in collection', function() {

        assert.equal($('.guestbook input').first().index(), 0);
        assert.strictEqual($('.guestbook input').first().get(0), $('.guestbook input').get(0));

    });

    it('"last" gets last element in collection', function() {

        assert.equal($('.guestbook input').last().index(), 1);
        assert.strictEqual($('.guestbook input').last().get(0), $('.guestbook input').get(3));

    });

});
