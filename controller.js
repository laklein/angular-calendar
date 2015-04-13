(function () {
  angular.module("calendar")
    .controller('MainCtrl', [function() {
      var self = this;
      self.onCalendar = true;
    }])

    .controller('CalendarCtrl', ['Data', 'MonthNames', function(data, monthNames) {
      var self = this;
      // console.log(data)

      self.month = {
        year: null,
        monthNum: null,
        days: [],
      }

      var getEvents = function(year, monthNum, date) {
        if (data[year] !== undefined) {
          if (data[year][monthNum] !== undefined) {
            return data[year][monthNum][date] || [];
          }
        }
        return [];
      }

      var addEvent = function(event, year, monthNum, date) {
        if (data[year] === undefined) {
          data[year] = {};
        }
        if (data[year][monthNum] === undefined) {
          data[year][monthNum] = {};
        }
        if (data[year][monthNum][date] === undefined) {
          data[year][monthNum][date] = [];
        }
        data[year][monthNum][date].push(event);
      }

      this.setMonth = function(monthNum, year) {
        self.month.year = year;
        self.month.monthNum = monthNum;
        self.month.monthName = monthNames[monthNum];
        self.month.days = [];


        var startDay = new Date(year, monthNum, 1);
        var endDay = new Date(year, monthNum + 1, 0 );

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

        while (startDay.valueOf() !== endDay.valueOf()) {
          var date = startDay.getDate();
          var day = {};
          day.year = year;
          day.month = monthNum;
          day.editing = false;
          day.date = date;
          day.events = getEvents(year, monthNum, date);
          self.month.days.push(day);

          startDay.setDate(startDay.getDate() + 1);
        }
      }

      this.prev = function() {
        if(self.month.monthNum > 0) {
          var month = self.month.monthNum - 1;
          var year = self.month.year;
        }else {
          var month = self.month.monthNum = 11;
          var year = self.month.year -1;
        }
        self.setMonth(month, year);
      }

      this.next = function() {
        if (self.month.monthNum < 11) {
          var month = self.month.monthNum + 1;
          var year = self.month.year;
        } else {
          var month = self.month.monthNum = 0;
          var year = self.month.year +1;
        }
        self.setMonth(month, year);
      }

      // event will be a string
      this.addEvent = function(event, day) {
        day.events.push(event, day);
        addEvent(event, self.month.year, self.month.monthNum, day.date);
      }

      this.updateEvent = function(event, day, index) {
        day.events[index] = event;
        data[day.year][day.month][day.date][index] = event;
      }

      self.setMonth(new Date().getMonth(), new Date().getFullYear());

    }])

    .controller('ListCtrl', ['Data', function(data) {
      var self = this;
      var numEvents = 4;

      console.log('data', data)
      var getEvents = function() {
        var events = [];
        for (var year in data) {
          console.log('year', year)
          for (var month in year) {
            console.log('month', month);
            for (var date in month) {
              console.log('date', date);
              for (var e in date) {
                console.log('e', e);
                var event = {};
                event.year = year;
                event.month = month;
                event.date = date;
                event.title = e;
                event.editing = false;
                events.push(event);
                if (events.length > numEvents) {
                  return events;
                }
              }
            }
          }
        }
        return events;
      }

      self.events = getEvents();

      this.updateEvent = function(event, index) {
        data[event.year][event.month][event.date][index] = event.title;
      }

    }]);


})();
