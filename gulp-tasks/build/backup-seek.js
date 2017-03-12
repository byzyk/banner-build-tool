function _BannerTimeline(cb) {
    var timelines = b.Timelines;
    for (var i = 0; i < timelines.length; i++) {
        if (cb) cb(timelines[i]);
    }
}

_BannerTimeline(function (t) {
    t.pause().seek("BACKUP");
});