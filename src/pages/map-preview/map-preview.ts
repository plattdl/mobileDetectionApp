import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SentinelScene } from "../../core/sentinelScene";
import { EsriLoaderService } from 'angular2-esri-loader';

//not same functions from geodesy docs, looka t the typing interface
//that is present in node_models/@types/geodesy
import { LatLonEllipsoidal, Mgrs, Utm } from 'geodesy';

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
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private esriLoader: EsriLoaderService) {};

  ngOnInit() {

    this.esriLoader.load({
      url: 'https://js.arcgis.com/3.19/'
    }).then(() => {
      this.esriLoader.loadModules(
        ['esri/map', 
         'esri/layers/MapImage', 
         'esri/layers/MapImageLayer',
         'esri/geometry/Point',
         'esri/SpatialReference']).then((
        [Map, 
         MapImage, 
         MapImageLayer,
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


        let LL = new Utm(this.item.utmZone, this.item.hemisphere, this.item.extXmin, this.item.extYmin).toLatLonE();
        let TR = new Utm(this.item.utmZone, this.item.hemisphere, this.item.extXmax, this.item.extYmax).toLatLonE();
        
        let mil = new MapImageLayer({});

        let mi = new MapImage({
          'extent': { 'xmin': LL.lon, 'ymin': LL.lat, 'xmax': TR.lon, 'ymax': TR.lat, 'spatialReference': { 'wkid': 4326 }},
          'href': this.item.thumbnailUri
        });
        
        // let mi = new MapImage({
        //   'extent': { 'xmin': this.item.extXmin, 'ymin': this.item.extYmin, 'xmax': this.item.extXmax, 'ymax': this.item.extYmax, 'spatialReference': { 'wkid': 4326 }},
        //   'href': this.item.thumbnailUri
        // });

        mil.addImage(mi);
        //add to our map
        map.addLayer(mil);
        //This isnt working right now. We need to check to see if the extent is actually right.
        // If extent is right, then lets just zoom to a point instead. -- Dan
        map.centerAndZoom(Point([ 0.5*(LL.lon + TR.lon), 0.5*(LL.lat + TR.lat)], SpatialReference({ 'wkid': 4326 })), 7);
      });

    });
  };

  //once map is loaded, then lets add soemthing to it
  loaded() {
    console.log('loaded map');
  };
}
