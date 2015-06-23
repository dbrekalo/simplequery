/*--------------------------------------------------------------
Css module

requires browser features: 'getComputedStyle' in window
--------------------------------------------------------------*/

simpleQuery.fn.extend({

    css: function(rule, value) {

        return typeof value !== 'undefined' ? this.each(function() {

            this.style[rule] = value;

        }) : getComputedStyle(this.get(0))[rule];

    }

});
