(function(){
    "use strict";

    angular.module('olweg-moguls').config(AppConfig).run(AppRun);

    AppConfig.$inject = ['$urlRouterProvider','$locationProvider','jwtInterceptorProvider','$httpProvider','$compileProvider','$stateProvider'];

    
    function AppConfig($urlRouterProvider, $locationProvider, jwtInterceptorProvider, $httpProvider,$compileProvider,$stateProvider){

        // uncomment for production
        // $compileProvider.debugInfoEnabled(false);

        jwtInterceptorProvider.tokenGetter = ['store','ConfigService',function($jwtStore, $config){
            return $jwtStore.get($config.TOKEN_NAME);
        }];

        $httpProvider.interceptors.push('jwtInterceptor');

        $stateProvider
            .state('home',{
                url:'/',
                templateUrl:'_moguls/login/login.html',
                controller:'LoginCtrl',
                controllerAs:'login',
                data:{
                    hideForAuthorized:true
                }
            })
            .state('register',{
                url:'/register',
                templateUrl:'_moguls/register/register.html',
                controller:'RegisterCtrl',
                controllerAs:'register',
                data:{
                    hideForAuthorized:true
                }
            })
            .state('login',{
                url:'/login',
                templateUrl:'_moguls/login/login.html',
                controller:'LoginCtrl',
                controllerAs:'login',
                data:{
                    hideForAuthorized:true
                }
            })
            .state('account',{
                url:'/account',
                templateUrl:'_moguls/account/account.html',
                controller:'AccountCtrl',
                controllerAs:'account',
                data:{
                    requiresLogin:true
                }
            })
            .state('verify',{
                url:'/verify/:code',
                templateUrl:'_moguls/verify/verify.html',
                controller:'VerifyCtrl',
                controllerAs:'verify',
                data:{
                    hideForAuthorized:true
                }
            })
            .state('forgot-password',{
                url:'/forgot-password/:code',
                templateUrl:'_moguls/forgot-password/forgot-password.html',
                controller:'ForgotPasswordCtrl',
                controllerAs:'forgotPassword',
                data:{
                    hideForAuthorized:true
                }
            });

            $urlRouterProvider.otherwise("/");

        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }


    AppRun.$inject = ['$rootScope','MemberService','$state'];

    function AppRun($rootScope, $member, $state){
        $rootScope.$on('$stateChangeStart', function(e, to) {
            if (to.data && to.data.requiresLogin) {
                if(!$member.authorized){
                    e.preventDefault();
                    $state.go('login');
                }
            }
            if(to.data && to.data.hideForAuthorized){
                if($member.authorized){
                    e.preventDefault();
                    $state.go('account');
                }
            }

        });

    }

})();
