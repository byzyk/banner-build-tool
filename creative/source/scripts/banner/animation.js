export default class Animation {

    constructor(elements, config) {

        this.Timeline = {
            main: new TimelineMax(),
            op: new TimelineMax()
        };

        this.Elements = elements;
        this.Config = config;
        
    }
    
    init() {

        let the = this.Elements,
            timeline = this.Timeline,
            c = this.Config.animation,
            animate = this.Config.animate;

        (typeof animate === 'function') ? animate(timeline, the, c) : this.animate(timeline, the, c);

    }

    animate(timeline, the, c) {

        timeline.main
            .to(the.Banner, 2, {opacity: 1})
            .from(the.CTA, 5, {opacity: 0})
            .add('BACKUP')
        ;

    }

}