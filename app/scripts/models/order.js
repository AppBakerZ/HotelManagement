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
        defaults: {
            title: 'Empty order',
            message: '',
            sender: '',
            done: false
        },
        // Toggle the `done` state of this order item.
        toggle: function() {
            this.save({done: !this.get("done")}, {wait: true});
        }
    });

    return OrderModel;
});
