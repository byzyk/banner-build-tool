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

    getAllElementsById() {
        
        if (this.Elements.length) this.Elements = {};
        
        let nodes = document.querySelectorAll('body [id]');

        for (let i = 0; i < nodes.length; i++) {
            this.Elements[nodes[i].getAttribute('id')] = nodes[i];
        }

        return this.Elements;

    }

    getAllTimelines(timelines) {

        let t = [];
        for (let timeline in timelines) {
            if (timelines.hasOwnProperty(timeline)) t.push(timelines[timeline]);
        }
        this.Timelines = t;

    }


    loadScript(src, isLib, resolve, reject) {

        let self = this;

        let s,
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


    }


    getAllImages() {

        document.deepCss = function (who, css) {
            if (!who || !who.style) return '';
            let sty = css.replace(/\-([a-z])/g, function (a, b) {
                return b.toUpperCase();
            });
            if (who.currentStyle) {
                return who.style[sty] || who.currentStyle[sty] || '';
            }
            let dv = document.defaultView || window;
            return who.style[sty] ||
                dv.getComputedStyle(who, "").getPropertyValue(css) || '';
        };

        let url, B = [], A = document.getElementsByTagName('*');
        A = B.slice.call(A, 0, A.length);
        while (A.length) {
            url = document.deepCss(A.shift(), 'background-image');
            if (url) url = /url\(['"]?([^")]+)/.exec(url) || [];
            url = url[1];
            if (url && B.indexOf(url) == -1) B[B.length] = url;
        }
        return B;

    }

    loadImages(resolve, reject) {

        let loaded = 0,
            images = this.getAllImages(),
            imagesTotal = images.length;

        if (imagesTotal) {

            for (let i = 0; i < imagesTotal; i++) {
                preloadImage(images[i]);
            }

            function preloadImage(url) {
                let img = new Image();
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

    }
    

    checkAssetsLoaded(resolve, reject) {
        
        this.loadImages(resolve, reject);

    }

}