function window_obj() {
    window_obj.prototype.language = function() {
        return window.myjs ? window.myjs.getLanguage() : "en";
    }
    window_obj.prototype.ip = function() {
        // return window.myjs ? window.myjs.getIp() : "http://183.6.57.161:8016";
        return window.myjs ? window.myjs.getIp() : "http://192.168.11.84:9999";
        // return window.myjs ? window.myjs.getIp() : "http://192.168.11.116:8080";
    }
    window_obj.prototype.cookies = function() {
        return window.myjs ? window.myjs.getCookie() : "";
    }
}