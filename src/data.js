/*--------------------------------------------------------------
Data module
--------------------------------------------------------------*/

var $ = require('./core');

var elDataStore = {},
    exp = 'simpleQuery' + (Date.now && Date.now()),
    counter = 0,

    camelize = function(str) {

        return str.replace(/-+(.)?/g, function(match, chr) {

            return chr ? chr.toUpperCase() : '';

        });

    },

    set = function(el, key, data) {

        var id = el[exp] || (el[exp] = ++counter),
            elData = elDataStore[id] || (elDataStore[id] = getAttributeData(el));

        if (typeof key !== 'undefined') {
            elData[camelize(key)] = data;
        }

        return elData;

    },

    get = function(el, key) {

        var id = el[exp],
            elData = id && elDataStore[id];

        !elData && (elData = set(el));

        return key ? elData[camelize(key)] : elData;

    },

    getAttributeData = function(el) {

        var data = {};

        $.each(el.attributes || [], function(i, attr) {

            if (attr && attr.name && attr.name.indexOf('data-') === 0) {
                data[camelize(attr.name.replace('data-', ''))] = attr.value;
            }

        });

        return data;

    };

$.data = function(el, key, data) {

    return arguments.length === 3 ? set.apply(window, arguments) : get.apply(window, arguments);

};

$.fn.data = function(key, value) {

    if (typeof value === 'undefined') {

        return $.data(this.get(0), key);

    } else {

        $.data(this.get(0), key, value);
        return this;

    }

};

module.exports = $;
