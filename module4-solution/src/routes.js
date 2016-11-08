(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');
  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/main-categories.template.html',
    controller: 'MenuappCategoriesController as ctrl',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })
  .state('items', {
    url: '/items/{categoryId}',
    templateUrl: 'src/menuapp/templates/items.template.html',
    controller: 'ItemsController as ctrl',
    resolve: {
      items: ['$stateParams', 'MenuDataService', function ($stateParams,MenuDataService) {
                var categoryShortName = $stateParams['categoryId'];
                return MenuDataService.getItemsForCategory(categoryShortName)
                .then(function (items) {
                  return items['data']['menu_items'];
                });
            }]
    }
  });
}
})();
