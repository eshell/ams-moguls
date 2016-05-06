/**
 * Created by eric on 4/25/16.
 */
(function(){
    "use strict";
    angular.module('olweg-moguls').factory('AdminMessageService',AdminMessageService);

    AdminMessageService.$inject = ['$http'];
    function AdminMessageService($http){
        var vm = {};

        vm.getMsg = function(){
            return $http.get('/api/admin-message');
            
        };

        return vm;

    }

})();