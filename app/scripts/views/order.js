/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates',
    'collections/answerList'
], function ($, _, Parse, JST, AnswerList) {
    'use strict';

//    var answerList = AnswerList();

    var OrderView = Parse.View.extend({
        template: JST['app/scripts/templates/order.ejs'],

        tagName: 'div',

        id: '',

        className: 'item',

        events: {
            'click label': 'toggleDone',
            'dblclick  div.header': 'editField',
            "keypress .edit input[type='text']": "updateOnEnter",
            "blur .edit input[type='text']": "close",
            "click .remove": "clear",
            "click #save-msg": "customMessage"
        },

        initialize: function () {
            this.answers = new AnswerList();
            this.model.on('change:title', this.render, this);
            this.model.on('change:done', this.addStyleCheckbox, this);
            this.model.on('destroy', this.remove, this);
        },

        toggleDone: function(){
            this.model.toggle();
        },

        editField: function(){
            $(this.el).addClass("editing");
            this.$(".content input[type='text']").val(this.model.attributes.title);
            this.$(".content input[type='text']").focus();
        },

        // Close the `"editing"` mode, saving changes to the order.
        close: function() {
            this.model.save({
                title: this.$('input[type="text"]').val()
            });
            $(this.el).removeClass("editing");
        },

        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function(e) {
            if (e.keyCode == 13) this.close();
        },

        // Remove the item, destroy the model.
        clear: function() {
            this.model.destroy();
        },

        customMessage: function(){
            this.answers.create({
                title: this.model.attributes.title,
                message: this.$('.custom-msg').val(),
                intendedUser: Parse.User.current()
            });
            this.$('.custom-msg').val('')
        },

        addStyleCheckbox: function(){
            var $checkboxs = this.$('input[type="checkbox"]');
            _.each($checkboxs,function(checkbox){
                    if($(checkbox).is(':checked')){
                        $(checkbox).parents('.item').removeClass('approved')
                    }
                    else{
                        $(checkbox).parents('.item').addClass('approved')
                    }
            });
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return OrderView;
});
