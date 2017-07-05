var assert = require('chai').assert;
var $ = require('../src/deferreds');

describe('Deferreds', function() {

    it('can be created with or without new operator', function() {

        assert.isFunction($.Deferred().then);
        assert.isFunction(new $.Deferred().then);

    });

    it('can be resolved with given arguments', function() {

        $.Deferred().done(function(resolveText) {
            assert.equal(resolveText, 'sync resolve');
        }).resolve('sync resolve');

        $.Deferred().done(function(resolveText, status) {
            assert.equal(resolveText, 'sync resolve');
            assert.isTrue(status);
        }).resolve('sync resolve', true);

    });

    it('reports state properly', function(done) {

        var deferred = $.Deferred().done(function(resolveText) {
            assert.equal(resolveText, 'async resolve');
        });

        assert.isTrue(deferred.state() === 'pending');

        setTimeout(function() {
            deferred.resolve('async resolve');
            assert.isTrue(deferred.state() === 'resolved');
            done();
        }, 10);

    });

    it('can be rejected with given arguments', function() {

        $.Deferred().fail(function(rejectText) {
            assert.equal(rejectText, 'sync reject');
        }).reject('sync reject');

    });

    it('then can be used to add done and fail callbacks', function() {

        $.Deferred().then(function(resolveText) {
            assert.equal(resolveText, 'sync resolve');
        }).resolve('sync resolve');

        $.Deferred().then(null, function(rejectText) {
            assert.equal(rejectText, 'sync reject');
        }).reject('sync reject');

    });

    it('when method waits for one deferred', function() {

        $.when(true).done(function(val) {
            assert.isTrue(val);
        });

        $.when($.Deferred().resolve('foo', 'bar')).done(function(val1, val2) {
            assert.equal(val1 + val2, 'foobar');
        });

        $.when($.Deferred().reject(true)).fail(function(val) {
            assert.isTrue(val);
        });

    });

    it('when method waits for list of deferreds', function(done) {

        $.when($.Deferred().resolve('foo'), $.Deferred().resolve('bar', true)).done(function(val1, val2) {
            assert.equal(val1, 'foo');
            assert.equal(val2[0], 'bar');
            assert.equal(val2[1], true);
        });

        $.when($.Deferred().resolve('foo'), $.Deferred().reject('bar')).fail(function(val) {
            assert.equal(val, 'bar');
        });

        $.when('test', [], true, {}, $.Deferred().resolve('foo')).done(function(val1, val2, val3, val4, val5) {
            assert.equal(val1, 'test');
            assert.deepEqual(val2, []);
            assert.isTrue(val3);
            assert.deepEqual(val4, {});
            assert.equal(val5, 'foo');
        });

        var deferred1 = $.Deferred();
        var deferred2 = $.Deferred();

        $.when(deferred1, deferred2).done(function(val1, val2) {
            assert.equal(val1 + val2, 'foobar');
        });

        setTimeout(function() {
            deferred1.resolve('foo');
            setTimeout(function() {
                deferred2.resolve('bar');
                done();
            }, 10);
        }, 10);

    });

});
