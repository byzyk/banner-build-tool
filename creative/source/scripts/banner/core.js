export default class Core {
    
    constructor() {
        
        this.Libs = {};
        this.Libs.loaded = 0;
        this.Libs.fails = 0;
        this.Libs.source = [
            ['TweenMax', '//s0.2mdn.net/ads/studio/cached_libs/tweenmax_1.18.0_499ba64a23378545748ff12d372e59e9_min.js']
        ];

        this.Elements = {};
        this.Timelines = [];
        
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
    

    loadScript(src, isLib) {

        var self = this;
        return new Promise(function (resolve, reject) {

            var s,
                r;
            r = false;
            s = document.createElement('script');
            s.src = src;
            s.async = 'async';
            s.onload = s.onreadystatechange = function() {
                if ( !r && (!this.readyState || this.readyState == 'complete') ) {
                    r = true;
                    if(isLib) self.Libs.loaded++;
                    resolve();
                }
            };
            s.onerror = function() {
                if(isLib) self.Libs.fails++;
                reject(src);
            };
            document.getElementsByTagName('head')[0].appendChild(s);
            
        });

    }
    
    
    getAllImages() {

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

    loadImages() {
        
        return new Promise((resolve, reject) => {

            let loaded = 0,
                images = this.getAllImages(),
                imagesTotal = images.length;

            if (imagesTotal) {

                for (var i = 0; i < imagesTotal; i++) {
                    preloadImage(images[i]);
                }

                function preloadImage(url) {
                    var img = new Image();
                    img.src = url;
                    img.onload = function () {

                        loaded++;
                        if (loaded === imagesTotal) {
                            resolve();
                        }

                    };
                    img.onerror = function () {
                        reject(url);
                    }
                }

            } else {

                resolve();

            }
            
        })

    }
    

    checkAssetsLoaded() {
        
        return new Promise((resolve, reject) => {
            this.loadImages()
                .then(resolve)
                .catch(reject);
        });

    }

}