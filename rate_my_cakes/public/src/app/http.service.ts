import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) { }

  getCakes() {
    return this._http.get('/cakes');
  }
  getOneCakes(_id) {
    return this._http.get('/cakes/' + _id);
  }

  addCake(newCake) {
    return this._http.post('/cakes', newCake);
  }

  makeReview(_id, makeReview){
    return this._http.put('/cakes/' + _id + '/reviews', makeReview);
  }



}
