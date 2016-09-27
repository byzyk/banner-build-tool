export default class Animation {

    constructor() {

        this.Timeline = {};
        
    }

    init(Elements) {

        this.Elements = Elements;
        this.Timeline.main = new TimelineMax();

        this.animate(config.animation);

    }
    
    animate(c) {

        let the = this.Elements,
            timeline = this.Timeline;

        timeline.main
            .to(the.Banner, 0.2, {opacity: 1})
            .from(the.CTA, 1, {opacity: 0})
        ;
        
    }

}