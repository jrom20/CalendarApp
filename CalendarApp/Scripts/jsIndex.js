var HomePage = function () {

    var btnGenerate = $('#btnCreate');
    var btnBack = $('#btnBack');
    var calendarContainer = $('.calendar-wrapper');
    var txtnumberDays = $('#numberDays');

    $(function () {
        funtionInit();
    });

    var fnGoBackForm = function () {
        $('#form').show();
        btnBack.hide();
        calendarContainer.empty();
    };

    var fnGenerateClickEvt = function () {
        CalendarObject.Create();
    };

    var fnOnNumberDaysChange = function () {
        let inputNumber = $(this).val();

        if (inputNumber <= 0) {
            alert('Please, provide a number greater than 0');
            $(this).val(1);
        }

    };

    var funtionInit = function () {

        btnBack.hide();
        btnBack.unbind().click(fnGoBackForm);
        btnGenerate.unbind().click(fnGenerateClickEvt);
        txtnumberDays.unbind().change(fnOnNumberDaysChange);
        return true;
    };

    return {
        init: funtionInit
    };

}();


