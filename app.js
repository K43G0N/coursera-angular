(function () {
  'use strict';
  angular.module('app', []).controller('controller', function ($scope) {
    $scope.showMessage = function () {
      var tb = $scope.textbox;
      var tbList = tb.split(",");
      $scope.message = tbList.length;
    };
  });
})();
