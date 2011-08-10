var sideshow = function () {
    var slides = [],
        current = 0;

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

    function goto (index) {
        if (index > slides.length)
            return;
        removeClass(slides[current], "current-slide");
        current = index;
        addClass(slides[current], "current-slide");
    }

    function init (root) {
        var root = document.getElementById(root);
        slides = root.getElementsByTagName("section");

        for (var i = 0; i < slides.length; i++) {
            addClass(slides[i], "slide");
        }
        goto(0);
    }

    return {
        current: current,
        slides: slides,
        init: init,
        goto: goto,
    }
}();
