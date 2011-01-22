(function ($) {
    var defaults = {
        bindings: {
            8: prevslide,  // backspace
            37: prevslide, // left
            38: prevslide, // up
            39: nextslide, // right
            40: nextslide, // down
            72: prevslide, // h
            75: prevslide, // k
            74: nextslide, // j
            76: nextslide, // l
            78: nextslide, // n
            80: prevslide, // p
            32: nextslide, // space
        },
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

    $(document).keydown(function (event) {
        var key = (event.keyCode ? event.keyCode : event.which);
        var fn = settings.bindings[key];
        if (fn) {
            fn();
            return false;
        };
    });
})(jQuery);
