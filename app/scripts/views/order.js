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
            var setMessage = 'Your request with ' + this.model.attributes.title + ' and with message '
                + this.model.attributes.messages + ' was accepted.';
            this.orderCompleted(setMessage);
        },

        // set message for declined order
        declinedOrder: function() {
            var setMessage = 'Your request with ' + this.model.attributes.title + ' and with message '
                + this.model.attributes.messages + ' was declined.';
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
            if(this.$el.hasClass('completed'))
                return;
            this.$el.addClass('completed');
            this.answers.create({
                title: title || this.model.attributes.title,
                messages: setMessage,
                intendedUser: Parse.User.current().id
            }, {wait: true});
            this.model.approved();
        },

        render: function () {
            if(this.model.attributes.completed)
            {
                this.$el.addClass('completed')
            }
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return OrderView;
});
