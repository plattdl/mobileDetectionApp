import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SentinelScene } from "../../core/sentinelScene";
import { EsriLoaderService } from 'angular2-esri-loader';
import proj4 from 'proj4';

/*
  Generated class for the MapPreview page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map-preview',
  templateUrl: 'map-preview.html',
  providers: [ EsriLoaderService ]
})
export class MapPreviewPage {
  @ViewChild('map') mapEl: ElementRef;

  item: SentinelScene
  constructor(public navCtrl: NavController, public navParams: NavParams, private esriLoader: EsriLoaderService) {}


  ngOnInit() {
    let latitude: number = 0, longitude: number = 0, map: any = null, MapPoint: any = null;

    this.esriLoader.load({
      url: 'https://js.arcgis.com/3.19/'
    }).then(() => {
      this.esriLoader.loadModules(
        ['esri/map', 
        'esri/layers/MapImage', 
        'esri/layers/MapImageLayer', 
        'esri/geometry/webMercatorUtils',
        'esri/geometry/Point',
        'esri/SpatialReference']).then((
        [Map, 
        MapImage, 
        MapImageLayer, 
        webMercatorUtils,
        Point,
        SpatialReference]) => {
       
        //get scene info that is being passed in
        this.item = this.navParams.get('data');

        // create the map at the DOM element in this component
        let map = new Map(this.mapEl.nativeElement, {
          center: [-118, 34.5],
          zoom: 8,
          basemap: "topo"
        });
        let convert = proj4('+proj=utm +zone=10 +ellps=WGS84 +datum=WGS84 +units=m +no_defs','+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs');

        let mil = new MapImageLayer({});

        let LL = [this.item.extXmin, this.item.extYmin];
        let TR = [this.item.extXmax, this.item.extYmax];
        let convertedLL = convert.forward(LL);
        let convertedTR = convert.forward(TR);
        
        let mi = new MapImage({
          'extent': { 'xmin': convertedLL[0], 'ymin': convertedLL[1], 'xmax': convertedTR[0], 'ymax': convertedTR[1], 'spatialReference': { 'wkid': 3857 }},
          'href': this.item.thumbnailUri
        });
        
        // let mi = new MapImage({
        //   'extent': { 'xmin': this.item.extXmin, 'ymin': this.item.extYmin, 'xmax': this.item.extXmax, 'ymax': this.item.extYmax, 'spatialReference': { 'wkid': 102100 }},
        //   'href': this.item.thumbnailUri
        // });

        mil.addImage(mi);
        //add to our map
        map.addLayer(mil);
        //This isnt working right now. We need to check to see if the extent is actually right.
        // If extent is right, then lets just zoom to a point instead. -- Dan
        map.setExtent(mi.extent);
      });

    });

  }
}
