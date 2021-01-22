import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccessProviders {
    // url du backend de l'api json
    server: string = 'http://localhost/tutorial/api/'

    constructor(
        public http: HttpClient
      ) { }

      postData(body, file){
          let headers = new HttpHeaders({
              'Content-Type': 'application/json; charset=UTF-8'
          });
          Let options = {
              headers: headers
          }

          return this.http.post.(this.server + file, JSON.stringify(body), options)
          .timeout(59000) //un timeout de 59 secondes
          .map(res => res);
      }
}