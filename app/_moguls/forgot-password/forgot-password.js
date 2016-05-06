/**
 * Created by eric on 4/21/16.
 */
(function () {
    "use strict";

    angular.module('olweg-moguls').controller('ForgotPasswordCtrl', ForgotPasswordCtrl);

    ForgotPasswordCtrl.$inject = ['$http', '$stateParams','MessageService','$state','ProcessService'];

    function ForgotPasswordCtrl($http, $stateParams, $messageService,$state,$proc) {
        var vm = this;
        vm.sendPasswordReset_api = '/api/moguls/auth/password-reset';
        // vm.changePassword_api = '/api/auth/forgot-password-update';
        vm.email=null;
        vm.code = $stateParams.code;
        vm.resetForm = {};


        vm.sendResetCode = function(){
            $proc.startProcessing();

            // DO VERIFICATION BY CODE /register/code...
            $http.post(vm.sendPasswordReset_api, { email: vm.email })
                .then(function(success){

                    $messageService.success({
                        title: 'Password Reset!',
                        text:'Instructions have been emailed to reset your password!'
                    }).then(function(){
                        $state.go("login");
                        $proc.endProcessing();
                    });

                }).catch(function(err) {
                    $messageService.error('Server down for updates.');
                    $proc.endProcessing();
                });
        };

    }
})();