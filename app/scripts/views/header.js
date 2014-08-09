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

        initialize: function (options) {
            // Global Events
            this.Bus = options.Bus;
            this.Bus.on('login', this.render, this);
            this.Bus.on('logout', this.render, this);
            this.Bus.on('signup', this.render, this);

        },

        render: function () {
            this.$el.html(this.template({currentUser : Parse.User.current()}));
            return this;
        },
        logOut: function(e) {
            Parse.User.logOut();
            this.Bus.trigger('logout');
        }
    });

    return HeaderView;
});
