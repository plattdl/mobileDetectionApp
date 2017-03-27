import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { TestClass } from '../core/test';

@Injectable()
export class TestService {

    constructor(private http:Http) {  }


    getAlbums () : Observable<TestClass[]> {
        return this.http
               .get('http://jsonplaceholder.typicode.com/albums/1/photos')
               .map(response => response.json() as TestClass[]);
  }
}