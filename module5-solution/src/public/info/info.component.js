(function () {
'use strict';
angular.module('public')
.component('userInfo', {
  templateUrl: 'src/public/info/user-info.template.html',
    bindings: {
      userInfo: '<',
      favoriteDish: '<',
      apiPath: '<'
    }
});
})();
