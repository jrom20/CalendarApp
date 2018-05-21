var CalendarObject = function () {


    var IndexPageForm = $('#form');
    var btnBack = $('#btnBack');
    var calendarContainer = $('.calendar-wrapper');

    Date.prototype.getWeekOfMonth = function (exact) {
        var month = this.getMonth()
            , year = this.getFullYear()
            , firstWeekday = new Date(year, month, 1).getDay()
            , lastDateOfMonth = new Date(year, month + 1, 0).getDate()
            , offsetDate = this.getDate() + firstWeekday - 1
            , index = 1 // start index at 0 or 1, your choice
            , weeksInMonth = index + Math.ceil((lastDateOfMonth + firstWeekday - 7) / 7)
            , week = index + Math.floor(offsetDate / 7)
            ;
        if (exact || week < 2 + index) return week;
        return week === weeksInMonth ? index + 5 : week;
    };

    Date.prototype.getWeekRangesOfMonth = function () {

        var weeks = [],
            firstDate = new Date(this.getFullYear(), this.getMonth(), 1),
            lastDate = new Date(this.getFullYear(), this.getMonth() + 1, 0),
            numDays = lastDate.getDate();

        var start = 1;
        var end = 7 - firstDate.getDay();
        while (start <= numDays) {
            weeks.push({ start: start, end: end });
            start = end + 1;
            end = end + 7;
            if (end > numDays)
                end = numDays;
        }

        return weeks;
    } 

    var Cal = function (dateToSetup, displayDays) {
        
        // Days of week, starting on Sunday
        this.DaysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

        // Months, stating on January
        this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Holidays based on month, occurrency, day, Static Date
        this.Holidays = { 
            "0,2,1": "Martin Luther King, Jr. Day",
            "1,1,1": "President's Day",
            "4,1,0": "Mother's Day",
            "4,-1,1": "Memorial Day",
            "5,2,0": "Father's Day",
            "6,2,0": "Parents Day",
            "8,0,1": "Labor Day",
            "8,0,0": "Grandparents Day",
            "9,1,1": "Columbus Day",
            "10,0,0": "Daylight Savings Time Ends",
            "10,3,4": "Thanksgiving Day",
            "6,0,0,3": "Independence day",
            "0,0,0,1": "New Year's Day",
            "11,0,0,1" : "Christmas Day"
        };

        // Set the current month, year
        var d = new Date(dateToSetup);

        this.currMonth = d.getMonth();
        this.currYear = d.getFullYear();
        this.currDay = d.getDate();
        this.SetUpDate = dateToSetup;
        this.DaysToDisplay = parseInt(displayDays);

    };
  

    // Show current month
    Cal.prototype.showcurr = function () {

        var result = {};

        result = this.showMonth(this.currYear, this.currMonth);

        if (result.NewDisplayDays > 0) {

            var d = new Date(result.DateToStartFrom);
            this.currMonth = d.getMonth();
            this.currYear = d.getFullYear();
            this.currDay = d.getDate();
            this.SetUpDate = result.DateToStartFrom;
            this.DaysToDisplay = parseInt(result.NewDisplayDays);

            var sdate = new Date(2018, 4, 13);
            var weekNumber = sdate.getWeekOfMonth(true);
            var isHoliday = this.GetHolidays(sdate.getMonth(), weekNumber, sdate.getDay(), sdate.getDate(), sdate.getFullYear());

            s = new Date();
            sdate = new Date(2018, 4, 28);
            weekNumber = sdate.getWeekOfMonth(true);
            isHoliday = this.GetHolidays(sdate.getMonth(), weekNumber, sdate.getDay(), sdate.getDate(), sdate.getFullYear());

            this.showcurr();
        }



    };

    //Search for holidays based on pre-configuration
    Cal.prototype.GetHolidays = function (month, week, day, date, year) {

        //If there is a static day  in pre-configuration
        var index = month + ',0,0' + ',' + date;
        var isHoliday = this.Holidays.hasOwnProperty(index);

        if (isHoliday)
            return isHoliday;


        //If there is a ocurrency event n days in month
        var buildDate = new Date(year, month, date);
        var weekRanges = buildDate.getWeekRangesOfMonth();
        var ocurrency = 0;

        for (var i = 0; i < weekRanges.length; i++) {

            if (( date > weekRanges[i].end) || (weekRanges[i].start <= date && date <= weekRanges[i].end)) {

                var buildstart = new Date(year, month, weekRanges[i].start);
                var buildend = new Date(year, month, weekRanges[i].end);

                if (buildstart.getDay() <= day && day <= buildend.getDay()) {
                    ocurrency++;
                }

            }
        }

        ocurrency = ocurrency > 0 ? ocurrency - 1 : 0;

        index = month + ',' + ocurrency + ',' + day;
        isHoliday = this.Holidays.hasOwnProperty(index);

        if (isHoliday)
            return isHoliday;

        ocurrency = 0;

        //If there is a ocurrency event last day in a month
        for (var i = weekRanges.length - 1; i >= 0; i--) {

            var buildstart = new Date(year, month, weekRanges[i].start);
            var buildend = new Date(year, month, weekRanges[i].end);

            if ((buildstart.getDay() <= day && day <= buildend.getDay()) && ocurrency < 1) {

                index = month + ',' + '-1' + ',' + day;
                isHoliday = this.Holidays.hasOwnProperty(index);
                
                if (isHoliday) {
                    if ((weekRanges[i].start <= date && date <= weekRanges[i].end)) {
                        return isHoliday;
                    }
                    else {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }

        return false;
    }

    // Show month (year, month)
    Cal.prototype.showMonth = function (y, m) {

        // Last day of the selected month
        var lastDateOfMonth = new Date(y, m + 1, 0).getDate()
            // Last day of the previous month
            , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

        var html = '<table>';

        html += '<thead>';
        html += '</thead>';

        // Write the header of the days of the week
        html += '<tr class="days">';
        for (var i = 0; i < this.DaysOfWeek.length; i++) {
            html += '<td>' + this.DaysOfWeek[i] + '</td>';
        }
        html += '</tr>';

        // Write selected month and year
        html += '<tr>';
        html += '<td class="month" colspan="7"><strong>' + this.Months[m] + ' ' + y + '</strong></td>';
        html += '</tr>';

        // Write the days

        var dayCounter = this.SetUpDate.getDate();
        var defaultDaysToShow = 1;
        var TotalDayDisplayed = 0;
        var TotalHolidays = 0;
        var finishDate = addDays(this.SetUpDate, (this.DaysToDisplay - defaultDaysToShow));

        // If number of days is over the month 
        lastDateOfMonth = ((finishDate.getMonth() == this.SetUpDate.getMonth()) && (finishDate.getFullYear() == this.SetUpDate.getFullYear())) && (finishDate.getDate() <= lastDateOfMonth) ? finishDate.getDate() : lastDateOfMonth;

        do {

            var actualDate = new Date(y, m, dayCounter);
            var dow = actualDate.getDay();

            // If Sunday, start new row
            if (dow == 0) {
                html += '<tr>';
            }

            // If not Sunday but first day of the month
            // it will fill in with blank
            else if (dayCounter == this.SetUpDate.getDate()) {
                html += '<tr>';
                for (var j = 0; j < this.SetUpDate.getDay(); j++) {
                    html += '<td class="not-current">' + ' ' + '</td>';
                }
            }

            //Check for holidays
            var weekNumber = actualDate.getWeekOfMonth(true);
            var isHoliday = this.GetHolidays(actualDate.getMonth(), weekNumber, actualDate.getDay(), actualDate.getDate(), actualDate.getFullYear());
            
            // Write the current day in the loop
            var chk = new Date();
            var chkY = chk.getFullYear();
            var chkM = chk.getMonth();
            if (isHoliday) {

                TotalHolidays++;

                _lastDateOfMonth = new Date(y, m + 1, 0).getDate();

                if (lastDateOfMonth != _lastDateOfMonth) {
                    lastDateOfMonth++;
                }
                html += '<td class="holiday">' + dayCounter + '</td>';
            }
            else if (dow == 0 || dow == 6) {
                html += '<td class="weekend">' + dayCounter + '</td>';
            }
            else if (chkY == this.currYear && chkM == this.currMonth && dayCounter == this.currDay) {
                html += '<td class="normal today">' + dayCounter + '</td>';
            } 
            else {
                html += '<td class="normal">' + dayCounter + '</td>';
            }

            // If Saturday, closes the row
            if (dow == 6) {
                html += '</tr>';
            }
            // If not Saturday, It will fill in blank the rest of the week
            else if (dayCounter == lastDateOfMonth) {
                var k = 1;
                for (dow; dow < 6; dow++) {
                    html += '<td class="not-current"></td>';
                    k++;
                }
            }
            dayCounter++;
            TotalDayDisplayed++;
        }
        while (dayCounter <= (lastDateOfMonth));

        // Closes table
        html += '</table>';

        // Write HTML to the div
        $('.calendar-wrapper').append('<div class="calendar-box">' + html+'</div><div class="spliter"></div>');

        //Evaluate If need to display more calendars
        var needNewIteration = ((addDays(finishDate, TotalHolidays).getMonth() != this.SetUpDate.getMonth()) && (finishDate.getFullYear() == this.SetUpDate.getFullYear())) && (addDays(finishDate, TotalHolidays) > this.SetUpDate);
        var newDaysToDisplay = 0,
            NewDateToDisplay = null;

        if (needNewIteration) {
            newDaysToDisplay = (this.DaysToDisplay + TotalHolidays) - (TotalDayDisplayed);
            var NewCalculatedDateToDisplay = new Date(y, m, (lastDateOfMonth));
            NewDateToDisplay = addDays(NewCalculatedDateToDisplay, 1);
        }


        return {
            DateToStartFrom: NewDateToDisplay,
            NewDisplayDays: newDaysToDisplay
        };
    };
    
    // Get element by id
    function getId(id) {
        return document.getElementById(id);
    }

    function addDays(date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }

    var createCalendar= function () {

        // Start calendar
        var txtCalendar = Date.parse(getId("startDate").value);
        var days = getId("numberDays").value;
        calendarContainer.append('<div class="row"><div class="col-lg-2"></div> <div class="col-lg-8"><p class="text-center">' + days + ' Day Example</p></div><div class="col-lg-2"></div></div>');
        var ObjectCalendar = new Cal(new Date(txtCalendar), days);

        IndexPageForm.hide();
        btnBack.show();

        ObjectCalendar.showcurr();


    };

    //funtionInit();


    return {
        Create: createCalendar
    };

}();

