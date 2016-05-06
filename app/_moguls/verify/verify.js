(function () {
    "use strict";

    angular.module('olweg-moguls').controller('VerifyCtrl', VerifyCtrl);

    VerifyCtrl.$inject = ['$http', '$stateParams','MessageService','$state','ProcessService'];

    function VerifyCtrl($http, $stateParams, $messageService,$state,$proc) {
        var vm = this;
        vm.verify_api = '/api/auth/verify';
        $proc.startProcessing();

        if($stateParams.code){
            $http.post(vm.verify_api, { code: $stateParams.code })
            .then(function(success){
                $messageService.success({
                    title: 'Registered!',
                    text: 'Thank You! Please log in!'
                }).then(function(){
                    $proc.endProcessing();

                    $state.go('login');
                    
                });

            }).catch(function(err) {
                $proc.endProcessing();

                $messageService.appError('verify.js:29',err.data);
                $state.go("home");
            });
        }else{
            $proc.endProcessing();
            $state.go('home');
        }

    }
})();