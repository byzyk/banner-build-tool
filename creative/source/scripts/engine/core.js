Banner.el = {};


Banner.getElementsBy = function (selector) {

    if (Banner.el.length) Banner.el = {};

    var elements = document.querySelectorAll('[' + selector + ']');

    for (var i = 0; i < elements.length; i++) {
        Banner.el[elements[i].getAttribute(selector)] = elements[i];
    }

};


Banner.parseElId = function (el) {

    return (typeof el === 'string') ? el : el.getAttribute('id');

};


Banner.Animation = {};
Banner.Animation.config = BannerConfig;

Banner.Component = { item: {} };

