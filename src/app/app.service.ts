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
        return this.http.get(ip);
    };
    http_post(url: string, body: any, boolean?: boolean,contentType?:string) {
        let httpOptions;
        if(contentType){
            httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' })
            }
        }else{
            httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' })
            }
        }
  
        let ip = this.ip() + url;
        if (boolean) {
            ip = url;
        }
        // console.log("body", body);
        return this.http.post(ip, body, httpOptions);
    };
    getStrLength(str){
        if (str == null) return 0;
        if (typeof str != "string"){
              str += "";
        }
        return str.replace(/[^x00-xff]/g,"01").length;
      };
    isPoneAvailable(pone) {
        let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(pone)) {
            return false;
        } else {
            return true;
        }
    }
    MessageBox(){

    }
}
