/*--------------------------------------------------------------
Utils module
--------------------------------------------------------------*/

;(function($) {

    $.extend($, {

        isEmptyObject: function(obj) {

            var name;
            for (name in obj) { return false; }
            return true;

        },

        isNumeric: function(n) {

            return !isNaN(+n) && isFinite(n);

        },

        contains: function(container, el) {

            var contains = false,
                parent = el.parentNode;

            while (parent.nodeType === 1) {

                if (parent === container) {
                    contains = true;
                    break;
                }

                parent = parent.parentNode;

            }

            return contains;

        },

        parseJSON: function(data) {

            return JSON.parse(data);

        }

    });

})(window.simpleQuery);
