export default class Core {

    constructor() {
    }

    getAllElementsById(Elements) {
        
        if (Elements.length) Elements = {};
        
        var nodes = document.querySelectorAll('body [id]');

        for (var i = 0; i < nodes.length; i++) {
            Elements[nodes[i].getAttribute('id')] = nodes[i];
        }

        return Elements;

    }

    getAllTimelines(timelines) {

        let t = [];
        for (let timeline in timelines) {
            if (timelines.hasOwnProperty(timeline)) t.push(timelines[timeline]);
        }
        return t;

    }

    loadImages(callback) {

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

    }

    checkAssetsLoaded() {
        this.loadImages();
    }

}

