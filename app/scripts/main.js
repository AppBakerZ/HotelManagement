/*global require*/
'use strict';

require.config({
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        underscore: {
            exports: '_'
        },
        parse: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Parse'
        }
    },
    paths: {
        jquery: '../bower_components/jquery/dist/jquery',
        parse: 'vendor/parse-1.2.19',
        underscore: '../bower_components/underscore/underscore',
        bootstrap: '../bower_components/sass-bootstrap/dist/js/bootstrap'
    }
});

require([
    'parse',
    'views/main',
    'routes/app',
    'bootstrap'
], function (Parse, MainView, Router) {


    // Application Class contructor
    function HotelManagement(){

        // Global event manager
        this.Bus = _.extend({}, Parse.Events);

        Parse.View.prototype.addSubView = function(subView, position, remove){
            this.subViews || (this.subViews = []);
            position || (position = this.subViews.length);
            remove || (remove = 0);
            this.subViews.splice(position, remove, subView);
        };

        Parse.View.prototype.closeSubViews = function(){
            _.each(this.subViews, function(subView){
                subView.close();
            });
            this.subViews = [];
        };

        Parse.View.prototype.close = function () {
            if(this.beforeClose){
                // If an action needs to be executed before closing the view
                this.beforeClose();
            }
            this.closeSubViews();
            this.remove();
        };

        // Base url for Api
        this.baseUrl = 'http://www.example.com/';

    }



    /***********************************************************************************************************************
     *
     *											METHOD TRIGGERED BY ROUTE EVENTS
     *
     ***********************************************************************************************************************/


        // Method to call in order to start application
    HotelManagement.prototype.initialize = function(){

        var _self = this;

        // Router module
        this.Router = new Router({Bus: this.Bus});

        var mainView = new MainView({Bus: this.Bus});

        mainView.render(function(){
            bootstrap(_self);
        });

    };

    // Application bootstraping
    function bootstrap(application){

        //Parse.History.start();
        //Parse.history.start({ pushState: true, root:"/"});

        // Use absolute URLs  to navigate to anything not in your Router.
        // Only need this for pushState enabled browsers
        if (Parse.history && Parse.history._hasPushState) {

            // Use delegation to avoid initial DOM selection and allow all matching elements to bubble
            $(document).on('click', 'a:not(.no-hijax)', function(evt) {
                // Get the anchor href and protcol
                var href = $(this).attr('href');
                var protocol = this.protocol + '//';

                // Ensure the protocol is not part of URL, meaning its relative.
                // Stop the event bubbling to ensure the link will not cause a page refresh.
                if (protocol !== 'javascript://' && href && href.slice(protocol.length) !== protocol) {
                    evt.preventDefault();

                    // Note by using Parse.history.navigate, router events will not be
                    // triggered.  If this is a problem, change this to navigate on your
                    // router.
                    application.Router.navigate(href, true);
                }

            });
        }

    }

    // The "app" dependency is passed in as "App"
    window.App = new HotelManagement();
    App.initialize();

});
