/*--------------------------------------------------------------
Classes module

requires browser features: 'classList' in el
--------------------------------------------------------------*/

var $ = require('./core');

function classHandlerProxy(className, callback) {

    var classNames = $.trim(className).split(' ');

    return this.each(function(i, el) {

        $.each(classNames, function(i, singleClass) {
            callback(el, singleClass);
        });

    });

}

$.fn.extend({

    addClass: function(className) {

        return classHandlerProxy.call(this, className, function(el, singleClass) {
            el.classList.add(singleClass);
        });

    },

    removeClass: function(className) {

        return classHandlerProxy.call(this, className, function(el, singleClass) {
            el.classList.remove(singleClass);
        });

    },

    hasClass: function(className) {

        return this.nodes[0].classList.contains(className);

    },

    toggleClass: function(className, condition) {

        return classHandlerProxy.call(this, className, function(el, singleClass) {

            if (typeof condition !== 'undefined') {
                el.classList[condition ? 'add' : 'remove'](singleClass);
            } else {
                el.classList.toggle(singleClass);
            }

        });

    }
});

module.exports = $;
