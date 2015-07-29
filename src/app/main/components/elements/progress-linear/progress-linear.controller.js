(function () {
    'use strict';

    angular.module('fuse')
        .controller('ProgressLinearController', ProgressLinearController);

    /** @ngInject */
    function ProgressLinearController($interval) {
        var vm = this;
        vm.determinateValue = 33;
        vm.determinateValue2 = 33;

        $interval(function () {
            vm.determinateValue += 1;
            vm.determinateValue2 += 1.5;
            if (vm.determinateValue > 100) {
                vm.determinateValue = 33;
                vm.determinateValue2 = 33;
            }
        }, 100, 0, true);
    }
})();


