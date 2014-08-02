/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var FooterView = Parse.View.extend({
        template: JST['app/scripts/templates/footer.ejs'],

        tagName: 'div',

        id: 'footer',

        className: 'footer',

        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    return FooterView;
});
