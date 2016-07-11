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
Banner.Animation.config = AnimationConfig;

Banner.Template = { item: {} };
Banner.Component = { item: {} };


Banner.Component.Init = function () {

    var C = Banner.Component.item,
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
Banner.click = function () {

    window.open(clickTag, '_blank');

};
Banner.loadImages = function (callback) {

    function getallBgimages() {
        var url, B = [], A = document.getElementsByTagName('*');
        A = B.slice.call(A, 0, A.length);
        while (A.length) {
            url = document.deepCss(A.shift(), 'background-image');
            if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
            url = url[1];
            if (url && B.indexOf(url) == -1) B[B.length] = url;
        }
        return B;
    }

    document.deepCss = function (who, css) {
        if (!who || !who.style) return '';
        var sty = css.replace(/\-([a-z])/g, function (a, b) {
            return b.toUpperCase();
        });
        if (who.currentStyle) {
            return who.style[sty] || who.currentStyle[sty] || '';
        }
        var dv = document.defaultView || window;
        return who.style[sty] ||
            dv.getComputedStyle(who, "").getPropertyValue(css) || '';
    };

    Array.indexOf = Array.indexOf ||
        function (what, index) {
            index = index || 0;
            var L = this.length;
            while (index < L) {
                if (this[index] === what) return index;
                ++index;
            }
            return -1;
        };

    var loaded = 0,
        images = getallBgimages(),
        imagesNum = images.length;

    function preloadAllImages(cb) {

        if (imagesNum) {

            for (var i = 0; i < imagesNum; i++) {
                preloadImage(images[i]);
            }

            function preloadImage(url) {
                var img = new Image();
                img.src = url;
                img.onload = function () {

                    loaded++;
                    if (loaded === imagesNum) {
                        if (cb) cb();
                    }

                }
            }

        } else {

            if (cb) cb();

        }

    }

    preloadAllImages(callback);

};
Banner.mouseEvents = {
    
    items: [],
    
    init: function () {
        
        var items = Banner.mouseEvents.items;
        
        for (var i = 0; i < items.length; i++) {
            
            var item = items[i];
            
            (function (e) {
                document.getElementById(e.el).addEventListener(e.e, e.func, false);
            })(item);
            
        }
        
    }
    
};
Banner.init = function () {

    Banner.getElementsBy('id');

    Banner.el.Banner.addEventListener('click', Banner.click);

    Banner.Data.dimension = Banner.getBannerDimension();

    Banner.Template.Init();

    Banner.Component.Init();

    Banner.getElementsBy('id');

    Banner.loadImages(function () {

        Banner.Animation.start();

    });

};