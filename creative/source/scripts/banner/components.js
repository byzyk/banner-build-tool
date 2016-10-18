export default class Components {

    constructor(elements) {

        this.Elements = elements;
        this.Components = {};

        this.addComponents();

    }

    init() {

        let C = this.Components,
            selector = 'data-component',
            nodes = document.querySelectorAll('[' + selector + ']'),
            components = [],
            el;

        for (let key in C) {
            if (C.hasOwnProperty(key)) components.push(key);
        }

        for (let i = 0; i < nodes.length; i++) {
            el = nodes[i];
            for (let j = 0; j < components.length; j++) {
                if (el.getAttribute(selector) === components[j]) C[components[j]](el);
            }
        }

    }

    add(n, f) {
        this.Components[n] = f;
    }

    addComponents() {

        this.add('Comp', el => {
            
            console.log(el, this);

        });

    }

}