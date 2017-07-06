/*--------------------------------------------------------------
Core module

requires browser features:
'querySelectorAll' in el
'isArray' in Array
el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector
--------------------------------------------------------------*/

function $(selector) {

    return selector instanceof $ ? selector : this instanceof $ ? this.init(selector) : new $(selector);

}

var api = {

    init: function(selector) {

        var nodes = [];

        if ($.isArray(selector)) {

            nodes = selector;

        } else if (typeof selector === 'string') {

            selector = $.trim(selector);
            nodes = selector[0] === '<' ? $.parseHtml(selector) : $.queryNodes(selector);

        } else {

            nodes = [selector];

        }

        this.nodes = nodes;
        this.length = nodes.length;

    },

    each: function(callback) {

        for (var i = 0; i < this.length; i++) {
            if (callback.call(this.nodes[i], i, this.nodes[i]) === false) {
                break;
            }
        }

        return this;

    },

    map: function(callback) {

        return new $($.map(this.nodes, function(el, i) {
            return callback.call(el, i, el);
        }));

    },

    eq: function(index) {

        return new $(this.get(index));

    },

    get: function(index) {

        return typeof index !== 'undefined' ? this.nodes[index] : this.nodes;

    },

    is: function(selector) {

        return selector instanceof $ ? this.nodes[0] === selector.nodes[0] : $.matches(this.nodes[0], selector);

    },

    extend: function(plugins) {

        $.extend(api, plugins);

    }

};

var utils = {

    isArray: Array.isArray,

    each: function(collection, callback) {

        if ($.isArray(collection)) {

            for (var i = 0; i < collection.length; i++) {
                if (callback(i, collection[i]) === false) { break; }
            }

        } else {

            for (var key in collection) {
                if (callback(key, collection[key]) === false) { break; }
            }

        }

    },

    extend: function(out) {

        out === true && (out = {});

        for (var i = 1; i < arguments.length; i++) {

            for (var key in arguments[i]) {
                arguments[i].hasOwnProperty(key) && (out[key] = arguments[i][key]);
            }

        }

        return out;

    },

    parseHtml: function(html) {

        var div = document.createElement('div');
        div.innerHTML = html;

        return $.slice(div.childNodes);

    },

    queryNodes: function(selector, context) {

        context = context || document;
        return context.querySelectorAll ? $.slice(context.querySelectorAll(selector)) : [];

    },

    matches: function(el, selector) {

        return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector).call(el, selector);

    },

    trim: function(string) {

        return string.trim();

    },

    map: function(collection, callback) {

        var temp = [],

            iterator = function(value, key) {
                var result = callback(value, key);
                typeof result !== 'undefined' && result !== null && temp.push(result);
            };

        if ($.isArray(collection)) {

            for (var i = 0; i < collection.length; i++) {
                iterator(collection[i], i);
            }

        } else {

            for (var key in collection) {
                iterator(collection[key], key);
            }

        }

        return temp;

    },

    slice: function(obj, start, end) {

        return Array.prototype.slice.call(obj, start, end);

    }

};

$.prototype = $.fn = api;
utils.extend($, utils);

module.exports = $;
