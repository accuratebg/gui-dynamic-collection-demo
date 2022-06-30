import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.scss']
})
export class PersonalInformationComponent implements OnInit {
  dynamicFieldData: any = [];
  saveDynamicDataObj: any = [];
  saveDynamicData: any;
  //personalInformationForm: any;

  constructor(private router: Router, public http: HttpClient, private spinner: NgxSpinnerService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getDynamicData();
  }

  onSubmit(data:any) {
    this.spinner.show();
    //this.saveDynamicDataObj;
    //console.log(data);
    //this.personalInformationForm;
    let dataPoints = [];
    for (const [key, value] of Object.entries(this.saveDynamicDataObj)) {
      console.log(key, value);
      let pushValues = {
        field: key,
        value: value,
        productSKUs: [
          "string"
        ]
      };
      dataPoints.push(pushValues);
    }

    let obj = {
      referenceId: "abcdefgh",
      platform: "ACCEL",
      dataPoints: dataPoints,
      application: "string"
    };
    //let strObj = JSON.stringify(obj);
    //var formData: any = new FormData();
    //formData.append("documentSessionStepRequest", strObj);
    //return;
    
    let url = "https://biz-search-requirements.dev.ablocal.io/v1/data";
    this.http.post(url, obj).subscribe((response:any) => {      
        console.log(response);
        this.cookieService.put('redirectedFrom', 'pii');
        this.router.navigateByUrl('/document-list');
        //this.changeDetection.detectChanges();
        this.spinner.hide();
      }, function(error){
        console.log(error);
        this.spinner.hide();
      });
  }

  getDynamicData() {
    let obj = {
      "companyCodes": [
        "TEST12121212"
      ],
      "dataType": "FIELD",
      "locale": "string",
      "locations": [
        {
          "country": "B",
          "locationType": "A",
          "region": "A",
          "region2": "A"
        }
      ],
      "platform": "string",
      "products": [
        "string"
      ],
      "referenceId": "string",
      "whoNeedsToInteract": "CANDIDATE"
    };

    let obj1 = {
      "referenceId":"abcdefgh",
      "companyCodes":[
         "TEST_COMPANY"
      ],
      "products":[
         "TEST_SKU"
      ],
      "platform":"ACCEL",
      "whoNeedsToInteract":"CANDIDATE",
      "locations":[
         {
            "country":"IND",
            "region":"TU",
            "region2":"BE",
            "locationType":"KA"
         }
      ]
   };
   
    //this.http.get('data/personal-information-data.json').subscribe((response:any) => {
    this.http.post('https://biz-search-requirements.dev.ablocal.io/v1/requirements', obj1).subscribe((response:any) => {
      
      setTimeout(() => {
        this.dynamicFieldData = response.fields;
        console.log(this.dynamicFieldData);
        this.spinner.hide();
      }, 500);
    }, function(error){
      console.log(error);
      this.spinner.hide();
    });
  }

}
