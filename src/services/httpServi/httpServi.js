var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
//import {Http, Headers, RequestOptions} from "@angular/http";
import { Http } from "@angular/http";
import 'rxjs/Rx';
var HttpServi = (function () {
    function HttpServi(http) {
        this.http = http;
        this.server = "http://54.68.202.167/alr-user/";
        //this.http = http;    
    }
    HttpServi.prototype.obtenerServicio = function (url, body) {
        var _this = this;
        //let headers = new Headers({
        //	'Content-Type': 'application/json'
        //});
        //let options = new RequestOptions({
        //	headers: headers
        //});
        var urldef = "";
        var cont = 0;
        for (var key in body) {
            if (cont > 0) {
                urldef += "&";
            }
            urldef += key + "=" + body[key];
            cont++;
        }
        urldef = this.server + url + urldef;
        //console.log(urldef)
        return new Promise(function (resolve, reject) {
            //this.http.post(url, body, options).map(res => res.json()).subscribe(data => {
            //	 resolve(data.res);
            // }, error => {
            //	reject(error);
            //    console.log("Oooops!");
            //});
            _this.http.get(urldef).map(function (res) { return res.json(); }).subscribe(function (data) {
                resolve(data.res);
            }, function (error) {
                reject(error);
                console.log("Oooops!");
            });
        });
    };
    return HttpServi;
}());
HttpServi = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], HttpServi);
export { HttpServi };
//# sourceMappingURL=httpServi.js.map