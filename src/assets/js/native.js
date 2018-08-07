function window_obj() {
    window_obj.prototype.language = function() {
        return window.myjs ? window.myjs.getLanguage() : "en";
    }
    window_obj.prototype.ip = function() {
        return window.myjs ? window.myjs.getIp() : "http://183.6.57.161:9995";
        //return window.myjs ? window.myjs.getIp() : "http://192.168.11.128:9995";
    }
    window_obj.prototype.cookies = function() {
        return window.myjs ? window.myjs.getCookie() : sessionStorage.getItem('JSESSIONID');
    }
    window_obj.prototype.defaultCompanyId = function() {
        return window.myjs ? window.myjs.defaultCompanyId() : sessionStorage.getItem('defaultCompanyId');
    }
    window_obj.prototype.relation = function() {
        return window.myjs ? window.myjs.relation() : sessionStorage.getItem('relation');
    }
}