(function(){
    "use strict";
    angular.module('olweg-moguls').directive('amsAutoFocus', amsAutoFocus);

    amsAutoFocus.$inject=['$timeout'];

    function amsAutoFocus($timeout) {
        return {
            restrict:'A',
            link: function($scope, $element) {
                $timeout(function() {
                    $element[0].focus();
                }, 100);
            }
        };
    }
    
})();

