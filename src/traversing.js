/*--------------------------------------------------------------
Traversing module

requires browser features:
--------------------------------------------------------------*/

;(function($) {

    $.fn.extend({

        parent: function() {

            return $($.map(this.nodes, function(el) {
                return el.parentNode;
            }));

        },

        children: function(selector) {

            var nodes = [];

            this.each(function() {

                nodes = Array.prototype.concat(nodes, $.slice(this.children));

            });

            return selector ? new $(nodes).filter(selector) : new $(nodes);

        },

        closest: function(selector) {

            return $($.map(this.nodes, function(el) {

                var foundNode;

                while (el.nodeType === 1) {

                    if ($.matches(el, selector)) {
                        foundNode = el;
                        break;
                    } else {
                        el = el.parentNode;
                    }

                }

                return foundNode;

            }));

        },

        filter: function(selector) {

            return $($.map(this.nodes, function(el) {

                return $.matches(el, selector) ? el : null;

            }));

        },

        index: function(node) {

            var index = -1;

            node instanceof $ && (node = node.get(0));

            this.each(function(i, el) {

                el === node && (index = i);

            });

            return index;

        },

        first: function() {

            return this.eq(0);

        },

        last: function() {

            return this.eq(this.length - 1);

        }

    });

})(window.simpleQuery);
