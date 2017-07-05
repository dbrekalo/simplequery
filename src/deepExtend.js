/*--------------------------------------------------------------
Deep extend module
--------------------------------------------------------------*/

var $ = require('./core');

var shallowExtend = $.extend;

function deepExtend(out) {

    for (var i = 1; i < arguments.length; i++) {

        var obj = arguments[i];
        if (!obj) { continue; }

        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {

                    typeof out[key] === 'undefined' && (out[key] = {});
                    deepExtend(out[key], obj[key]);

                } else {
                    out[key] = obj[key];
                }
            }
        }

    }

    return out;

}

$.extend = function() {

    return typeof arguments[0] === 'boolean' ? deepExtend.apply(window, $.slice(arguments, 1)) : shallowExtend.apply(window, arguments);

};

module.exports = $;
