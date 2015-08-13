/*--------------------------------------------------------------
Events module

requires browser features: 'addEventListener' in el, 'removeEventListener' in el
--------------------------------------------------------------*/

;(function($) {

    var eventStore = {},
        exp = 'simpleQueryEH' + (Date.now && Date.now()),
        counter = 0,
        oneCounter = 0,

        findMatchingParent = function(el, selector, containment) {

            var matchingNode,
                parent = el.parentNode;

            if (!parent) { return; }

            while (parent && parent.nodeType === 1 && parent !== containment) {

                if ($.matches(parent, selector)) {
                    matchingNode = parent;
                    break;
                } else {
                    parent = parent.parentNode;
                }

            }

            return matchingNode;

        },

        getElStore = function(el, eventType) {

            var elId = el[exp] || (el[exp] = ++counter);

            eventStore[elId] = eventStore[elId] || {};

            return eventStore[elId][eventType] || (eventStore[elId][eventType] = []);

        },

        normalizeEvent = function(e) {

            var normalizedEvent = {};

            for (var key in e) {

                normalizedEvent[key] = e[key];

            }

            return $.extend(normalizedEvent, {
                preventDefault: function() { e.preventDefault(); },
                stopPropagation: function() { e.stopPropagation(); }
            });

        },

        addEvent = function(el, eventType, selector, handler) {

            var currentStore = getElStore(el, eventType),
                realHandler = handler ? handler : selector,
                realSelector = handler ? selector : false,
                eventName = eventType.split('.')[0],

                proxyHandler = function(e) {

                    var returnValue;

                    if (realSelector) {

                        e = normalizeEvent(e);

                        e.delegateTarget = el;

                        if ($(e.target).is(realSelector)) {

                            e.currentTarget = e.target;
                            returnValue = realHandler.call(e.target, e);

                        } else {

                            var targetNode = findMatchingParent(e.target, realSelector, el);

                            if (targetNode) {

                                e.currentTarget = targetNode;
                                returnValue = realHandler.call(targetNode, e);

                            }

                        }

                    } else {

                        returnValue = realHandler.call(e.target, e);

                    }

                    returnValue === false && e.preventDefault() && e.stopPropagation();

                };

            eventName === 'mouseenter' && (eventName = 'mouseover');
            eventName === 'mouseleave' && (eventName = 'mouseout');

            realHandler['proxyHandler' + exp] = proxyHandler;

            currentStore.push(proxyHandler);

            el.addEventListener(eventName, proxyHandler, false);

        },

        removeEvents = function(el, namespace) {

            var elId = el[exp];

            if (typeof elId === 'undefined') { return; }

            $.each(eventStore[elId], function(key, eventList) {

                if (!namespace || key.indexOf(namespace) >= 0) {

                    $.each(eventList, function(i, handler) {

                        el.removeEventListener(key.split('.')[0], handler, false);

                    });

                    delete eventStore[elId][key];

                }

            });

        };

    $.fn.extend({

        on: function(eventType, selector, handler) {

            return this.each(function(i, el) {
                $.each(eventType.split(' '), function(i, singleEvent) {
                    addEvent(el, singleEvent, selector, handler);
                });
            });

        },

        one: function(eventType, selector, handler) {

            return this.each(function(i, el) {

                $.each(eventType.split(' '), function(i, singleEvent) {

                    var namespace = '.one' + exp + (++oneCounter),
                        realHandler = handler || selector;

                    addEvent(el, singleEvent + namespace, handler ? selector : false, function() {
                        realHandler.apply(this, arguments);
                        $(el).off(namespace);
                    });

                });

            });

        },

        off: function(namespace, handler) {

            return this.each(function(i, el) {

                handler ? el.removeEventListener(namespace.split('.')[0], handler['proxyHandler' + exp], false) : removeEvents(el, namespace);

            });

        },

        trigger: function() {

            return this;

        }

    });

})(window.simpleQuery);
