(function () {
  angular.module("calendar")
  .service('Data', [function() {
    return {
      2015: {
          3: {
            6: ["April 6 2015!"],
            15: ["Imagine Dragons Concert"]
          },
          4: {
            7: ["May 7th 2015!"],
            22: ["Rock Climb El Capitan"]
          }
      },
    }
  }])
  .service('MonthNames', [function() {
    return [ 'January',
             'February',
             'March',
             'April',
             'May',
             'June',
             'July',
             'August',
             'September',
             'October',
             'November',
             'December'
           ];
  }])


})();
