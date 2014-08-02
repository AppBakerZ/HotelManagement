/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'templates'
], function ($, _, Parse, JST) {
    'use strict';

    var HomeView = Parse.View.extend({
        template: JST['app/scripts/templates/home.ejs'],

        tagName: 'div',

        id: '',

        className: '',

        events: {
        },

        initialize: function () {
        },

        render: function () {
            this.$el.html(this.template());
            return this;
        }
    });

    return HomeView;
});
