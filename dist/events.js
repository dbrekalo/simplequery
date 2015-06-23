/*--------------------------------------------------------------
Events module

requires browser features: 'addEventListener' in el, 'removeEventListener' in el
--------------------------------------------------------------*/

simpleQuery.fn.extend({

    on: function(eventType, selector, handler) {

        var eventHandler = handler || selector,
            $collection = handler ? this.find(selector) : this;

        $collection.each(function(i, el) {

            el.addEventListener(eventType.split('.')[0], eventHandler, false);

        });

        return this;

    },

    off: function(eventType, selector, handler) {

        var eventHandler = handler || selector,
            $collection = handler ? this.find(selector) : this;

        $collection.each(function(i, el) {

            el.removeEventListener(eventType.split('.')[0], eventHandler, false);

        });

        return this;

    }

});
