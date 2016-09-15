/*--------------------------------------------------------------
Deferred module
--------------------------------------------------------------*/

(function($) {

    function Deferred() {

        this.onDone = [];
        this.onFail = [];

    }

    function finalize(method, args) {

        if (!this.finalized) {

            this.finalized = true;
            this[method === 'resolve' ? 'doneWith' : 'failedWith' ] = args;

            $.each(this[method === 'resolve' ? 'onDone' : 'onFail' ], function(i, callback) {
                callback.apply(this, args);
            });

        }

    }

    Deferred.prototype = {

        done: function(callback) {

            this.doneWith ? callback.apply(this, this.doneWith) : this.onDone.push(callback);
            return this;

        },

        fail: function(callback) {

            this.failedWith ? callback.apply(this, this.failedWith) : this.onFail.push(callback);
            return this;

        },

        always: function(callback) {

            this.done(callback).fail(callback);
            return this;

        },

        resolve: function() {

            finalize.call(this, 'resolve', $.slice(arguments));

        },

        reject: function() {

            finalize.call(this, 'reject', $.slice(arguments));

        }

    };

    $.extend($, {

        Deferred: function(options) {

            return new Deferred();

        },

        when: function() {

            var deferreds = $.slice(arguments),
                whenDeferred = $.Deferred(),

                checkDeferreds = function() {

                    var args = [];

                    $.each(deferreds, function(i, deferred) {

                        if (deferred instanceof Deferred) {
                            deferred.doneWith && args.push(deferred.doneWith.length == 1 ? deferred.doneWith[0] : deferred.doneWith);
                        } else {
                            args.push(deferred);
                        }

                    });

                    args.length === deferreds.length && whenDeferred.resolve(args);

                };

            $.each(deferreds, function(i, deferred) {

                deferred instanceof Deferred && deferred.done(checkDeferreds);

            });

            return whenDeferred;

        },

        whenAlways: function() {

            var deferreds = $.slice(arguments),
                whenAllDeferred = $.Deferred(),

                checkDeferreds = function() {

                    var pendingDeferreds = deferreds.length,
                        args = [];

                    $.each(deferreds, function(i, deferred) {

                        if (deferred instanceof Deferred) {

                            if (deferred.finalized) {

                                pendingDeferreds--;

                                deferred.doneWith && args.push(deferred.doneWith.length == 1 ? deferred.doneWith[0] : deferred.doneWith);

                                deferred.failedWith && args.push(deferred.failedWith.length == 1 ? deferred.failedWith[0] : deferred.failedWith);

                            }

                        } else {
                            args.push(deferred);
                        }

                    });

                    !pendingDeferreds && whenAllDeferred.resolve(args);

                };

            $.each(deferreds, function(i, deferred) {

                deferred instanceof Deferred && deferred.always(checkDeferreds);

            });

            return whenAllDeferred;

        }

    });

})(window.simpleQuery);
