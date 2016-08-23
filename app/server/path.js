module.exports = function () {
    
    var PATH = {};

    // APP
    PATH.app = 'app';
    PATH.appServer = PATH.app + '/server';
    PATH.appSass = PATH.app + '/sass';
    PATH.appViews = PATH.app + '/views';
    PATH.appStatic = PATH.app + '/public';
    PATH.appStyles = PATH.appStatic + '/styles';
    PATH.appScripts = PATH.appStatic + '/scripts';


    // CREATIVE
    PATH.creative = 'creative';
    PATH.source = PATH.creative + '/source';
    PATH.banners = PATH.source + '/banners';
    PATH.styles = PATH.source + '/styles';

    return PATH;

};