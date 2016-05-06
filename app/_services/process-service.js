(function(){
    "use strict";
    angular.module('olweg-moguls').factory('ProcessService',ProcessService);

    ProcessService.$inject = ['$rootScope'];

    /**
     * ProcessService - starts and stops a 'loading' message
     * @param $rootScope
     * @returns {{Object}}
     * @constructor
     */
    function ProcessService($rootScope){
        var vm= {};

        /**
         * ProcessService.startProcessing([msg])
         * @param [msg] show loading message
         */
        vm.startProcessing=function(msg){
            if(msg === undefined) msg='';
            $rootScope.$broadcast("processing:start",msg);
        };

        /**
         * ProcessService.endProcessing([msg])
         * @param [msg] remove loading message
         */
        vm.endProcessing=function(msg){
            if(msg === undefined) msg='';
            $rootScope.$broadcast("processing:end",msg);
        };

        return vm;

    }

})();