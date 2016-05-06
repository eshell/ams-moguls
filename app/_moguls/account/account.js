(function(){
    "use strict";
    
    angular.module('olweg-moguls').controller('AccountCtrl',AccountCtrl);

    AccountCtrl.$inject = ['MemberService','MessageService','$http','ConfigService','ProcessService','$state'];

    function AccountCtrl($member,$messageService,$http,$config,$proc,$state){
        var vm = this;
        // vm.deleteAccount = $member.deleteAccount;
        vm.api_changePassword = '/api/moguls/actions/password-change';
        vm.api_doRegister = '/api/moguls/account/actions/do-register';

        vm.settings={
            changePasswordForm:{
                oldPassword:null,
                newPassword:null,
                newPassword2:null,
                changePassword:changePassword
            }
        };
        vm.register={};
        vm.statistics={};
        vm.types = $config.ACCOUNT_TYPES;
        vm.newMember = {
            type:vm.types[0],
            email:null,
            address:null,
            city:null,
            state:null,
            zip:null
        };

        function changePassword(){
            if(!vm.settings.changePasswordForm.oldPassword){
                $messageService.error('Please enter your old password!');
            }else {
                if (vm.settings.changePasswordForm.newPassword !== vm.settings.changePasswordForm.newPassword2) {
                    $messageService.error('Passwords do not match!');
                } else {
                    $http.post(vm.api_changePassword, {
                        id: $member.me.id,
                        oldPassword: vm.settings.changePasswordForm.oldPassword,
                        password: vm.settings.changePasswordForm.newPassword
                    }).then(function (success) {
                        $messageService.success(success.data);
                        $proc.endProcessing();
                        $member.logout().then(function(){
                            $state.go("login");
                        });
                    }).catch(function (error) {
                        $messageService.error(error.data);
                        $proc.endProcessing();
                    });
                }
            }
        }

        vm.settings.dlgChangeEmail=function(){
            $messageService.success('changed email')
        };

        vm.register.doRegister = function(){
            $proc.startProcessing();

            $http.post(vm.register_api ,vm.newMember).then(function(res){
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
        }

    }
})();
// TODO: allow change email
// TODO: implement register new member

/**
 * TODO: implement delete account
 * what to do with members of account holder?
 */
