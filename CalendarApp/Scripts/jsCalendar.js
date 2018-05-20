var Cal = function (divId, dateToSetup, displayDays) {

    //Store div id
    this.divId = divId;

    // Days of week, starting on Sunday
    this.DaysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    // Months, stating on January
    this.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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

        this.showcurr();
    }



};

// Show month (year, month)
Cal.prototype.showMonth = function (y, m) {

    // Last day of the selected month
    var lastDateOfMonth = new Date(y, m + 1, 0).getDate()
        // Last day of the previous month
        , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

    var html = '<table>';

    html += '<thead><tr>';
    html += '<td colspan="7">' + '</td>';
    html += '</tr></thead>';

    // Write the header of the days of the week
    html += '<tr class="days">';
    for (var i = 0; i < this.DaysOfWeek.length; i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';

    // Write selected month and year
    html += '<tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr>';

    // Write the days

    var dayCounter = this.SetUpDate.getDate();
    var TotalDayDisplayed = 1;
    var finishDate = addDays(this.SetUpDate, this.DaysToDisplay);

    // If number of days is over the month 
    lastDateOfMonth = ((finishDate.getMonth() == this.SetUpDate.getMonth()) && (finishDate.getFullYear() == this.SetUpDate.getFullYear())) && (finishDate.getDate() <= lastDateOfMonth) ? finishDate.getDate() : lastDateOfMonth;

    do {

        var dow = new Date(y, m, dayCounter).getDay();

        // If Sunday, start new row
        if (dow == 0) {
            html += '<tr>';
        }

        // If not Sunday but first day of the month
        // it will fill in with blank
        else if (dayCounter == this.SetUpDate.getDate()) {
            html += '<tr>';
            for (var j = 0; j < this.SetUpDate.getDay() ; j++) {
                html += '<td class="not-current">' + ' ' + '</td>';
            }
        }

        // Write the current day in the loop
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && dayCounter == this.currDay) {
            html += '<td class="normal today">' + dayCounter + '</td>';
        } else if (chkY == this.currYear && chkM == this.currMonth && (dayCounter == 0 || dayCounter == 6)) {
            html += '<td class="weekend">' + dayCounter + '</td>';
        }
        else {
            html += '<td class="normal">' + dayCounter + '</td>';
        }

        // If Saturday, closes the row
        if (dow == 6) {
            html += '</tr>';
        }

        dayCounter++;
        TotalDayDisplayed++;
    }
    while (dayCounter <= lastDateOfMonth);

    // Closes table
    html += '</table>';

    // Write HTML to the div
    document.getElementById(this.divId).innerHTML = html;

    //Evaluate If need to display more calendars
    var needNewIteration = ((finishDate.getMonth() != this.SetUpDate.getMonth()) && (finishDate.getFullYear() == this.SetUpDate.getFullYear())) && (finishDate > this.SetUpDate);
    var newDaysToDisplay = 0,
        NewDateToDisplay = null;

    if (needNewIteration) {
        newDaysToDisplay = this.DaysToDisplay - (TotalDayDisplayed);
        var NewCalculatedDateToDisplay = new Date(y, m, lastDateOfMonth);
        NewDateToDisplay = addDays(NewCalculatedDateToDisplay, 1);
    }
    

    return {
        DateToStartFrom: NewDateToDisplay,
        NewDisplayDays: newDaysToDisplay
    };
};

// On Load of the window
window.onload = function () {

    // Start calendar
    var txtCalendar = Date.parse(getId("startDate").value);
    var days = getId("numberDays").value;
    var ObjectCalendar = new Cal("divCal", new Date(txtCalendar), days);

    ObjectCalendar.showcurr();

}

// Get element by id
function getId(id) {
  return document.getElementById(id);
}

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}