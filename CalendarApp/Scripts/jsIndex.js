var HomePage = function () {

    var btnGenerate = $('.btn');

    $(function () {
        funtionInit();
    });
    
    var funtionInit = function () {
        btnGenerate.unbind().click(evt => CalendarObject.Create());
    };

    return {
        init: funtionInit
    };

}();


