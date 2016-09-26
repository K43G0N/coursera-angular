(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', ToBuyShoppingController)
.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
function ToBuyShoppingController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.getItemsToBuy();

  toBuyList.buyItem = function (index) {
    ShoppingListCheckOffService.addItemToBoughtItems(index);
    ShoppingListCheckOffService.removeItemFromToBuyItems(index);
    //toBuyList.message = ShoppingListCheckOffService.getMessage(1);
  };
}

AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
  //boughtList.message = function () {
  //  return ShoppingListCheckOffService.getMessage(2);
  //};
}

function ShoppingListCheckOffService() {
   var service = this;
   var itemsToBuy = [
     { name: "aspirina", quantity: "10" },
     { name: "cookies", quantity: "8" },
     { name: "coca-cola", quantity: "5" },
     { name: "pepto bismol", quantity: "2" },
     { name: "chocolate", quantity: "9" },
   ];
   var boughtItems = [];

   service.addItemToBoughtItems = function (index) {
     var countBroughtItems = "";
     var countItemToBuy = "";
     boughtItems.push(itemsToBuy[index]);
   };
   service.removeItemFromToBuyItems = function (index) {
     itemsToBuy.splice(index,1);
   };
   service.getItemsToBuy = function () {
     return itemsToBuy;
   };
   service.getBoughtItems = function () {
     return boughtItems;
   };
   service.getMessage = function (index) {
     var maxItems = service.getItemsToBuy().length;
     if (index == 1)
       return (service.getBoughtItems().length > maxItems-1)
    if (index == 2)
       return (service.getBoughtItems().length == 0);
   };
}
})();
