import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {HttpServi} from '../../services/httpServi/httpServi';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  palabra="";
  twetts={};
  detalleTweet={};

  arrayTwetts=[];
  constructor(public navCtrl: NavController
  	,public httpServi: HttpServi) {    
  	this.httpServi.obtenerTokerTwitter().then((result:any) => {			
      this.httpServi.token={"token":result["access_token"]}   
		}, (error) => {
        console.log("ERROR: ", error);               
    });

  }

  buscarTwetts(){
    if(this.palabra.trim()==""){
      alert("Campo no puede ir vacio");
      return;
    }
    var data = {q:this.palabra};
    //let url= 'https://api.twitter.com/1.1/search/tweets.json?count=2&bearer='+this.httpServi.token["token"]+"&";
    let url= 'https://api.twitter.com/1.1/search/tweets.json?';
    this.httpServi.presente() ;   
    this.httpServi.getApiTwitter(url,data).then((result:any) => {
      this.arrayTwetts=result["statuses"];
      this.httpServi.cerrarCargador() ;                   
        // alert(JSON.stringify(result))             
    }, (error) => {
      this.httpServi.cerrarCargador() ;
      //alert(JSON.stringify(error))
      console.log("ERROR: ", error);
    });
  }

  detalleTwett(twe){
    var data = {id:twe.id_str};
    //let url= 'https://api.twitter.com/1.1/search/tweets.json?count=2&bearer='+this.httpServi.token["token"]+"&";
    let url= 'https://api.twitter.com/1.1/statuses/show.json?';
    this.httpServi.presente() ;   
    this.httpServi.getApiTwitter(url,data).then((result:any) => {
      twe.text=result["text"];
      this.httpServi.cerrarCargador() ;                   
         alert(JSON.stringify(result))             
    }, (error) => {
      this.httpServi.cerrarCargador() ;
      alert(JSON.stringify(error))
      console.log("ERROR: ", error);
    });
  }

  formatDate(dates) {
    let date= new Date(dates)
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minutes_cad = minutes < 10 ? '0'+String(minutes) : minutes;
    var strTime = hours + ':' + minutes_cad + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
  }
}
