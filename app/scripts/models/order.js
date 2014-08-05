/*global define*/

define([
    'parse'
], function (Parse) {
    'use strict';

    var OrderModel = Parse.Object.extend('Orders', {
        // Ensure that each order created has `content`.
        initialize: function() {
            !this.get("message") && this.set({"content": this.defaults.message});
        },
        defaults: {
            title: '',
            message:'',
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
