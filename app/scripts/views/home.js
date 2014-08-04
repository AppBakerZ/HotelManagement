/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates',
    'views/order'
], function ($, _, Parse, JST, OrderView) {
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
            this.collection.on('add', this.addOne, this);
        },
        addOne: function(model){
            var list = new OrderView({model: model});
            this.$('.list').append(list.render().el);
        },
        render: function () {
            this.$el.html(this.template() );
            this.collection.each(function(model){
                this.addOne(model);
            }, this);
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
            this.$("#new-order").val('');
        }
    });

    return HomeView;
});
