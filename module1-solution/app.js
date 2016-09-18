(function () {
'use strict';
angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
  $scope.showMessage = function () {
    var tb = $scope.textbox;
    if (tb == "" || tb == null) {
      $scope.message = "Please enter data first";
    }else{
      var tbList = tb.split(",");
      if (tbList.length <= 3) {
        $scope.message = "Enjoy!";
      }else{
        $scope.message = "Too much!";
      }
    }
  };
}
})();
