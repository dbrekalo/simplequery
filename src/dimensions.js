/*--------------------------------------------------------------
Dimesions module

dependencies: core, utils
requires browser features: 'getBoundingClientRect' in el
--------------------------------------------------------------*/

var $ = require('./core');
require('./css');

function isWindow(obj) {
    return obj !== null && obj === obj.window;
}

$.fn.extend({

    height: function() {

        var el = this.get(0);
        return isWindow(el) ? el.innerHeight : parseFloat(this.css('height'));

    },

    width: function() {

        var el = this.get(0);
        return isWindow(el) ? el.innerWidth : parseFloat(this.css('width'));

    },

    outerHeight: function() {

        return this.get(0).offsetHeight;

    },

    outerWidth: function() {

        return this.get(0).offsetWidth;

    },

    offset: function() {

        var offset = this.get(0).getBoundingClientRect();

        return {
            top: offset.top + window.pageYOffset,
            left: offset.left + window.pageXOffset
        };

    },

    scrollTop: function() {

        var el = this.get(0),
            doc = document.documentElement;

        return isWindow(el) ? (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0) : el.scrollTop;

    }

});

module.exports = $;
