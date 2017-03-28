import {
  Injectable
} from '@angular/core';
import {
    Http,
    URLSearchParams
} from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class SentinelTwoService {
  bucketName: string = "sentinel-s2-l1c";
  baseUrl: string = "https://sentinel-s2-l1c.s3.amazonaws.com";
  chromeUrl: string = "https://sentinel-s2-l1c.s3-website.eu-central-1.amazonaws.com/#";
  constructor(private http: Http) {}

  getTileInfo(path: string) {
    let params = new URLSearchParams();
    return this.http.get(path, {
      search: params
    }).map(res => res.json());
  };

  searchSentinel(prefix: string, delimiter:string): Observable<any> {
    let params = new URLSearchParams();
    params.append('delimiter',delimiter);
    params.append('prefix',prefix);
   
    return this.http.get(this.baseUrl, {
      search: params
    });
  }
  searchSentinelThumb(prefix: string): Observable<any> {
  let params = new URLSearchParams();
  params.append('delimiter','/');
  params.append('prefix',prefix);
   
    return this.http.get(this.baseUrl, {
        search: params
    });
  }

}
