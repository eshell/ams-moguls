(function () {
    "use strict";

    angular.module('olweg-moguls').controller('RegisterCtrl', RegisterCtrl);

    RegisterCtrl.$inject = ['$http','MessageService','$state','ProcessService'];

    function RegisterCtrl($http, $messageService,$state,$proc) {
        var vm = this;

        vm.mogul={};
        vm.register_api = '/api/moguls/auth/register';
        vm.register = function(){
            $proc.startProcessing();

            // if(vm.mogul.password !== vm.mogul.password2){
            //     $proc.endProcessing();
            //     $messageService.error('Passwords do not match!');
            // }else{
                
                $http.post(vm.register_api ,{
    
                    email:vm.mogul.email
                    // ,
                    // password:vm.mogul.password,
                    // password2:vm.mogul.password2
                }).then(function(res){
                    $proc.endProcessing();
                    $messageService.success({
                        title:'Registration!',
                        text:'Instructions have been emailed to activate your account!'
                    }).then(function(){
                        $state.go('home');

                    });
                },function(err){
                    $proc.endProcessing();
                    $messageService.error('Server down for updates.');

                }).catch(function(error){
                    $proc.endProcessing();
                    $messageService.error('Server down for updates.');

                });
            // }
        }

    }
})();