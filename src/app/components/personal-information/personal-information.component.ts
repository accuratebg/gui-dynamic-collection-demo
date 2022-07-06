import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,FormControl ,FormArray} from '@angular/forms';
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

  constructor(private router: Router, public http: HttpClient, private spinner: NgxSpinnerService, fb: FormBuilder, private cookieService: CookieService)
   { }

  ngOnInit(): void {
    this.spinner.show();
    this.getDynamicData();
  }
    
  arr: any = [];
  onCheckboxChange(i: number, field: any, event: any) {
    if (event.target.checked) {
      this.arr.push(event.target.value);
    } else {
      this.arr.splice(this.saveDynamicDataObj[field].indexOf(event.target.value), 1);
    }
    this.saveDynamicDataObj[field] = this.arr;
  }

  

   onSubmit(data:any) {
    this.spinner.show();
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
      referenceId: "REFID234",
      platform: "ACCEL",
      dataPoints: dataPoints,
      application: "string"
    };
    //let strObj = JSON.stringify(obj);
    //var formData: any = new FormData();
    //formData.append("documentSessionStepRequest", strObj);
    console.log(obj);
    
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
        "TEST12121219"
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

    let obj1 = {"companyCodes":["ACCU10123422"],"platform":"ACCEL","locale":"en_US","locations":[{"locationType":"SEARCH","country":"US","region":"NY","region2":"NY"}],"products":["INTCRM"], "referenceId": "REFID23421"};
    
   
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
