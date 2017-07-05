/*--------------------------------------------------------------
Attributes module
--------------------------------------------------------------*/
var $ = require('./core');

$.fn.extend({

    attr: function(name, value) {

        return typeof value !== 'undefined' ? this.each(function() {

            this.setAttribute(name, value);

        }) : this.get(0).getAttribute(name);

    },

    removeAttr: function(name) {

        return this.each(function() {
            this.removeAttribute(name);
        });

    },

    val: function(value) {

        if (typeof value === 'undefined') {
            return this.get(0).value;
        }

        this.get(0).value = value;
        return this;

    }

});

module.exports = $;
