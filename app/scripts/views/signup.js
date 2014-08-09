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

        initialize: function (options) {
            // Global Events
            this.Bus = options.Bus;
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },
        unActiveLoader: function(){
            this.$('.ui.inverted.dimmer').removeClass('active');
        },
        signUp: function(e) {

            var self = this;
            this.$('.ui.inverted.dimmer').addClass('active');
            var user = new Parse.User();
            user.set("username", this.$("#signup-username").val());
            user.set("password", this.$("#signup-password").val());
            user.set("email", this.$("#signup-mail").val());
            user.set("ACL", new Parse.ACL());

            user.signUp(null, {
                success: function(user) {
                    self.unActiveLoader();
                    self.Bus.trigger('signup');
                    Parse.history.navigate('', {trigger: true});
                },
                error: function(user, error) {
                    self.unActiveLoader();
                    self.$('.ui.error.message').parent().addClass('error').end()
                        .text(error.message);
                }
            });

        }
    });

    return SignupView;
});
