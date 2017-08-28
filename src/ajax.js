/*--------------------------------------------------------------
Ajax module

requires browser features: 'XMLHttpRequest' in window
--------------------------------------------------------------*/

(function($) {

    var ajaxDefaults = {
            url: '',
            method: 'GET',
            contentType: 'application/x-www-form-urlencoded',
            data: null,
            dataType: 'html',
            xhrFields: {
                withCredentials: false
            }
        },

        ajax = function(options) {

            options = $.extend({}, ajaxDefaults, options);

            if (options.data) {
                var isJSON = options.contentType.indexOf('json') > -1;

                if (!isJSON) {
                    options.data = $.param(options.data);
                }
            }

            var request = new XMLHttpRequest(),
                deferred = $.Deferred ? $.Deferred() : false,

                onError = function() {

                    options.error && options.error.apply(this, arguments);
                    deferred && deferred.reject.apply(deferred, arguments);

                };

            if (options.method === 'GET' && options.data) {
                options.url += (options.url.indexOf('?') >= 0 ? '&' : '?') + options.data;
            }

            request.open(options.method, options.url, true);

            request.withCredentials = options.xhrFields.withCredentials;

            options.method === 'POST' && request.setRequestHeader('Content-type', options.contentType);

            request.onload = function() {

                if (request.status >= 200 && request.status < 400) {

                    var args = [request.status !== 204 && request.getResponseHeader('content-type').indexOf('json') > -1 ? JSON.parse(request.response) : request.response, request.status, request];

                    options.dataType === 'script' && window['ev' + 'al'].call(window, $.trim(request.response));

                    typeof options.success === 'function' && options.success.apply(this, args);

                    deferred && deferred.resolve.apply(deferred, args);

                } else {

                    onError.apply(this, arguments);

                }

            };

            request.onerror = onError;
            request.send(options.data);

            return deferred;

        },

        shortAjax = function(method, url, data, callback) {

            return ajax({
                url: url,
                method: method,
                data: callback ? data : (typeof data === 'function' ? null : data),
                success: callback || (typeof data === 'function' ? data : null)
            });

        };

    $.extend($, {

        ajax: function(options) {

            return ajax(options);

        },

        get: function(url, data, callback) {

            return shortAjax('GET', url, data, callback);

        },

        post: function(url, data, callback) {

            return shortAjax('POST', url, data, callback);

        },

        param: function(obj) {

            var serialized = $.isArray(obj);

            return $.map(obj, function(item, key) {

                return encodeURIComponent(serialized ? item.name : key) + '=' + encodeURIComponent(serialized ? item.value : item);

            }).join('&');

        }

    });

    $.fn.extend({

        serializeArray: function() {

            return $.map(this[this.is('form') ? 'find' : 'filter']('input, textarea, select').nodes, function(el) {

                if (el.disabled) {

                    return null;

                } if (el.type === 'radio' || el.type === 'checkbox') {

                    return el.checked ? {name: el.name, value: el.value} : null;

                } else if (el.type === 'select') {

                    return {name: el.name, value: el.options[el.selectedIndex].value};

                } else {

                    return {name: el.name, value: el.value};

                }

            });

        },

        serialize: function() {

            return $.param(this.serializeArray());

        }

    });

})(window.simpleQuery);
