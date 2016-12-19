(function() {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

// protect against minification loss (string literals are left alone)
LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  // items entered in text field
  $scope.lunch = "";
  // status of lunch ("Enjoy!", "Too much!", or "Please enter data first")
  $scope.lunchStatus = "";
  // color of text field border and lunchStatus text
  $scope.lunchStatusColor = "";

  // called from button click (ng-click)
  $scope.checkLunch = function() {
    isLunchTooMuch($scope.lunch);
  }

  function isLunchTooMuch(lunchList) {
    // Empty text field, prompt user for more input
    if (lunchList == "") {
      $scope.lunchStatus = "Please enter data first";
      $scope.lunchStatusColor = "red";
      return;
    }

    // Text field is not empty, calculate appropriate message (lunchStatus)
    var filteredLunch = removeBlankItems(lunchList);
    if (filteredLunch.length <= 3) {
      $scope.lunchStatus = "Enjoy!"
    }
    else {
      $scope.lunchStatus = "Too Much!";
    }
    $scope.lunchStatusColor = "green";
  }

  // Converts comma-separated list (string) into array, filters out empty
  function removeBlankItems(string) {
    var tmp = string.split(',');
    // trim removes any whitespace from item; e.g. "   " becomes ""
    var array = tmp.filter(function(item) {
      return item.trim() != "";
    });
    return array;
  }

}

})();
