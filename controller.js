(function () {
  angular.module("calendar")
    .controller("MainCtrl", ["$scope", "Months", "Weekdays", function ($scope, Months, Weekdays){

      var d = new Date();
      var m = d.getMonth();
      $scope.month = Months[m];

    }]);
})();
