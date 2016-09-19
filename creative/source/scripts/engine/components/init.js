Banner.Component.init = function () {

    var C = Banner.Component.items,
        selector = 'data-component',
        elements = document.querySelectorAll('[' + selector + ']'),
        components = [],
        el;

    for (var key in C) components.push(key);

    for (var i = 0; i < elements.length; i++) {
        el = elements[i];

        for (var j = 0; j < components.length; j++) {
            if (el.getAttribute(selector) === components[j]) {
                C[components[j]](el);
            }
        }
    }

};