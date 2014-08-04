define([
    'jquery',
    'underscore',
    'parse'
], function($, _, Parse){
    'use strict';

    var BaseRouter = Parse.Router.extend({
        before: function(){},
        after: function(){},
        route: function(route, name, callback) {
            Parse.history = Parse.history || new Parse.History();
            if (!_.isRegExp(route)) {
                route = this._routeToRegExp(route);
            }
            if (!callback) {
                callback = this[name];
            }
            Parse.history.route(route, _.bind(function(fragment) {
                var args = this._extractParameters(route, fragment);
                if (callback) {
                    callback.apply(this, args);
                }
                this.trigger.apply(this, ['route:' + name].concat(args));
                Parse.history.trigger('route', this, name, args);
            }, this));
            return this;
        }
    });

    return BaseRouter;
});