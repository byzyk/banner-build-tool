Banner.Events.items.push({
    el: '#clickTag',
    e: 'click',
    func: function () {
        window.open(clickTag, '_blank');
    }
});


Banner.Events.items.push({
    el: '#Banner',
    e: 'mouseover',
    func: function () {
        TweenMax.to(Banner.el.CTA, .2, {ease: Power3.easeInOut, scale: 1.2});
    }
});

Banner.Events.items.push({
    el: '#Banner',
    e: 'mouseout',
    func: function () {
        TweenMax.to(Banner.el.CTA, .2, {ease: Power3.easeInOut, scale: 1});
    }
});