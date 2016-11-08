(function () {
'use strict';

angular.module('MenuApp')
.controller('MenuappCategoriesController', MenuappCategoriesController);

MenuappCategoriesController.$inject = ['categories'];
function MenuappCategoriesController(categories) {
  var me = this;
  me.categories = categories;
}
})();
