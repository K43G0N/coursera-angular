(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['items']
function ItemsController(items) {
  var me = this;
  me.items = items;
}

})();
