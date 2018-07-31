import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Injectable()
export class AppService {

    constructor(public http: HttpClient, private cookieService: CookieService, private router: Router, ) { }
    private params;
    private obj = new window_obj();

    ip() {
        return this.obj.ip();
    };
    up_date(arrays, data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                arrays.push(data[i]);
            }
        }
    };
    get_params() {
        return this.params;
    };
    set_params(params: any) {
        this.params = params;
    };
    get_speech() {
        return localStorage.getItem("speech");
    };
    http_get(url: string, boolean?: boolean) {
        let ip = this.ip() + url;
        if (boolean) {
            ip = url;
        }
        return this.http.get(ip, { withCredentials: true });
    };
    http_post(url: string, body: any, boolean?: boolean, contentType?: string) {
        let httpOptions;
        if (contentType) {
            httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }),
                withCredentials: true
            }
        } else {
            httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' }),
                withCredentials: true
            }
        }

        let ip = this.ip() + url;
        if (boolean) {
            ip = url;
            ip.slice
        }
        // console.log("body", body);
        return this.http.post(ip, body, httpOptions);
    };
    getStrLength(str) {
        if (str == null) return 0;
        if (typeof str != "string") {
            str += "";
        }
        return str.replace(/[^x00-xff]/g, "01").length;
    };
    isPoneAvailable(pone) {
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(pone)) {
            return false;
        } else {
            return true;
        }
    }
    messageBox(obj, message) {
        obj.msg = message;
        obj.state = true;
        obj.btnText = "OK";
    }
    accessControl(obj, page?) {
        if (obj.cookies()) {
            let exdate = new Date();
            exdate.setDate(exdate.getDate() + 2000);
            this.clearAllCookie();
            this.cookieService.set('JSESSIONID', obj.cookies(), exdate);

        }
        if (obj.relation() != "out_supplier" && obj.relation() != "internal" || !obj.defaultCompanyId()) {
            this.router.navigate(['not-bind']);
            return true;
        }
        if (obj.defaultCompanyId() && obj.relation() == "out_supplier" && page == "home" || obj.defaultCompanyId() && obj.relation() == "internal" && page == "notBind") {
            this.router.navigate(['/out/outSourcing']);
            return true;
        }
        if (obj.defaultCompanyId() && obj.relation() == "internal" && page == "outSourcing" || obj.defaultCompanyId() && obj.relation() == "internal" && page == "notBind") {
            this.router.navigate(['home']);
            return true;
        }
        return false;
    }
    clearAllCookie() {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (let i = keys.length; i--;)
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
    }
}
