import Core from './banner/core';
import Animation from './banner/animation';

class Banner extends Core {

    Stacy () {

        if (this.Libs.fails > 10) return;

        if (this.Libs.loaded < this.Libs.source.length) {

            if (window[this.Libs.source[this.Libs.loaded][0]]) {

                this.Libs.loaded++;
                self.Stacy();

            } else {

                super.loadScript(this.Libs.source[this.Libs.loaded][1], true)
                    .then(() => this.Stacy())
                    .catch((src) => {
                        console.log('Error loading script: ' + src);
                        this.Stacy();
                    });

            }

        } else {
            this.Init();
        }

    }

    Init() {
        
        let banner = {};

        this.Elements = super.getAllElementsById(this.Elements);
        
        banner.animation = new Animation(this.Elements, config);

        super.checkAssetsLoaded()
            .then( () => banner.animation.animate() );

        this.Timelines = super.getAllTimelines(banner.animation.Timeline);

    }

}

window.onload = function() {
    b = new Banner;
    b.Stacy();
};