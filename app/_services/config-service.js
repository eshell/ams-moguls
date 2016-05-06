(function(){
    "use strict";
    angular.module('olweg-moguls').factory('ConfigService',ConfigService);
    
    function ConfigService(){
        var vm = {};
        vm.title = 'olweg - moguls_';
        vm.TOKEN_NAME = 'olweg_token';
        vm.ACCOUNT_TYPES = [
            {id:1,value:'Artist'},
            {id:2,value:'Venue'}
        ];
        return vm;

    }
    
})();