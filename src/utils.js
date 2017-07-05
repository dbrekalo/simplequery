/*--------------------------------------------------------------
Utils module
--------------------------------------------------------------*/

var $ = require('./core');
require('./traversing');

$.extend($, {

    isEmptyObject: function(obj) {

        var name;
        for (name in obj) { return false; }
        return true;

    },

    isNumeric: function(n) {

        return !isNaN(parseFloat(n)) && isFinite(n);

    },

    contains: function(container, el) {

        var contains = false,
            parent = el.parentNode;

        while (parent && parent.nodeType === 1) {

            if (parent === container) {
                contains = true;
                break;
            }

            parent = parent.parentNode;

        }

        return contains;

    },

    param: function(obj) {

        var serialized = $.isArray(obj);

        return $.map(obj, function(item, key) {

            return encodeURIComponent(serialized ? item.name : key) + '=' + encodeURIComponent(serialized ? item.value : item);

        }).join('&');

    },

    parseJSON: function(data) {

        return JSON.parse(data);

    }

});

$.fn.extend({

    serializeArray: function() {

        return $.map(this[this.is('form') ? 'find' : 'filter']('input, textarea, select').nodes, function(el) {

            if (el.disabled) {

                return null;

            } if (el.type === 'radio' || el.type === 'checkbox') {

                return el.checked ? {name: el.name, value: el.value} : null;

            } else if (el.type === 'select-multiple') {

                return {name: el.name, value: $.map(el.options, function(option) {
                    return option.selected ? option.value : undefined;
                })};

            } else {

                return {name: el.name, value: el.value};

            }

        });

    },

    serialize: function() {

        return $.param(this.serializeArray());

    }

});

module.exports = $;
