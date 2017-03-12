import Core from './banner/core';
import Components from './banner/components';
import Animation from './banner/animation';
import Event from './banner/events';

class Banner extends Core {

    Stacy () {

        if (this.Libs.fails > 10) return;

        if (this.Libs.loaded < this.Libs.source.length) {

            if (window[this.Libs.source[this.Libs.loaded][0]]) {

                this.Libs.loaded++;
                self.Stacy();

            } else {

                super.loadScript(
                    this.Libs.source[this.Libs.loaded][1],
                    true,
                    () => this.Stacy(),
                    (src) => {
                        console.log('Error loading script: ' + src);
                        this.Stacy();
                    }
                );

            }

        } else {
            this.Init();
        }

    }

    Init() {
        
        let banner = {};
        
        super.getAllElementsById();

        banner.components = new Components(this.Elements);
        banner.components.init();

        super.getAllElementsById();

        banner.events = new Event(this.Elements, config);

        banner.animation = new Animation(this.Elements, config);

        super.checkAssetsLoaded(
            () => {
                banner.events.init();
                banner.animation.init();
            }
        );

        super.getAllTimelines(banner.animation.Timeline);

    }

}


window.onload = function() {
    b = new Banner;
    b.Stacy();
};