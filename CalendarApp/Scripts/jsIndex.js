var HomePage = function () {

    var btnGenerate = $('#btnCreate');
    var btnBack = $('#btnBack');
    var calendarContainer = $('.calendar-wrapper');

    $(function () {
        funtionInit();
    });

    var fnGoBackForm = function () {
        $('#form').show();
        btnBack.hide();
        calendarContainer.empty();
        
    };

    var funtionInit = function () {

        btnBack.hide();
        btnBack.unbind().click(fnGoBackForm);

        btnGenerate.unbind().click(evt => CalendarObject.Create());
    };

    return {
        init: funtionInit
    };

}();


