$(document).ready(function () {
    $('[data-toggle="collapse"]').each(function(index, element) {
        var target = $(element).data('target');

        $(element).on('click', function () {
            $(target).slideToggle();
        });
    })
});