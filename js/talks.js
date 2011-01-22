(function ($) {
    var defaults = {
    };
    var slides = [];
    var current = 0;
    var invisible = "slides-invisible";

    function initslides (element, settings) {
        var root = $(element);
        var header = root.find("> header");
        var footer = root.find("> footer");

        /* Make header, footer and slides invisible. */
        header.addClass(invisible);
        footer.addClass(invisible);
        root.addClass("slides").children("section").each(function () {
            var slide = $(this);
            slide.addClass(invisible);
            slides.push($(this));
        });

        /* 
         * If any slides are present, make the header, footer and current slide
         * visible again
         */
        if (slides) {
            header.removeClass(invisible);
            footer.removeClass(invisible);
            slides[current].removeClass(invisible);
        };
    };

    $.fn.slides = function (options) {
        var settings = $.extend({}, defaults, options);

        return this.each(function () {
            initslides(this, settings);
        });
    };
})(jQuery);
