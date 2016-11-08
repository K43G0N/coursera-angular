(function () {
'use strict';
angular.module('Data').service('MenuDataService', MenuDataService);
angular.module('Data').constant('ApiBase','https://davids-restaurant.herokuapp.com');

MenuDataService.$inject = ['$http','ApiBase']
function MenuDataService($http,ApiBase) {
  var me = this;

  me.getAllCategories = function(){
    return $http({
      method: "GET",
      url: (ApiBase + "/categories.json")
    }).then(function(result){
      return result;
    })
  };

  me.getItemsForCategory = function(categoryShortName){
    return $http({
      method: "GET",
      url: (ApiBase + "/menu_items.json?category=" + categoryShortName)
    }).then(function(result){
      return result;
    })
  };
}
})();
