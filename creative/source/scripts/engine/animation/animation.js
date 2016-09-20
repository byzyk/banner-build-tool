Banner.Animation.start = function (the, Timeline, conf) {

    Timeline.main
        .to(the.Banner, 0.2, {opacity: 1})

        .from(the.CTA, 1, {opacity: 0})

    ;


    console.log(conf.size)

};