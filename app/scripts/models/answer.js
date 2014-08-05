/*global define*/

define([
    'underscore',
    'parse'
], function (_, Parse) {
    'use strict';

    var AnswerModel = Parse.Object.extend('Answers', {
        url: '',

        initialize: function() {
            !this.get("read") && this.set({"read": this.defaults.read});
        },

        defaults: {
            title: '',
            message: '',
            intendedUser: '',
            read: 'NO'
        }

    });

    return AnswerModel;
});
