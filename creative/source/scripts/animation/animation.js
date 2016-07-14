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

    Banner.mouseEvents.items.push({
        el: 'Banner',
        e: 'mouseover',
        func: function () {
            TweenMax.to(Banner.el.CTA, conf.CTA_OVER.duration, conf.CTA_OVER.animation);
        }
    });
    Banner.mouseEvents.items.push({
        el: 'Banner',
        e: 'mouseout',
        func: function () {
            TweenMax.to(Banner.el.CTA, conf.CTA_OUT.duration, conf.CTA_OUT.animation);
        }
    });

    Timeline.main
        .to(the.Banner, 0.2, {opacity: 1})

        .from(the.Mask, conf.Mask.duration, conf.Mask.animation)
        .from(the.Image, conf.Image.duration, conf.Image.animation, conf.Image.delay)

        .from(the.Logo, 0.35, {opacity: 0}, '-=.1')

        .from(the.Text, conf.Text.duration, conf.Text.animation, '-=.15')

        .from(the.CTA, conf.CTA.duration, conf.CTA.animation, '-=.1')

    ;

    Banner.TIMELINE = [Timeline.main];

};