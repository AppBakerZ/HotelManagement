/*global define*/

define([
    'jquery',
    'parse',
    'routes/baseRouter',
    'views/home',
    'views/login',
    'views/signup'
], function ($, Parse, BaseRouter, HomeView, LoginView, SignupView) {
    'use strict';

    var AppRouter = BaseRouter.extend({
        routes: {
            '' : "index",
            'login': "login",
            'signup': "signUp"
        },
        initialize: function(options){
            // Global Events
            this.Bus = options.Bus;

        },
        showView: function(selector, view) {
                if (this.currentView){
                    this.currentView.close();
                }
                $(selector).html(view.render().el);
                this.currentView = view;
                return view;
        },
        index: function(){
                this.showView('#content', new HomeView())
        },
        login: function(){
            this.showView('#content', new LoginView({
                Bus: this.Bus
            }));
        },
        signUp: function(){
            this.showView('#content', new SignupView())
        }

    });

    return AppRouter;
});
