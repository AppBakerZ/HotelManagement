/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var HomeView = Parse.View.extend({
        template: JST['app/scripts/templates/home.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
            "keypress #new-order":  "createOnEnter"
        },

        initialize: function () {
            this.collection.on('reset', this.render, this);
        },

        render: function () {
            this.$el.html(this.template({collection: this.collection}) );
            return this;
        },
        // If you hit return in the main input field, create new Order model
        createOnEnter: function(e) {
            var self = this;
            if (e.keyCode != 13) return;

            this.collection.create({
                title: this.$("#new-order").val(),
                message:'i am user',
                sender: 'NZLH82hRuZ',
                user: Parse.User.current(),
                ACL: new Parse.ACL(Parse.User.current())
            });
            this.input.val('');
        }
    });

    return HomeView;
});
