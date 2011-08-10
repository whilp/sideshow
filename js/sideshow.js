var sideshow = function () {
    var slides = [],
        current = 0;
    var bindings = {
        32: function () { /* space */
            goto(current + 1);
        },
        33: function () { /* page up */
            goto(current - 1);
        },
        34: function () { /* page down */
            goto(current + 1);
        },
    }

    function hasClass (elem, cls) {
        var names = elem.className.split(" ");
        for (var i = 0; i < names; i++) {
            if (cls == names[i])
                return true;
        }
        return false;
    }

    function addClass (elem, cls) {
        var names = elem.className.split(" ");
        for (var i = 0; i < names.length; i++) {
            if (names[i] == cls)
                return;
        }
        names.push(cls);
        elem.className = names.join(" ");
    }

    function removeClass (elem, cls) {
        var names = elem.className.split(" ");
        for (var i = 0; i < names.length; i++) {
            if (names[i] == cls)
                names.splice(i, 1);
        }
        elem.className = names.join(" ");
    }

    function keyHandler (event) {
        var event = window.event ? window.event : event;
        var key = event.charCode ? event.charCode : event.keyCode;

        if (bindings[key])
            bindings[key]();
    }

    function hashHandler () {
        var index = 1;
        if (window.location.hash)
            index = parseInt(location.hash.slice(6), 10);
        goto(index - 1);
    }

    function goto (index) {
        if (index >= slides.length || index < 0)
            return;
        removeClass(slides[current], "current-slide");
        current = index;
        addClass(slides[current], "current-slide");
        window.location.hash = "#slide" + (current + 1);
    }

    function init (root) {
        var root = document.getElementById(root);
        slides = root.getElementsByTagName("section");

        for (var i = 0; i < slides.length; i++) {
            addClass(slides[i], "slide");
        }

        hashHandler();

        document.onkeypress = keyHandler;
        window.onhashchange = hashHandler;
    }

    return {
        current: current,
        slides: slides,
        bindings: bindings,
        keyHandler: keyHandler,
        hashHandler: hashHandler,
        init: init,
        goto: goto,
    }
}();
