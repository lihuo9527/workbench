import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable()
export class AppService {

    constructor(public http: HttpClient) { }
    private params;
    private obj = new window_obj();

    ip() {
        return this.obj.ip();
    }
    up_date(arrays, data) {
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                arrays.push(data[i]);
            }
        }
    }
    get_params() {
        return this.params;
    }
    set_params(params: any) {
        this.params = params;
    }
    get_speech() {
        return localStorage.getItem("speech");
    }
    http_get(url: string, boolean?: boolean) {
        let ip = this.ip() + url;
        if (boolean) {
            ip = url;
        }
        return this.http.get(ip);
    }
    http_post(url: string, body: any, boolean?: boolean) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' })
        }
        let ip = this.ip() + url;
        if (boolean) {
            ip = url;
        }
        console.log("body", body);
        return this.http.post(ip, body, httpOptions);
    }
}
