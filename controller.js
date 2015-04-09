(function () {
  angular.module("calendar")
    .controller("MainCtrl", ["Months", function (Months){

      var self = this;
      var d = new Date();
      var m = d.getMonth();
      var y = d.getFullYear();
      self.month = Months[m];

      self.nextMonth = function(){
  			self.month = Months[m + 1];
        m++;
      };

      self.prevMonth = function(){
  			self.month = Months[m - 1];
        m--;
      };


      // Populates and refreshes the calendar
      self.monthView = function () {

        var month = m;
        var year = y;
        var startDay = new Date(year, month, 1);
        var endDay = new Date(year, month + 1, 0 );

        // d1 stores the number that represents the first day of the week -> Sun
        var d1 = 0;
        // Day of the week month starts on
        var d2 = startDay.getDay();
        // Day of the week month ends on
        var d3 = endDay.getDay();

        // If the first day is not Sunday, find out how many days to go back into
        // the previous month to fill the calendar and set the 'start day' to that day
        if (d2 > 0) {
          startDay.setDate(startDay.getDate() - d2);
        }
        // If the last day is not Saturday, find out how many days to go forward into
        // the next month to fill the calendar and set the 'end day' to that day
        if (d3 < 7) {
          endDay.setDate(endDay.getDate() + (7 -d3));
        }

        var countWeeks = 0;
        self.weeks = [];
        self.days = [];
        while (startDay.valueOf() !== endDay.valueOf()) {
          self.days.push(startDay.getDate());
          if (startDay.getDay() == 0) {
            self.weeks.push(countWeeks);
            countWeeks++
          }
          startDay.setDate(startDay.getDate() + 1);
        }
        console.log(self.weeks);
        console.log(self.days);
      };

    }]);
})();
