(function ($) {
    var settings = {};
    var slides = [];
    var root, header, footer;
    var current = 0;

    function initslides (element) {
        root = $(element);
        header = root.find("> header");
        footer = root.find("> footer");

        /* Hide header, footer and (slides > 1). */
        root.addClass("slides").children("section").each(function () {
            slides.push($(this));
        });
        $.each(slides.slice(1), function () {
            $(this).hide();
        });
    };

    function gotoslide (index) {
        if (index >= slides.length || index < 0)
            return;
        settings.hide(slides[current]);
        settings.show(slides[index]);
        current = index;
    };

    function nextslide () {
        gotoslide(current + 1);
    }

    function prevslide () {
        gotoslide(current - 1);
    }

    function showslide (slide) {
        slide.show(settings.duration);
    };

    function hideslide (slide) {
        slide.hide(settings.duration);
    };

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

    var defaults = {
        show: showslide,
        hide: hideslide,
        duration: 0,
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
})(jQuery);
