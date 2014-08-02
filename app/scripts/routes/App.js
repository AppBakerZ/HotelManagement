/*global define*/

define([
    'jquery',
    'parse',
    'views/home',
    'views/login',
    'views/signup'
], function ($, Parse, HomeView, LoginView, SignupView) {
    'use strict';

    var AppRouter = Parse.Router.extend({
        routes: {
            '' : "index",
            'login': "login",
            'signup': "signUp"
        },
        index: function(){
            var homeView = new HomeView();
            $('#content').html(homeView.render().el);
        },
        login: function(){
            var loginView = new LoginView();
            $('#content').html(loginView.render().el);
        },
        signUp: function(){
            var signUpView = new SignupView();
            $('#content').html(signUpView.render().el);
        }

    });

    return AppRouter;
});
