import Core from './banner/core';
import Animation from './banner/animation';

class Banner {

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
    
    loadScript(src, callback, isLib) {

        var self = this;
        
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
                if (typeof callback !== 'undefined') callback();
            }
        };
        s.onerror = function() {
            console.log('error loading this script ' + src);
            if (typeof callback !== 'undefined') callback();
            if(isLib) self.Libs.fails++;
        };
        document.getElementsByTagName('head')[0].appendChild(s);

    }

    Stacy () {

        if (this.Libs.fails > 10) return;

        if (this.Libs.loaded < this.Libs.source.length) {
            if (window[this.Libs.source[this.Libs.loaded][0]]) {
                this.Libs.loaded++;
                this.Stacy().bind(this);
            } else {
                this.loadScript(this.Libs.source[this.Libs.loaded][1], this.Stacy.bind(this), true);
            }
        } else {
            this.Init();
        }

    }

    Init() {
        
        let banner = {};
        banner.core = new Core;

        this.Elements = banner.core.getAllElementsById(this.Elements);
        
        banner.animation = new Animation(this.Elements, config);

        // banner.core.checkAssetsLoaded();

        this.Timelines = banner.core.getAllTimelines(banner.animation.Timeline);
        
        banner.animation.animate();

    }

}

window.onload = function() {
    b = new Banner;
    b.Stacy();
};