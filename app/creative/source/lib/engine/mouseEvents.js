Banner.mouseEvents = {
    
    items: [],
    
    init: function () {
        
        var items = Banner.mouseEvents.items;
        
        for (var i = 0; i < items.length; i++) {
            
            var item = items[i];
            
            (function (e) {
                document.getElementById(e.el).addEventListener(e.e, e.func, false);
            })(item);
            
        }
        
    }
    
};