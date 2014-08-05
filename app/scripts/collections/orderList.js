/*global define*/

define([
    'underscore',
    'parse',
    'models/order'
], function (_, Parse, OrderModel) {
    'use strict';

    var OrderList = Parse.Collection.extend({
        model: OrderModel,
        initialize: function () {
            this.fetch();
        },
        // Filter down the list of all OrderModel items that are finished.
        done: function() {
            return this.filter(function(todo){ return todo.get('done'); });
        },
        // Filter down the list to only OrderModel items that are still not finished.
        remaining: function() {
            return this.without.apply(this, this.done());
        }
    });

    return OrderList;
});
