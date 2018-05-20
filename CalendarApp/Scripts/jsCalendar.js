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
    this.DaysToDisplay = displayDays;

};

// Show current month
Cal.prototype.showcurr = function() {
  this.showMonth(this.currYear, this.currMonth, this.DaysToDisplay, this.SetUpDate);
};

// Show month (year, month)
Cal.prototype.showMonth = function (y, m, days, inpdate) {

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