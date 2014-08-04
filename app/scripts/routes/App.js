/*global define*/

define([
    'jquery',
    'parse',
    'routes/baseRouter',
    'lib/session',
    'views/home',
    'views/login',
    'views/signup'
], function ($, Parse, BaseRouter, Session, HomeView, LoginView, SignupView) {
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
        // Routes that need authentication and if user is not authenticated
        // gets redirect to login page
        requiresAuth : [
            ''
        ],
        // Routes that should not be accessible if user is authenticated
        // for example, login, register, forgetpasword ...
        preventAccessWhenAuth : [
            'login',
            'signup'
        ],

        before : function(params, next){
            var self = this;
            //Checking if user is authenticated or not
            //then check the path if the path requires authentication

            var isAuth = Parse.User.current();
            //var isAuth = true;
            var path = Parse.history.fragment;

            var needAuth = _.contains(this.requiresAuth, path);
            var cancelAccess = _.contains(this.preventAccessWhenAuth, path);

            if(needAuth && !isAuth){
                //If user gets redirect to login because wanted to access
                // to a route that requires login, save the path in session
                // to redirect the user back to path after successful login
                Session.set('redirectFrom', path);
                Parse.history.navigate('login', { trigger : true });
            }else if(isAuth && cancelAccess){
                //User is authenticated and tries to go to login, register ...
                // so redirect the user to home page
                Parse.history.navigate('', { trigger : true });
            }else{
                //No problem handle the route
                return next();
            }
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
                Bus: this.Bus,
                Session: Session
            }));
        },
        signUp: function(){
            this.showView('#content', new SignupView())
        }

    });

    return AppRouter;
});
