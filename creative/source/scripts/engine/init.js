Banner.init = function () {

    Banner.getElementsBy('id');
    
    Banner.Data.dimension = Banner.getBannerDimension();

    Banner.Component.init();

    Banner.getElementsBy('id');

    Banner.loadImages(function () {

        Banner.Animation.init();

        Banner.Events.init();

    });

};