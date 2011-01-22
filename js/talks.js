(function ($) {
    var defaults = {
    };

    function slides (element, settings) {
        var root = $(element);
        root.addClass("slides");
    };

    $.fn.slides = function (options) {
        var settings = $.extend({}, defaults, options);

        return this.each(function () {
            slides(this, settings);
        });
    };
})(jQuery);
