import {
  Component
} from '@angular/core';
import {
  NavController,
  NavParams
} from 'ionic-angular';

import moment from 'moment';
import {
  DataListPage
} from "../data-list/data-list";
import {
  TestService
} from "../../services/test.service";
import {
  SentinelTwoService
} from "../../services/sentinelTwo.service";
import * as xml2js from "xml2js"
import { SentinelScene } from "../../core/sentinelScene";
/*
  Generated class for the Run page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-run',
  templateUrl: 'run.html'
})
export class RunPage {

  startDate: string;
  endDate: string;
  cloudCover: number;
  location: string;
  prefix: string;

  searchResults: Array < any > ;
  sentinelScenes: Array < SentinelScene > ;
  sentResults: Array < any > ;
  delimiter: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private testService: TestService, private sentinelTwo: SentinelTwoService) {}

  ionViewDidLoad() {
    this.prefix = "tiles/10/S/DG/2017/1/";
    this.delimiter = "qi";
    console.log('ionViewDidLoad RunPage');
    this.endDate = moment().toISOString();
    this.startDate = moment().subtract(7, 'days').toISOString();
    this.cloudCover = 20;
    this.location = 'Boulder';
    this.sentinelScenes = [];
  }
  search() {
    this.sentinelTwo.searchSentinel(this.prefix,this.delimiter).subscribe(results => {
      let body = results.text()
      xml2js.parseString(body, (err, results) => {
        this.searchResults = results.ListBucketResult.Contents.filter(item => {
          let itemKey:string = item.Key[0];
          if (itemKey.endsWith('preview.jpg')){
            return itemKey;
          }
        });
       this.searchResults.forEach(element => {
        let newScene = new SentinelScene() 
        newScene.thumbnail = this.sentinelTwo.baseUrl + '/'+  element.Key
         this.sentinelScenes.push(newScene);
       }); 
        this.navCtrl.push(DataListPage, {
          data: this.sentinelScenes
        });
      });
    });
  }
}
