Banner.init = function () {

    Banner.getElementsBy('id');

    Banner.el.clickTag.addEventListener('click', Banner.click);

    Banner.Data.dimension = Banner.getBannerDimension();

    Banner.Component.Init();

    Banner.getElementsBy('id');

    Banner.loadImages(function () {

        Banner.Animation.start();

    });

};