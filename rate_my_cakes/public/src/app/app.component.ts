import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  cakes: [];
  oneCake: any;
  newCake: any;
  newReview: any;
  cakeInfo: any;
  average = 0;
  cakeToPass: any;

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getCakesFromService();
    this.newCake = { bakerName: "", cakeImage: "" }
    this.newReview = { rating: "", comment: "" }
  };

  getCakesFromService() {
    let observable = this._httpService.getCakes();
    observable.subscribe(res => {
      console.log(res);
      this.cakes = res['data'];
    });
  };

  onNewReviewSubmit(_id) {
    console.log("**onNewReview Submit**", this.newReview.rating)
    let observable = this._httpService.makeReview(_id, this.newReview);
    observable.subscribe(data => {
      console.log("Successfully added review!", data);
      this.getCakesFromService();
      this.newReview = { rating: "", comment: "" };
      this.onButtonClickParam(_id)
      // console.log("Getting the Average", data)
      // console.log("Average", data["data"])
      
      var sum = 0;
      for (let rating of data['data'].reviews){
        console.log("rating", rating.rating)
        sum += rating.rating
      }
      this.average = sum/data['data'].reviews.length
      console.log(this.average)
      this.passData()
    });
  };

  onNewCakeSubmit() {
    let observable = this._httpService.addCake(this.newCake);
    observable.subscribe(data => {
      console.log("Successfully added cake!", data);
      this.getCakesFromService();
      this.newCake = { bakerName: "", imageCake: "" };
    });
  };

  onButtonClickParam(id){
    let observable = this._httpService.getOneCakes(id)
    observable.subscribe(data => {
      console.log(data)
      // getting the average+
      var sum = 0;
      for (let rating of data['data'].reviews){
        console.log("rating", rating.rating)
        sum += rating.rating
        
      }
      // console.log("sum", sum)
      // console.log("rating.length", data['data'].reviews.length) // this is way to access the data schema. 

      // average = sum / array length
      this.average = sum/data['data'].reviews.length

      this.cakeInfo = data ['data']
      this.getCakesFromService()
      this.passData()
    })
  }

  passData(){
    this.cakeToPass = this.cakeInfo;
    this.cakeToPass.average = this.average;
  }
}
