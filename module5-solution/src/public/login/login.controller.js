(function () {
"use strict";

angular.module('public')
.controller('LoginController', LoginController);

LoginController.$inject = ['RegService'];
function LoginController(RegService) {
  var me = this;
  me.failState = false;
  me.successState = false;

  me.submit = function () {
    RegService.checkFavoriteDish(me.dish).then(
      function(result){
        if (result != null){
          me.saveUserInfo({firstname:me.firstname,lastname:me.lastname,email:me.email,phone:me.phone})
          me.saveFavoriteDish(result.data);
          me.failState = false;
          me.successState = true;
        }else{
          me.successState = false;
          me.failState = true;
        }
      }
    )
  };

  me.saveFavoriteDish = function (favoriteDish) {
    RegService.addFavoriteDish(favoriteDish);
  };

  me.saveUserInfo = function (userInfo){
    RegService.addUserInfo(userInfo);
  };
}
})();
