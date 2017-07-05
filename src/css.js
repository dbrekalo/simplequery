/*--------------------------------------------------------------
Css module

requires browser features: 'getComputedStyle' in window
--------------------------------------------------------------*/

var $ = require('./core');

$.fn.extend({

    css: function(rule, value) {

        return typeof value !== 'undefined' ? this.each(function() {

            this.style[rule] = value;

        }) : getComputedStyle(this.get(0))[rule];

    }

});

module.exports = $;
