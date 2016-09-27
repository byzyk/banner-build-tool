Banner.Events.items.push({
    element: '#clickTag',
    event: 'click',
    function: function () {
        window.open(clickTag, '_blank');
    }
});


Banner.Events.items.push({
    element: '#Banner',
    event: 'mouseover',
    function: function () {
        TweenMax.to(Banner.el.CTA, .2, {ease: Power3.easeInOut, scale: 1.2});
    }
});

Banner.Events.items.push({
    element: '#Banner',
    event: 'mouseout',
    function: function () {
        TweenMax.to(Banner.el.CTA, .2, {ease: Power3.easeInOut, scale: 1});
    }
});
