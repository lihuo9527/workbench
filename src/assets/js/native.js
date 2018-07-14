function window_obj() {
    window_obj.prototype.language = function() {
        return window.myjs ? window.myjs.getLanguage() : "cn";
    }
    window_obj.prototype.ip = function() {
        return window.myjs ? window.myjs.getIp() : "http://183.6.57.161:9995";
        // return window.myjs ? window.myjs.getIp() : "http://192.168.11.250:9999";
    }
    window_obj.prototype.cookies = function() {
        return window.myjs ? window.myjs.getCookie() : sessionStorage.getItem('JSESSIONID');
    }
    window_obj.prototype.defaultCompany = function() {
        return window.myjs ? window.myjs.defaultCompany() : sessionStorage.getItem('defaultCompany');
    }
    window_obj.prototype.typeCode = function() {
        return window.myjs ? window.myjs.typeCode() : sessionStorage.getItem('typeCode');
    }
}