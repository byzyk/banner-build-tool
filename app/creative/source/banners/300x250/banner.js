var AnimationConfig = function (self) {
    return {

        size: '300x250',

        Mask: {
            duration: 1,
            animation: {
                ease: Power2.easeInOut,
                left: 0
            }
        },

        Image: {
            duration: 0.5,
            animation: {
                ease: Power3.easeInOut,
                x: 25
            },
            delay: '-=.6'
        },

        Text: {
            duration: 0.35,
            animation: {
                ease: Power2.easeOut,
                opacity: 0,
                x: -10
            }
        },

        CTA: {
            duration: 0.5,
            animation: {
                ease: Back.easeOut,
                opacity: 0,
                x: -20
            }
        },

        CTA_OVER: {
            duration: 0.35,
            animation: {
                ease: Back.easeOut, 
                x: 5
            }
        },

        CTA_OUT: {
            duration: 0.2,
            animation: {
                ease: Power2.easeInOut, 
                x: 0
            }
        }

    }
};