import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SentinelScene } from "../../core/sentinelScene";
import { EsriLoaderService } from 'angular2-esri-loader';
import { proj4 } from 'proj4';

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

        let mil = new MapImageLayer({});

        let mi = new MapImage({
          'extent': { 'xmin': this.item.extXmin, 'ymin': this.item.extYmin, 'xmax': this.item.extXmax, 'ymax': this.item.extYmax, 'spatialReference': { 'wkid': this.item.epsg }},
          'href': this.item.thumbnailUri
        });

        //make polygon of our coordinates
        let LL = [this.item.extXmin, this.item.extYmin];
        let TR = [this.item.extXmax, this.item.extYmax];
        console.log(LL);
        //let convert = proj4('EPSG:' + String(this.item.epsg), 'EPSG:102100');
        //console.log(convert.forward(LL))
        console.log(LL);
        //add to our map
        //mil.addImage(mi);
        //map.addLayer(mil);
        //map.setExtent(mi.extent);
      });

    });

  }
}
