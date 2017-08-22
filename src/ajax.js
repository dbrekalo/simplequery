/*--------------------------------------------------------------
Ajax module

requires browser features: 'XMLHttpRequest' in window
--------------------------------------------------------------*/
var $ = require('./core');
require('./utils');
require('./deferreds');

var ajaxDefaults = {
    url: '',
    method: 'GET',
    data: null,
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType: 'html',
    xhrFields: {
        withCredentials: false
    }
};

function ajax(options) {

    options = $.extend({}, ajaxDefaults, options);

    if (options.data && typeof options.data !== 'string') {
        options.data = $.param(options.data);
    }

    var request = new XMLHttpRequest();
    var deferred = $.Deferred();

    var onError = function() {

        var args = $.slice(arguments);
        var ref = args[0].target;

        args[0] = $.extend(args[0], {
            responseText: ref.responseText,
            status: ref.status,
            statusText: ref.statusText
        });

        options.error && options.error.apply(this, args);
        deferred.reject.apply(deferred, args);

    };

    if (options.method === 'GET' && options.data) {
        options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + options.data;
    }

    request.open(options.method, options.url, true);

    request.withCredentials = options.xhrFields && options.xhrFields.withCredentials;
    request.setRequestHeader('Content-type', options.contentType);

    request.onload = function() {

        var contentType = request.getResponseHeader('content-type');
        var responseText = request.responseText;

        if (request.status >= 200 && request.status < 400) {

            var args = [contentType.indexOf('json') > -1 ? JSON.parse(responseText) : responseText, request.status, request];

            if (options.dataType === 'script') {
                window.eval.call(window, $.trim(responseText));
            }

            if (typeof options.success === 'function') {
                options.success.apply(this, args);
            }

            deferred.resolve.apply(deferred, args);

        } else {

            onError.apply(this, arguments);

        }

    };

    request.onerror = onError;
    request.send(options.data);

    return deferred;

}

function shortAjax(method, url, data, callback) {

    return ajax({
        url: url,
        method: method,
        data: callback ? data : (typeof data === 'function' ? null : data),
        success: callback || (typeof data === 'function' ? data : null)
    });

}

$.extend($, {

    ajax: function(options) {

        return ajax(options);

    },

    get: function(url, data, callback) {

        return shortAjax('GET', url, data, callback);

    },

    post: function(url, data, callback) {

        return shortAjax('POST', url, data, callback);

    }

});

module.exports = $;
