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
            "keypress #new-order":  "createOnEnter",
            "click #toggle-all": "checkAllOrderComplete"
        },

        initialize: function () {
            this.collection.on('reset', this.render, this);
            this.collection.on('add', this.addOne, this);
            this.collection.on('change', this.updateOrderCheck, this);
        },
        addOne: function(model){
            this.addSubView(new OrderView({
                model : model
            }));
            this.$('.list').append(this.subViews[this.subViews.length - 1].render().el);
        },
        render: function () {
            var done = this.collection.done().length;
            var remaining = this.collection.remaining().length;
            this.$el.html(this.template({
                done:       done,
                remaining:  remaining
            }) );
            this.collection.each(function(model){
                this.addOne(model);
            }, this);
            this.$("#toggle-all")[0].checked = !remaining;
            this.addStyleCheckbox();
            return this;

        },
        // If you hit return in the main input field, create new Order model
        createOnEnter: function(e) {
            var self = this;
            if (e.keyCode != 13) return;

            this.collection.create({
                title: this.$("#new-order").val(),
                message:'i am user',
                done: $('#one').is(':checked'),
                sender: 'NZLH82hRuZ',
                user: Parse.User.current(),
                ACL: new Parse.ACL(Parse.User.current())
            }, {wait: true});
            this.$("#new-order").val('');
        },
        updateOrderCheck: function(){
            var done = this.collection.done().length;
            var remaining = this.collection.remaining().length;

            this.$('#done').html(' Clear Completed ('+ done +')');
            this.$('#remaining').html(remaining + (remaining > 1 ? ' items' : ' Item') + ' Left');
        },
        checkAllOrderComplete: function(){
            var done = this.$("#toggle-all")[0].checked;
            this.collection.each(function (order) { order.save({'done': done}); });
            var check = this.$('input[type="checkbox"]');
            _.each(check,function(num){
                num.checked = done;
            });
            this.addStyleCheckbox();
        },
        addStyleCheckbox: function(){
            var $checkboxs = this.$('input[type="checkbox"]');
            _.each($checkboxs,function(checkbox){
                if(checkbox.id != 'toggle-all'){
                    if($(checkbox).is(':checked')){
                        $(checkbox).parents('.item').addClass('approved')
                    }
                    else{
                        $(checkbox).parents('.item').removeClass('approved')
                    }
                }
            });
        }
    });

    return HomeView;
});
