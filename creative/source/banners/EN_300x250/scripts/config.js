var b,config = {
        
    lang: 'EN',
    size: '300x250',
    type: 'standard',
    name: '',

    animation: {

    },
    
    animate: function (timeline, the, c) {

        timeline.main
            .to(the.Banner, 1, {opacity: 1})
            .add('BACKUP')
        ;

        timeline.op
            .from(the.CTA, 10, {opacity: 0})
            .add('BACKUP')
        ;
        
    }

};