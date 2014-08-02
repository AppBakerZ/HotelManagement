/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var HeaderView = Parse.View.extend({
        template: JST['app/scripts/templates/header.ejs'],

        tagName: 'div',

        id: 'header',

        className: 'header',

        events: {},

        initialize: function () {
            //this.listenTo(this.model, 'change', this.render);
        },

        render: function () {
            this.$el.html(this.template({name: 'Sumair'}));
            return this;
        }
    });

    return HeaderView;
});
