export default class Events {

    constructor(elements) {
        
        this.Elements = elements;
        this.Events = [];

        this.addEvents();
        
    }

    init() {

        let items = this.Events;

        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            let selector = document.querySelectorAll(item.element);
            for (let j = 0; j < selector.length; j++) {
                selector[j].addEventListener(item.event, item.function, false);
            }
        }

    }

    add(el, e, f) {
        this.Events.push({
            element: el,
            event: e,
            function: f
        })
    }

    addEvents() {

        this.add('#clickTag', 'click', () => {
            window.open(clickTag, '_blank');
        });

        this.add('#Banner', 'mouseover', () => {
            TweenMax.to(this.Elements.CTA, .2, {ease: Power3.easeInOut, scale: 1.2});
        });

        this.add('#Banner', 'mouseout', () => {
            TweenMax.to(this.Elements.CTA, .2, {ease: Power3.easeInOut, scale: 1});
        });

    }

}