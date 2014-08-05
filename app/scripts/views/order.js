/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var OrderView = Parse.View.extend({
        template: JST['app/scripts/templates/order.ejs'],

        tagName: 'div',

        id: '',

        className: 'item',

        events: {
            'click label': 'toggleDone',
            'dblclick  div.header': 'editField',
            "keypress .edit input[type='text']": "updateOnEnter",
            "blur .edit input[type='text']": "close"
        },

        initialize: function () {
            this.model.on('change', this.render, this);
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

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });

    return OrderView;
});
