export default class Animation {

    constructor(elements, config) {

        this.Timeline = {
            main: new TimelineMax()
        };

        this.Elements = elements;
        this.Config = config;
        
    }
    
    animate() {

        let the = this.Elements,
            timeline = this.Timeline,
            c = this.Config.animation;

        timeline.main
            .to(the.Banner, 0.2, {opacity: 1})
            .from(the.CTA, 5, {opacity: 0})
        ;

    }

}