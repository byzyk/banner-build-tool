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

Banner.Component = { items: {} };

Banner.Events = { items: [] };

Banner.Animation = {};


Banner.init = function () {

    Banner.getElementsBy('id');
    
    Banner.Data.dimension = Banner.getBannerDimension();

    Banner.Component.init();

    Banner.getElementsBy('id');

    Banner.loadImages(function () {

        Banner.Animation.init();

        Banner.Events.init();

        Banner.callback();

    });

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
Banner.Animation.start = function (the, Timeline, conf) {

    Timeline.main
        .to(the.Banner, 0.2, {opacity: 1})

        .from(the.CTA, 1, {opacity: 0})

    ;


    console.log(conf.size)

};
Banner.Animation.init = function () {

    var the = Banner.el,

        conf = Banner.config,

        Timeline = {
            main: new TimelineMax()
        };
    
    Banner.Animation.start(the, Timeline, conf);

    Banner.TIMELINE = [Timeline.main];

};
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
Banner.Events.items.push({
    element: '#clickTag',
    event: 'click',
    function: function () {
        window.open(clickTag, '_blank');
    }
});


Banner.Events.items.push({
    element: '#Banner',
    event: 'mouseover',
    function: function () {
        TweenMax.to(Banner.el.CTA, .2, {ease: Power3.easeInOut, scale: 1.2});
    }
});

Banner.Events.items.push({
    element: '#Banner',
    event: 'mouseout',
    function: function () {
        TweenMax.to(Banner.el.CTA, .2, {ease: Power3.easeInOut, scale: 1});
    }
});
Banner.Events.init =  function () {

    var items = Banner.Events.items;

    for (var i = 0; i < items.length; i++) {

        var item = items[i];
        var selector = document.querySelectorAll(item.element);
        for (var j = 0; j < selector.length; j++) {

            (function (s, e, index) {

                s[index].addEventListener(e.event, e.function, false);

            })(selector, item, j);

        }

    }

    Banner.Events.items = [];

};
Banner.callback = function () {
    console.log('ok');
};
Banner.config = {
        
    lang: 'EN',
    size: '120x600',
    type: 'standard',
    name: ''

};