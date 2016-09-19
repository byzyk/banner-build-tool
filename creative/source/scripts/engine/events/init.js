Banner.Events.init =  function () {

    var items = Banner.Events.items;

    for (var i = 0; i < items.length; i++) {

        var item = items[i];
        var selector = document.querySelectorAll(item.el);
        for (var j = 0; j < selector.length; j++) {

            (function (s, e, index) {

                s[index].addEventListener(e.e, e.func, false);

            })(selector, item, j);

        }

    }

    Banner.Events.items = [];

};