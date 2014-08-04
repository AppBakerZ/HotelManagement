/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var SignupView = Parse.View.extend({
        template: JST['app/scripts/templates/signup.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            'click #signup': 'signUp'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },
        signUp: function(e) {

            var self = this;

            var user = new Parse.User();
            user.set("username", this.$("#signup-username").val());
            user.set("password", this.$("#signup-password").val());
            user.set("email", this.$("#signup-mail").val());
            user.set("ACL", new Parse.ACL());

            user.signUp(null, {
                success: function(user) {
                    Parse.history.navigate('', {trigger: true});
                },
                error: function(user, error) {
                    self.$('.ui.error.message').parent().addClass('error').end()
                        .text(error.message);
                }
            });

        }
    });

    return SignupView;
});
