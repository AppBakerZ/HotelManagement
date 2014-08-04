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
        }
    });

    return OrderList;
});
