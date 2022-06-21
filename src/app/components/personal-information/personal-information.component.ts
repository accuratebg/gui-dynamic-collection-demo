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

  constructor(private router: Router, public http: HttpClient, private spinner: NgxSpinnerService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getDynamicData();
  }

  onSubmit(data:any) {
    this.saveDynamicDataObj;
    console.log(data);
    this.cookieService.put('redirectedFrom', 'pii');
    this.router.navigateByUrl('/document-list');
  }

  getDynamicData() {
    this.http.get('data/personal-information-data.json').subscribe((res) => {
      console.log(this.dynamicFieldData);
      setTimeout(() => {
        this.dynamicFieldData = res;
        this.spinner.hide();
      }, 1000);
    });
  }

}
