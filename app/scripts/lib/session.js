define([
    'jquery',
    'parse'
], function($, Parse){
    'use strict';

    var SessionModel = Parse.Object.extend('Session', {

        initialize : function(){
            //Check for sessionStorage support
            if(Storage && sessionStorage){
                this.supportStorage = true;
            }
        },
        get : function(key){
            if(this.supportStorage){
                var data = sessionStorage.getItem(key);
                if(data && data[0] === '{'){
                    return JSON.parse(data);
                }else{
                    return data;
                }
            }else{
                return Parse.Model.prototype.get.call(this, key);
            }
        },
        set : function(key, value){
            if(this.supportStorage){
                sessionStorage.setItem(key, value);
            }else{
                Parse.Object.prototype.set.call(this, key, value);
            }
            return this;
        },
        unset : function(key){
            if(this.supportStorage){
                sessionStorage.removeItem(key);
            }else{
                Parse.Object.prototype.unset.call(this, key);
            }
            return this;
        },
        clear : function(){
            if(this.supportStorage){
                sessionStorage.clear();
            }else{
                Parse.Object.prototype.clear(this);
            }
        },
        logout : function(callback){
            var that = this;
            $.get(App.baseUrl + 'webservices/logout.json',function(user){
                if(user.response.status === 'OK'){
                    //Clear all session data
                    that.clear();
                    that.initialize();
                    callback();
                }
            });
        }
    });
    return new SessionModel();
});