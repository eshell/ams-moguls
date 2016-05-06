(function () {
    "use strict";

    angular.module('olweg-moguls').factory('MessageService', MessageService);

    MessageService.$inject = ['$http','$q','$timeout'];

    /**
     * MessageService - display info and error dialogs/toasts
     * @param $http
     * @param $q
     * @param $timeout
     * @returns {{Object}}
     * @constructor
     */
    function MessageService($http,$q,$timeout) {
        var vm = {};
        vm.confirm = confirm;
        vm.success = success;
        vm.error = error;
        vm.appError = appError;


        return vm;


        /**
         * MessageService.confirm - Confirm Dialog
         * @param opts {(string|Object)} - Message
         * @param opts.title {string} - dialog title
         * @param opts.text {string} - Message
         * @returns {void}
         */
        function confirm(opts){
            if(typeof opts === 'string') opts = {title:null, text: opts};
            return $q(function(resolve,reject){
                toastr.error(opts.text,opts.title);
                $timeout(function(){
                    resolve();
                },1000);
            });

        }

        /**
         * MessageService.success - display info messages
         * @param opts {string} - Message
         * @param {Object} opts.title {string} - dialog title
         * @param {Object} opts.text {string} - Message
         * @returns {void}
         */
        function success(opts){
            if(typeof opts === 'string') opts = {text: opts};
            return $q(function(resolve,reject){
                toastr.success(opts.text,opts.title);
               $timeout(function(){
                   resolve();
               },1000);
            });

        }

        /**
         * MessageService.error
         * @param msg {string} - error message
         * @returns {*}
         */
        function error(msg){
            return $q(function(resolve,reject){
                toastr.error(msg);
                $timeout(function(){
                    resolve();
                },1000);
            });


        }

        /**
         * MessageService.appError - send errors to server log for fixes
         * @param file {string} - Filename.js the error originated from
         * @param msg {string} - What happened?
         */
        function appError(file,msg){
            toastr.error(msg);
            $http.post('/api/error-log',{file:file,error:msg});
        }

    }
})();