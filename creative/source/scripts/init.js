var Banner,
    conf = {};


window.onload = function() {
    Banner = new BC;
    Banner.Stacy();
};


function BC () { //BC -> BannerConstructor

    var b = this;

    b.createCORSRequest = function (method, url) {

        var xhr = new XMLHttpRequest();

        if ("withCredentials" in xhr) {

            xhr.open(method, url, true);

        } else if (typeof XDomainRequest != "undefined") {

            xhr = new XDomainRequest();
            xhr.open(method, url);

        } else {

            xhr = null;

        }

        return xhr;

    };

    b.appendScript = function(src, callback, isLib) {

        var s,
            r;
        r = false;
        s = document.createElement('script');
        s.src = src;
        s.async = 'async';
        s.onload = s.onreadystatechange = function() {
            if ( !r && (!this.readyState || this.readyState == 'complete') ) {
                r = true;
                if(isLib) Banner.Libs.loaded++;
                if (typeof callback !== 'undefined') callback();
            }
        };
        s.onerror = function() {
            console.log('error loading this script ' + src);
            if (typeof callback !== 'undefined') callback();
            if(isLib) Banner.Libs.fails++;
        };
        document.getElementsByTagName('head')[0].appendChild(s);

    };

    b.getBannerDimension = function () {

        var size = document.querySelector('[name="ad.size"]').getAttribute('content').split(',');

        return size[0].split('=')[1] + 'x' + size[1].split('=')[1];

    };

    b.Libs = {
        loaded: 0,
        fails: 0,
        host: '//s0.2mdn.net/ads/studio/cached_libs/'
    };
    b.Libs.source = [
        ['TweenMax', b.Libs.host + 'tweenmax_1.18.0_499ba64a23378545748ff12d372e59e9_min.js']
    ];

    b.Stacy = function () {

        if (b.Libs.fails > 10) return;

        if (b.Libs.loaded < b.Libs.source.length) {
            if (window[b.Libs.source[b.Libs.loaded][0]]) {
                b.Libs.loaded++;
                b.Stacy();
            } else {
                b.appendScript(b.Libs.source[b.Libs.loaded][1], b.Stacy, true);
            }
        } else {

            b.appendScript('/source/scripts/build/engine.min.js', function () {
                b.init();
            });
            
        }

    };

    b.Data = {};

}