define([
    'jquery',
    'underscore',
    'parse'
], function($, _, Parse){
    'use strict';

    var BaseRouter = Parse.Router.extend({
        before: function(){},
        route: function(route, name, callback) {
            Parse.history = Parse.history || new Parse.History();
            if (!_.isRegExp(route)) {
                route = this._routeToRegExp(route);
            }
            if (!callback) {
                callback = this[name];
            }

            var router = this;
            Parse.history.route(route, _.bind(function(fragment) {
                var args = this._extractParameters(route, fragment);
                var next = function(){
                    if (callback) {
                        callback.apply(router, args);
                    }
                    router.trigger.apply(router, ['route:' + name].concat(args));
                    Parse.history.trigger('route', router, name, args);
                };
                this.before.apply(router, [args, next]);
            }, this));
            return this;
        }
    });

    return BaseRouter;
});