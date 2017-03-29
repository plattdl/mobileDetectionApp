import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TestClass } from "../../core/test";

/*
  Generated class for the DataDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-data-detail',
  templateUrl: 'data-detail.html'
})
export class DataDetailPage {

item:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DataDetailPage');
    let data = this.navParams.get('data');
    this.item = data;
  }

}
