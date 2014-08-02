/*global define*/

define([
    'jquery',
    'underscore',
    'parse',
    'views/header',
    'views/footer',
    'templates'
], function ($, _, Parse, HeaderView, FooterView, JST) {
    'use strict';

    var MainView = Parse.View.extend({

        el: 'body',

        template: JST['app/scripts/templates/main.ejs'],

        id: '',

        className: 'main_wrapper',

        events: {},

        initialize: function () {
            this.addSubView(new HeaderView());
            this.addSubView(new FooterView());
        },

        render: function (callback) {
            this.$el.prepend(this.subViews[1].render().el);
            this.$el.prepend(this.template());
            this.$el.prepend(this.subViews[0].render().el);
            callback && callback();
        }

    });

    return MainView;
});
