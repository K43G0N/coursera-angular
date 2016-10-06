(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.service('MenuCheckService', MenuCheckService)
.directive('showItem', ShowItem)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    templateUrl:'foundItem.html',
    restrict: 'AE'
  };
  return ddo;
}

function ShowItem() {
  var ddo = {
    template:'{{ item.name }}',
    restrict: 'E'
  };
  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var me = this;

  me.run = function(){
    var promise = MenuSearchService.getMatchedMenuItems(me.item);
    promise.then(function(result){
      me.found = result;
    });
  };

  me.removeItem = function(index){
    me.found.splice(index,1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath','MenuCheckService']
function MenuSearchService($http, ApiBasePath, MenuCheckService) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(response){
      return MenuCheckService.checkMenu(response.data);
    });
  };
}

MenuCheckService.$inject = ['$q']
function MenuCheckService($q) {
  var service = this;

  service.checkMenu = function (data) {
    var deferred = $q.defer();
    var menu_items = data['menu_items'];
    var found_items = [];
    for (var p in menu_items)
      found_items.push(menu_items[p]);
    deferred.resolve(found_items)
    return deferred.promise;
  };
}

})();

//   var menu = result.data['menu_items'];
//   var items = [];
//   for (var p in menu) {
//     items.push(menu[p]);
//     //var item = menu[p];
//     //var exist = item['name'].toUpperCase().indexOf(searchTerm.toUpperCase());
//     //if (exist > 0)
//     //items.push(item);
//   };
//});
