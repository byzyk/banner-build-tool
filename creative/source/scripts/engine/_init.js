Banner.init = function () {

    Banner.getElementsBy('id');

    Banner.el.Banner.addEventListener('click', Banner.click);

    Banner.Data.dimension = Banner.getBannerDimension();

    Banner.Template.Init();

    Banner.Component.Init();

    Banner.getElementsBy('id');

    Banner.loadImages(function () {

        Banner.Animation.start();

    });

};