(function () {
    "use strict";

    angular.module('olweg-moguls').factory('MemberService', MemberService);

    MemberService.$inject = ['$http','store','jwtHelper','ConfigService','ProcessService','$q'];

    function MemberService($http,$jwtStore,jwtHelper,$config,$proc,$q) {
        var pvm = {};
        pvm.login_api = '/api/moguls/auth/login';
        pvm.setToken = setToken;
        pvm.removeToken = removeToken;
        var vm = {};
        
        vm.authorized = false;
        vm.logout = logout;
        vm.login = login;
        vm.me={
            id:null,
            email:null
        };

        initData();
        return vm;

        function initData(){
            if(!$jwtStore.get($config.TOKEN_NAME) || jwtHelper.isTokenExpired($jwtStore.get($config.TOKEN_NAME))){
                vm.me={};
                vm.authorized=false;
            }else{
                var tok = jwtHelper.decodeToken($jwtStore.get($config.TOKEN_NAME));
                vm.me.id = tok.id;
                vm.me.email = tok.email;
                vm.authorized=true;
            }
     
        }


        function setToken(token){
            $jwtStore.set($config.TOKEN_NAME, token);
            initData();

        }

        function removeToken(){
            $jwtStore.remove($config.TOKEN_NAME);
            initData();
        }

        function logout(){
            return $q(function(resolve,reject){
                pvm.removeToken();
                resolve('Logged Out!');
            });
        }


        function login(user){
            return $q(function(resolve,reject){
                $proc.startProcessing();
                if($jwtStore.get($config.TOKEN_NAME)) pvm.removeToken();
                
                if(user.remember){
                    $jwtStore.set('ams_remember',user.login);
                    $jwtStore.set('ams_premember',user.password);
                }else{
                    $jwtStore.remove('ams_remember');
                    $jwtStore.remove('ams_premember');
                }
    
                $http.post(pvm.login_api, {
                    login:user.login,
                    password:user.password
                }).then(function(success){
                    pvm.setToken(success.data);
                    $proc.endProcessing();
                    resolve('Logged In!');
                }).catch(function(error){
                    reject(error.data);
                    $proc.endProcessing();
                });
            })
        }

    }
})();