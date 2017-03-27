import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TestClass } from "../../core/test";
import { DataDetailPage } from "../data-detail/data-detail";
import {
  SentinelTwoService
} from "../../services/sentinelTwo.service";
import { SentinelScene } from "../../core/sentinelScene";
/*
  Generated class for the DataList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-data-list',
  templateUrl: 'data-list.html'
})
export class DataListPage {
responseList: Array <any>;
itemList: Array <SentinelScene>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sentinelTwo: SentinelTwoService) {}

  ionViewDidLoad() {
    this.itemList = this.navParams.get('data');
    console.log('ionViewDidLoad DataListPage');
  }
  viewDataDetail(item:TestClass){
    console.log(item)
    this.navCtrl.push(DataDetailPage,
    {
     dataPushed: item
    });
  }
}
