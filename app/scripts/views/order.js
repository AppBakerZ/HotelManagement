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
            "click .custom-msg-btn": "customMessage"
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
        customMessage: function(e){
            var setMessage = this.$('.new-msg').val();
            var title = this.$('.new-title').val();
            this.orderCompleted(setMessage, title);
        },

        // complete the order and apply styling
        orderCompleted: function(setMessage, title){
            if(!title){
                var setTitle = this.model.attributes.title + ' response'
            }
            this.$('.edit.icon.list-btn').removeAttr("data-target");
            if(this.$el.hasClass('completed'))
                return;
            this.$el.addClass('completed');

            this.answers.create({
                title: title || setTitle,
                messages: setMessage,
                intendedUser: Parse.User.current().id
            }, {wait: true});
            this.model.approved();
            this.$('#new-title').val('');
            this.$('#new-msg').val('')
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
