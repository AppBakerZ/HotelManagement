/*global define*/

define([
    'underscore',
    'parse',
    'models/answer'
], function (_, Parse, AnswerModel) {
    'use strict';

    var AnswerList = Parse.Collection.extend({
        model: AnswerModel
    });

    return AnswerList;
});
