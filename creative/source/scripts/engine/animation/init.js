Banner.Animation.init = function () {

    var the = Banner.el,

        conf = Banner.config,

        Timeline = {
            main: new TimelineMax()
        };
    
    Banner.Animation.start(the, Timeline, conf);

    Banner.TIMELINE = [Timeline.main];

};