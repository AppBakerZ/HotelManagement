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
            //return order list from server
            this.fetch();
        },

        // Filter down the list of all OrderModel items that are completed.
        completed: function() {
            return this.filter(function(order){ return order.get('completed'); });
        },

        // Filter down the list to only OrderModel items that are still not finished.
        remaining: function() {
            return this.without.apply(this, this.completed());
        }
    });

    return OrderList;
});
