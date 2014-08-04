/*global define*/

define([
    'parse'
], function (Parse) {
    'use strict';

    var OrderModel = Parse.Object.extend('Orders', {
        initialize: function() {
        },

        defaults: {
            title: '',
            message:'',
            sender: ''
        }
    });

    return OrderModel;
});
