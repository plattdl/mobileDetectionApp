import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TestClass } from "../../core/test";
import { DataDetailPage } from "../data-detail/data-detail";

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
itemList: Array<TestClass>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    this.itemList = this.navParams.get('test');
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
