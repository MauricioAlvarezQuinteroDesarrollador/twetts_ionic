import {Injectable} from '@angular/core';  
import {LoadingController} from 'ionic-angular';
import {Http, Headers, RequestOptions} from "@angular/http";
//import {Http} from "@angular/http";
import 'rxjs/Rx';
declare const Buffer
@Injectable()
export class HttpServi {
	
	server:string="https://itolatam.co/alr-user/";	
	loading: any;
	token={"token":"123"};
	constructor(public http: Http
		,public loadingCtrl: LoadingController
		) {
   		//this.http = http;    
  	}

  	getApiTwitter(url,body){ 
  		let urldef="";
		let cont=0;
		for (var key in body) {  
			if(cont>0){
				urldef+="&";
			}
			urldef+=key+"="+encodeURIComponent(body[key]);

			cont++;            
        }
        
        let bearerheader= 'Bearer ' + this.token["token"];
       
        let headers = new Headers({
			"Authorization": bearerheader        	
		});
		let options = new RequestOptions({
			headers: headers,
			
		});
		urldef= url+urldef;
		//alert(urldef)
  		 return new Promise((resolve, reject) => {
  		 	
	        this.http.get(urldef,options).map(res => res.json()).subscribe(data => {
        		 resolve(data);
	        }, error => {
	        	reject(error);
	            console.log("Oooops!");
	        });	

  		 });    		
  	}

  	obtenerTokerTwitter(){
  		var key = 'j9WINxRN1ewnrLP8U0NnporcC';
		var secret = 'yv5tW6VelLYsA1T6BwIVExkPMnOifYFmUii6r54mmxIFRJG89q';
		var cat = key +":"+secret;
		var credentials = new Buffer(cat).toString('base64'); 
		
  		let headers = new Headers({
			"Authorization": "Basic " + credentials,
        	"Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
		});
		let options = new RequestOptions({
			headers: headers,
			params:{'grant_type': 'client_credentials'}
		});

		

		
  		 return new Promise((resolve, reject) => {
  		 	this.http.post('https://api.twitter.com/oauth2/token', {}, options).map(res => res.json()).subscribe(data => {
        		 resolve(data);
	        }, error => {
	        	reject(error);
	            console.log("Oooops!");
	        });
	      

  		 }); 
  	}

  	
  	presente() {
        this.loading = this.loadingCtrl.create({
            content: "Cargando..."
        });
        this.loading.present();
    }

    cerrarCargador(){
    	this.loading.dismiss();
    }
}