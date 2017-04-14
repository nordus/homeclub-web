
'use strict';

angular
    .module( 'app.consumer.account' )
    .controller( 'AccountController', AccountController );

/** @ngInject */
function AccountController( currentUser, customerAccount, provinces )
{   
    var vm              = this;

    // Data
    vm.basicForm        = {};
    
    vm.currentUser      = currentUser;
    
    vm.customerAccount  = customerAccount;

    vm.provinces        = provinces;

    vm.user             = customerAccount.user;

    // Methods

    //////////
}