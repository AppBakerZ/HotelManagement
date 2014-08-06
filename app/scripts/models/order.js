/*global define*/

define([
    'parse'
], function (Parse) {
    'use strict';

    var OrderModel = Parse.Object.extend('Orders', {
        // Ensure that each order created has `content`.
        initialize: function() {
            !this.get("title") && this.set({"title": this.defaults.title});
        },
        // set default value for order
        defaults: {
            title: '',
            message: '',
            sender: '',
            completed: false
        },

        // set completed order to true.
        approved: function() {
            this.save({completed: !this.get("completed")});
        }
    });

    return OrderModel;
});
