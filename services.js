(function () {
  angular.module("calendar")
    .service("Months", [function () {
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
    .service("Events", [function () {
      return {
        "2015-0": {
          "1": ["New Years Day"],
          "19": ["Martin Luther King Day"]
        },
        "2015-1": {
          "2": ["Groundhogs Day"],
          "14": ["Valentines Day"],
          "16": ["Presidents Day"]
        },
        "2015-2": {
          "17": ["St Patricks Day"],
          "25": ["jQuery Calendar Due"]
        },
        "2015-3": {
          "5": ["Easter"]
        }
      };
    }])

})();
