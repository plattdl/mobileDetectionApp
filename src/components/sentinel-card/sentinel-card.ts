import { Component, Input, OnInit } from '@angular/core';
import { SentinelScene } from "../../core/sentinelScene";
import {
  NavController,
  NavParams
} from 'ionic-angular';
import { MapPreviewPage } from "../../pages/map-preview/map-preview";
import { SentinelTwoService } from "../../services/sentinelTwo.service";
/*
  Generated class for the SentinelCard component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'sentinel-card',
  templateUrl: 'sentinel-card.html'
})
export class SentinelCardComponent implements OnInit {
  @Input() item: SentinelScene
  isLoaded: boolean

  constructor(public navCtrl: NavController, public navParams: NavParams, private sentinelTwo: SentinelTwoService) {
    this.isLoaded = false;
  };

  //async get request for tileInfo.json file to fill out object properties
  ngOnInit(){
    this.sentinelTwo.getTileInfo(this.item.tileInfoUri).subscribe(results => {
      //save object properties once we have the result information
      this.item.tileCoverage = results.dataCoveragePercentage;
      this.item.cloudCover = results.cloudyPixelPercentage;

      //get epsg code
      let split = results.tileGeometry.crs.properties.name.split(':');
      this.item.epsg = Number(split[split.length -1]);

      //get extents [LEFT,RIGHT,BOTTOM,TOP]
      let LL = results.tileGeometry.coordinates[0][0];
      let TR = results.tileGeometry.coordinates[0][2];
      this.item.extXmin = LL[0];
      this.item.extXmax = TR[0];
      this.item.extYmin = LL[1];
      this.item.extYmax = TR[1];
      this.item.extCoordinates = results.tileGeometry.coordinates;
      this.item.utmZone = results.utmZone;
    });
  };
  
  //simple function for flagging if our image has been loaded
  loaded(){
    this.isLoaded = true;
  };

  //send to map to preview on a map
  preview() {
    this.navCtrl.push(MapPreviewPage, {
      data: this.item
    });
  };
}
