/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var LoginView = Parse.View.extend({
        template: JST['app/scripts/templates/login.ejs'],

        tagName: 'div',

        id: 'login-section',

        className: 'login-section',

        events: {
            'click #login': 'logIn'
        },

        initialize: function (options) {
            // Global Events
            this.Bus = options.Bus;
            this.Session = options.Session;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },
        logIn: function(e) {
            var self = this;
            var username = this.$("#login-username").val();
            var password = this.$("#login-password").val();

            Parse.User.logIn(username, password, {
                success: function(user) {
                    self.Bus.trigger('login');
                    Parse.history.navigate('', {trigger: true});
                },
                error: function(user, error) {
                    self.$('.ui.error.message').parent().addClass('error').end()
                        .text(error.message);
                }
            });

            return false
        }
    });

    return LoginView;
});
