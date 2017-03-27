import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TestClass } from "../../core/test";
import { DataDetailPage } from "../data-detail/data-detail";
import {
  SentinelTwoService
} from "../../services/sentinelTwo.service";
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
itemList: Array <any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private sentinelTwo: SentinelTwoService) {}

  ionViewDidLoad() {
    this.responseList = this.navParams.get('data');
    this.itemList = [];//init item list 
    for (let x in this.responseList) {
      let resp = this.responseList[x].Key[0];
      //add information that we want in the list for this scene
      this.itemList.push({
        jsonUri:resp,
        thumbnailUri: this.sentinelTwo.baseUrl + '/' +  resp.replace('tileInfo.json', 'preview.jpg'),
        metadataUri: this.sentinelTwo.baseUrl + '/' + resp.replace('tileInfo.json', 'metadata.xml')
      });
    };
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
