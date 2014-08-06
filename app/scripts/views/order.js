/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates',
    'collections/answerList'
], function ($, _, Parse, JST, AnswerList) {
    'use strict';

    var OrderView = Parse.View.extend({
        template: JST['app/scripts/templates/order.ejs'],

        tagName: 'div',

        id: '',

        className: 'item',

        events: {
            'click .check': 'approvedOrder',
            "click .remove": "declinedOrder",
            "click #save-msg": "customMessage"
        },

        initialize: function () {
            this.answers = new AnswerList();
        },

        // set message for approved order
        approvedOrder: function(){
            var setMessage = 'Your request with itle: "' + this.model.attributes.title + '"\r\n and with message '
                + this.model.attributes.messages + '"\r\nwas accepted.';
            this.orderCompleted(setMessage);
        },

        // set message for declined order
        declinedOrder: function() {
            var setMessage = 'Your request with title: "' + this.model.attributes.title + '"\r\nand with message: "'
                + this.model.attributes.message + '"\r\nwas declined.';
            this.orderCompleted(setMessage);
        },

        // set custom message
        customMessage: function(){
            var setMessage = this.$('#new-title').val();
            var title = this.$('#new-msg').val();
            this.orderCompleted(setMessage, title);
            this.$('#new-title').val('');
            this.$('#new-msg').val('')
        },

        // complete the order and apply styling
        orderCompleted: function(setMessage, title){
            this.$('.edit.icon.list-btn').removeAttr("data-target");
            if(this.$el.hasClass('completed'))
                return;
            this.$el.addClass('completed');
            this.answers.create({
                title: (title || this.model.attributes.title) + 'response' ,
                messages: setMessage,
                intendedUser: Parse.User.current().id
            }, {wait: true});
            this.model.approved();
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            if(this.model.attributes.completed)
            {
                this.$('.edit.icon.list-btn').removeAttr("data-target");
                this.$el.addClass('completed')
            }
            return this;
        }
    });

    return OrderView;
});
