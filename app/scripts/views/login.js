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

        id: '',

        className: '',

        events: {
            'click #login': 'logIn'
        },

        initialize: function () {
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
                    Parse.history.navigate('',{trigger: true});
//                    new ManageTodosView();
//                    self.undelegateEvents();
//                    delete self;
                },

                error: function(user, error) {
//                    self.$(".login-form .error").html("Invalid username or password. Please try again.").show();
//                    self.$(".login-form button").removeAttr("disabled");
                }
            });

//            this.$(".login-form button").attr("disabled", "disabled");

            return false
        }
    });

    return LoginView;
});
