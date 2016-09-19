Banner.Animation.config = BannerConfig;

Banner.Animation.init = function () {

    var the = Banner.el,

        conf = Banner.Animation.config(this),

        Timeline = {
            main: new TimelineMax({
                onComplete: function () {
                }
            })
        };
    
    Banner.Animation.start(the, Timeline, conf);

    Banner.TIMELINE = [Timeline.main];

};