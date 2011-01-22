(function ($) {
    var defaults = {
    };
    var settings = {};
    var slides = [];
    var root, header, footer;
    var current = 0;
    var invisible = "slides-invisible";

    function initslides (element) {
        root = $(element);
        header = root.find("> header");
        footer = root.find("> footer");

        /* Make header, footer and (slides > 1) invisible. */
        root.addClass("slides").children("section").each(function () {
            slides.push($(this));
        });
        $.each(slides.slice(1), function () {
            $(this).addClass(invisible);
        });
    };

    function gotoslide (index) {
        if (index >= slides.length || index < 0)
            return;
        slides[current].addClass(invisible);
        slides[index].removeClass(invisible);
        current = index;
    };

    function nextslide () {
        gotoslide(current + 1);
    }

    function prevslide () {
        gotoslide(current - 1);
    }

    $.fn.slides = function (options) {
        $.extend(settings, defaults, options);

        return this.each(function () {
            initslides(this, settings);
        });
    };
})(jQuery);
