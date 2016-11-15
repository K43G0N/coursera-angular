(function () {
"use strict";

angular.module('common')
.service('RegService', RegService);

RegService.$inject = ['$http', 'ApiPath'];
function RegService($http, ApiPath) {
  var me = this;
  me.favoriteDish = null;
  me.userInfo = null;

  me.checkFavoriteDish = function (short_name) {
    return $http.get(ApiPath + '/menu_items/'+short_name+'.json')
    .then(
    function(response){
      return response;
    },
    function(){
      return null;
    });
  };

  me.addFavoriteDish = function (favoriteDish) {
    me.favoriteDish = favoriteDish;
  };

  me.getFavoriteDish = function () {
    return me.favoriteDish;
  };

  me.addUserInfo = function (userInfo) {
    me.userInfo = userInfo;
  };

  me.getUserInfo = function (){
    return me.userInfo;
  }

}
})();
