var assert = require('chai').assert;
var $ = require('../src/ajax');
var Pretender = require('pretender');

describe('Ajax', function() {

    var server;

    beforeEach(function() {

        server = new Pretender(function() {

            this.get('/get-html-test', function(request) {
                return [200, {'Content-Type': 'application/html'}, '<div class="test"></div>'];
            });

            this.get('/get-json-test', function(request) {
                return [200, {'Content-Type': 'application/json'}, JSON.stringify(request.queryParams)];
            });

            this.get('/get-error-test', function(request) {
                return [404, {'Content-Type': 'application/html'}, 'Test error message'];
            });

            this.get('/get-script', function(request) {
                return [200, {'Content-Type': 'application/javascript'}, 'window.scriptLoaded=true;'];
            });

            this.post('/post-test', function(request) {
                return [200, {'Content-Type': 'application/html'}, request.requestBody];
            });

        });

    });

    afterEach(function() {

        server.shutdown();

    });

    it('"get" can retrieve html from server', function(done) {

        $.get('/get-html-test', function(html) {
            assert.equal(html, '<div class="test"></div>');
            done();
        });

    });

    it('"get" can retrieve and parse json from server', function(done) {

        $.get('/get-json-test?foo=bar', {bar: 'foo'}, function(data) {
            assert.deepEqual(data, {foo: 'bar', bar: 'foo'});
            done();
        });

    });

    it('"get" handles failed requests', function(done) {

        $.get('/get-error-test', {foo: 'bar'}).fail(function(data) {
            assert.equal(data.responseText, 'Test error message');
            assert.equal(data.status, 404);
            assert.equal(data.statusText, 'Not Found');
            done();
        });

    });

    it('"post" loads data from server via post request', function(done) {

        $.post('/post-test', {foo: 'bar'}).then(function(data) {
            assert.equal(data, 'foo=bar');
            done();
        });

    });

    it('"ajax" handles failed requests', function(done) {

        $.ajax({
            url: '/get-error-test',
            error: function(data) {
                assert.equal(data.responseText, 'Test error message');
                assert.equal(data.status, 404);
                assert.equal(data.statusText, 'Not Found');
                done();
            }
        });

    });

    it('"ajax" executes downloaded scripts', function(done) {

        $.ajax({
            url: '/get-script?test=true',
            dataType: 'script'
        }).done(function() {
            assert.isTrue(window.scriptLoaded);
            delete window.scriptLoaded;
            done();
        });

    });

});
