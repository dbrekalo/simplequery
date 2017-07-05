/*--------------------------------------------------------------
Deferred module
--------------------------------------------------------------*/

var $ = require('./core');

function Deferred() {

    this.currentState = 'pending';
    this.onDone = [];
    this.onFail = [];

}

function settle(method, args) {

    if (this.currentState === 'pending') {

        this.currentState = method === 'resolve' ? 'resolved' : 'rejected';

        this[method === 'resolve' ? 'doneWith' : 'failedWith'] = args;

        $.each(this[method === 'resolve' ? 'onDone' : 'onFail'], function(i, callback) {
            callback.apply(this, args);
        });

    }

    return this;

}

Deferred.prototype = {

    state: function() {

        return this.currentState;

    },

    then: function(done, fail) {

        done && this.done(done);
        fail && this.fail(fail);
        return this;

    },

    always: function(callback) {

        return this.then(callback, callback);

    },

    done: function(callback) {

        this.doneWith ? callback.apply(this, this.doneWith) : this.onDone.push(callback);
        return this;

    },

    fail: function(callback) {

        this.failedWith ? callback.apply(this, this.failedWith) : this.onFail.push(callback);
        return this;

    },

    resolve: function() {

        return settle.call(this, 'resolve', $.slice(arguments));

    },

    reject: function() {

        return settle.call(this, 'reject', $.slice(arguments));

    }

};

$.extend($, {

    Deferred: function() {

        return new Deferred();

    },

    when: function() {

        var deferreds = $.slice(arguments);
        var whenDeferred = $.Deferred();

        var checkDeferreds = function() {

            var resolvedArgs = [];
            var rejectedArgs;

            $.each(deferreds, function(i, deferred) {

                if (deferred instanceof Deferred) {

                    if (deferred.state() === 'resolved') {

                        resolvedArgs.push(deferred.doneWith);

                    } else if (deferred.state() === 'rejected') {

                        rejectedArgs = deferred.failedWith;
                        return false;

                    }

                } else {
                    resolvedArgs.push([deferred]);
                }

            });

            if (rejectedArgs) {
                settle.call(whenDeferred, 'reject', rejectedArgs);
            }

            if (resolvedArgs.length === deferreds.length) {

                resolvedArgs = deferreds.length === 1 ? resolvedArgs[0] : $.map(resolvedArgs, function(args) {
                    return args.length === 1 ? args[0] : args;
                });

                settle.call(whenDeferred, 'resolve', resolvedArgs);

            }

        };

        $.each(deferreds, function(i, deferred) {

            deferred instanceof Deferred && deferred.always(checkDeferreds);

        });

        checkDeferreds();

        return whenDeferred;

    }

});

module.exports = $;
