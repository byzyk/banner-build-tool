Banner.Animation.start = function () {

    var the = Banner.el,

        conf = Banner.Animation.config(this),

        Timeline = {
            main: new TimelineMax({
                onComplete: function () {
                    Banner.mouseEvents.init();
                }
            })
        };

    // Banner.mouseEvents.items.push({
    //     el: 'Banner',
    //     e: 'mouseover',
    //     func: function () {
    //         TweenMax.to(Banner.el.CTA, conf.CTA_OVER.duration, conf.CTA_OVER.animation);
    //     }
    // });
    // Banner.mouseEvents.items.push({
    //     el: 'Banner',
    //     e: 'mouseout',
    //     func: function () {
    //         TweenMax.to(Banner.el.CTA, conf.CTA_OUT.duration, conf.CTA_OUT.animation);
    //     }
    // });

    Timeline.main
        .to(the.Banner, 0.2, {opacity: 1})

    ;

    Banner.TIMELINE = [Timeline.main];

};