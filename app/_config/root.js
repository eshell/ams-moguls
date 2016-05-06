(function(){
    "use strict";
    angular.module('olweg-moguls').controller('RootCtrl',RootCtrl);


    RootCtrl.$inject = ['ConfigService','MemberService','$rootScope','$state','MessageService'];

    function RootCtrl($config, $member, $rootScope,$state,$msg){
        var vm = this;
        vm.title = $config.title;
        vm.member = $member;
        vm.processing = false;

        vm.logout = function(){
            $member.logout().then(function(msg){
                $msg.success(msg);
                $state.go("home");
            });
        };
        vm.login = function(member){
            $member.login(member).then(function(msg){
                $msg.success(msg);
                $state.go("account");
            }).catch(function(error){
                $msg.error(error);
            });
        };

        $rootScope.$on("processing:start",function(msg){
            vm.processing = true;
        });
        $rootScope.$on("processing:end",function(msg){
            vm.processing = false;
        });


    }


})();