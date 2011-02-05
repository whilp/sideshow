(function ($) {
    $.fn.sideshow = function (options) {
        $.extend($.fn.sideshow.settings, $.fn.sideshow.defaults, options);

        return this.each(function () {
            $.fn.sideshow.init(this);
        });
    };

    $.fn.sideshow.settings = {},
    $.fn.sideshow.slides = [];
    $.fn.sideshow.current = 0;

    $.fn.sideshow.defaults = {
        duration: 0,
        help: true,
        bindings: {
            37: "prev", // left
            38: "prev", // up
            75: "prev", // k
            39: "next", // right
            40: "next", // down
            74: "next", // j
            32: "next", // space
            72: "help", // h
        },
    };

    $.fn.sideshow.init = function (element) {
        $.fn.sideshow.root = root = $(element);
        $.fn.sideshow.header = header = root.find("> header");
        $.fn.sideshow.footer = footer = root.find("> footer");
        var slides = $.fn.sideshow.slides;

        /* Hide header, footer and (slides > 1). */
        root.addClass("slides").children("section").each(function () {
            slides.push($(this));
        });
        $.each(slides.slice(1), function () {
            $(this).hide();
        });
        $.fn.sideshow.gotohash();

        var $document = $(document);
        $document.keydown(function (event) {
            var key = (event.keyCode ? event.keyCode : event.which);
            var fnname = $.fn.sideshow.settings.bindings[key],
                fn = $.fn.sideshow[fnname];
            if (fn) {
                fn();
                return false;
            };
        });

        if ("hashchange" in $(window)) {
            $(window).hashchange(function () {
                $.fn.sideshow.gotohash();
            });
        };

        if ($.fn.sideshow.settings.help)
            $.fn.sideshow.flash("This webpage is a presentation! Press <kbd>h</kbd> for help.");
    };

    $.fn.sideshow.goto = function (index) {
        var slides = $.fn.sideshow.slides,
            current = $.fn.sideshow.current,
            settings = $.fn.sideshow.settings;
        if (index >= slides.length || index < 0 || (index > 1 && index == current))
            return;
        $.fn.sideshow.hide(slides[current]);
        $.fn.sideshow.show(slides[index]);
        $.fn.sideshow.current = index;
        location.hash = "#slide" + (index + 1);
    };

    $.fn.sideshow.next = function () {
        $.fn.sideshow.goto($.fn.sideshow.current + 1);
    }

    $.fn.sideshow.prev = function () {
        $.fn.sideshow.goto($.fn.sideshow.current - 1);
    }

    $.fn.sideshow.show = function (slide) {
        slide.show($.fn.sideshow.settings.duration);
    };

    $.fn.sideshow.hide = function (slide) {
        slide.hide($.fn.sideshow.settings.duration);
    };

    $.fn.sideshow.gotohash = function (hash) {
        var hash = hash;
        if (typeof hash == "undefined")
            hash = location.hash || "#slide1";
        var slide = hash.replace(/^#slide/, "");
        $.fn.sideshow.goto(parseInt(slide, 10) - 1);
    };

    $.fn.sideshow.flash = function (message, duration) {
        var elem = $("#flash");
        var duration = duration >= 0 || 5000;
        if (elem.length != 0) {
            elem.remove();
        }

        $('<p id="flash">' + message + '</p>')
            .appendTo("body")
            .show()
            .fadeOut(duration, function () { $(this).remove(); });
    };

    $.fn.sideshow.help = function () {
        if (! $.fn.sideshow.settings.help)
            return;
        $.fn.sideshow.flash(
                "Keys: " + 
                "<kbd>↑</kbd>, <kbd>←</kbd>, <kbd>k</kbd> or <kbd>space</kbd> to go forward; " + 
                "<kbd>↓</kbd>, <kbd>→</kbd>, or <kbd>j</kbd> to go backward.");
    };
})(jQuery);
