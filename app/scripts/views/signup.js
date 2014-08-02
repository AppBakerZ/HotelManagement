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
            'click .button': 'signUp'
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        },
        signUp: function(e) {
            var self = this;
            var username = this.$("#signup-username").val();
            var mail = this.$("#signup-mail").val();
            var password = this.$("#signup-password").val();

            Parse.User.signUp(username,password, { ACL: new Parse.ACL() }, {
                success: function (user) {
                    Parse.history.navigate('',{trigger: true});
                },

                error: function (user, error) {
                    console.log(error)
//                    self.$(".signup-form .error").html(error.message).show();
//                    self.$(".signup-form button").removeAttr("disabled");
                }
            })
        }
    });

    return SignupView;
});
