(function () {
    "use strict";

    angular.module('olweg-moguls').controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['MemberService','store'];
    
    function LoginCtrl($member,storage) {
        var vm = this;
        
        vm.mogul={};
        vm.mogul.remember = (storage.get('ams_remember')) ? true:false;
        vm.mogul.login = storage.get('ams_remember') || null;
        vm.mogul.password = storage.get('ams_premember') || null;


    }

    /**
     * TODO: implement refresh tokens
     */
})();

