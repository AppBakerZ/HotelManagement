/*global define*/

define([
    'jquery',
    'parse'
], function ($, Parse) {
    'use strict';

    var AppRouter = Parse.Router.extend({
        routes: {
        }

    });

    return AppRouter;
});
