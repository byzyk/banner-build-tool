Banner.Template.Init = function (elementsIDs) {

    var T = Banner.Template.item,
        selector = 'data-template',
        templates = [],
        elements = [],
        el;

    if (!elementsIDs) {

        elements = document.querySelectorAll('[' + selector + ']');

    } else {

        elements = elementsIDs;

    }

    for (var key in T) templates.push(key);

    for (var i = 0; i < elements.length; i++) {
        el = elements[i];

        for (var j = 0; j < templates.length; j++) {
            if (el.getAttribute(selector) === templates[j]) {
                T[templates[j]](el);
            }
        }
    }

    Banner.getElementsBy('id');

};