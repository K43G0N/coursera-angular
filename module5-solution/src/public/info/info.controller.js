(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['favoriteDish','userInfo','ApiPath'];
function InfoController(favoriteDish,userInfo,ApiPath) {
  var me = this;
  me.favoriteDish = favoriteDish;
  me.userInfo = userInfo;
  me.apiPath = ApiPath;

  me.userExist = function () {
    if (me.userInfo != null) {
      return true;
    }else{
      return false;
    }
  };
}
})();
