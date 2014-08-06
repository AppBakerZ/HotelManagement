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
            'click #done': 'clearCompleted'
        },

        initialize: function (options) {
            this.state = options.newState;
            this.collection.on('reset', this.render, this);
            this.collection.on('add', this.addOne, this);
            this.collection.on('change', this.updateOrderCheck, this);
            this.collection.on('remove', this.render, this);
        },

        // adds all order to view
        addOne: function(model){
            this.addSubView(new OrderView({
                model : model
            }));
            this.$('.list').append(this.subViews[this.subViews.length - 1].render().el);
        },

        // Only adds active order to view
        addActive: function() {
            this.collection.each(function(model){
                if(!model.attributes.completed){
                    this.addOne(model);
                }
            }, this);
        },

        // Only adds completed order to view
        addComplete: function() {
            this.collection.each(function(model){
                if(model.attributes.completed){
                    this.addOne(model);
                }
            }, this);
        },

        // delete all completed order form orders
        clearCompleted: function(){
            this.collection.each(function(model){
                    if(model.attributes.completed) {
                        model.destroy({wait: true})
                    }
            }, this);
        },

        // set values when order completed or declined
        updateOrderCheck: function(){

            var completed = this.collection.completed().length;
            var remaining = this.collection.remaining().length;

            this.$('#done').html(' Clear Completed ('+ completed +')');
            this.$('#remaining').html(remaining + (remaining > 1 ? ' items' : ' Item') + ' Left');
        },

        render: function () {

            var completed = this.collection.completed().length;
            var remaining = this.collection.remaining().length;
            this.$el.html(this.template({
                completed: completed,
                remaining: remaining
            }));
            if (this.state === "active") {
                this.addActive();
            } else if (this.state === "completed") {
                this.addComplete();
            }
            else{
                this.collection.each(function (model) {
                    this.addOne(model);
                }, this);
            }

            return this;
        }

    });

    return HomeView;
});
