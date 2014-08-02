/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var HeaderView = Parse.View.extend({
        template: JST['app/scripts/templates/header.ejs'],

        tagName: 'div',

        id: 'header',

        className: 'header',

        events: {
            'click #logout': 'logOut'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template({name: 'Sumair'}));
            return this;
        },
        logOut: function(e) {
            Parse.User.logOut();
            Parse.history.navigate('login',{trigger: true});
        }
    });

    return HeaderView;
});
