(function ($) {
    var defaults = {
    };
    var slides = [];
    var root, header, footer;
    var current = 0;
    var invisible = "slides-invisible";

    function initslides (element, settings) {
        root = $(element);
        header = root.find("> header");
        footer = root.find("> footer");

        /* Make header, footer and (slides > 1) invisible. */
        slides = [root, header, footer];
        root.addClass("slides").children("section").each(function () {
            slides.push($(this));
        });
        $.each(slides.slice(4), function () {
            $(this).addClass(invisible);
        });
    };

    $.fn.slides = function (options) {
        var settings = $.extend({}, defaults, options);

        return this.each(function () {
            initslides(this, settings);
        });
    };
})(jQuery);
