(function() {
  'use strict';
// Create our app LunchCheck
angular.module("LunchCheck", []).controller("LunchCheckController", LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController ($scope) {
    $scope.message = ""; // Message to display to User
    $scope.dishes = ""; // Input for the dishes
    $scope.messClass = "";
    $scope.formBorderClass = "";

    // Method called to checkHowMuch when the user wants to check
    $scope.checkHowMuch = function () {
      if($scope.dishes) {
        if(countItems($scope.dishes) <= 3)
          $scope.message = "Enjoy";
        else {
          $scope.message = "Too Much!";
        }
        $scope.messClass = "text-success"; // Green Text for Success
        $scope.formBorderClass = "has-success"; // Green Border for Success
      } else {
        $scope.message = "Please enter data first"
        $scope.messClass = "text-danger"; // Red text
        $scope.formBorderClass = "has-error"; // Red Border
      }
    };
};

// Counts how many items in the string based on comma seperated
function countItems(string) {
    string = string.replace(",,", ",").replace(", ,", ","); // Try and replace any empty entry
    console.log("String used for count : "+string); // Console Print the new String for debug
    return string.split(',').length;
}})();
