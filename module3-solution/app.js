(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    templateUrl:'foundItem.html',
    restrict: 'E',
    scope:{
      foundItems: '<',
      onRemove: '&',
      itemInList: '<'
    },
    controller: MenuItemsDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true
  };
  return ddo;
}

MenuItemsDirectiveController.$inject = ['MenuSearchService'];
function MenuItemsDirectiveController(MenuSearchService){
  var me = this;
  me.itemInList = function(){
    var items = MenuSearchService.getMenuItems();
    if (typeof items === 'undefined')
      return false;
    if (items.length == 0)
      return true;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var me = this;
  me.errorMessage="";

  me.run = function(){
    var promise  = MenuSearchService.getMatchedMenuItems(me.item);
    promise.then(function(result){
      me.found = result;
    });
  };

  me.removeItem = function(index){
    me.found.splice(index,1);
  };
}

MenuSearchService.$inject = ['$http','ApiBasePath']
function MenuSearchService($http,ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(result){
      service.found = [];
      var items = result.data['menu_items'];
      for (var item in items){
        var aux0 = items[item].description.toUpperCase();
        if (searchTerm != null){
          var aux1 = aux0.indexOf(searchTerm.toUpperCase());
          if (aux1>0)
            service.found.push(items[item])
        }else {
          return null;
        }
      }
      return service.found;
    })
  };

  service.getMenuItems = function(){
    return service.found;
  };
}

})();
