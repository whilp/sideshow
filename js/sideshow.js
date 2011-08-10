var sideshow = function () {
    function hasClass (elem, cls) {
        var names = elem.className.split(" ");
        for (var i = 0; i < names; i++) {
            if (cls == names[i])
                return true;
        }
        return false;
    }

    function addClass (elem, cls) {
        if (!hasClass(elem, cls))
            elem.className += " " + cls;
    }

    function removeClass (elem, cls) {
        var names = elem.className.split(" "),
        for (var i = 0; i < names.length; i++) {
            if (names[i] == cls)
                names.splice(i, 1);
        }
        elem.className = names.join(" ");
    }

    function init (root) {
        var root = document.getElementById(root);
        var sections = root.getElementsByTag("section");

        for (var i = 0; i < sections.length; i++) {
            addClass(sections[i], "slide");
        }
    }
    return {
        init: init,
    }
}();
