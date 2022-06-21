import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie';

interface JsonFormValidators {
  min?: number;
  max?: number;
  required?: boolean;
  requiredTrue?: boolean;
  email?: boolean;
  minLength?: boolean;
  maxLength?: boolean;
  pattern?: string;
  nullValidator?: boolean;
}

interface JsonFormControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

interface dynamicFormControls {
  name: string;
  label: string;
  value: string;
  type: string;
  options?: JsonFormControlOptions;
  required: boolean;
  validators: JsonFormValidators;
}


export interface dynamicFormData {
  controls: dynamicFormControls[];
}

@Component({
  selector: 'app-dynamic-documents',
  templateUrl: './dynamic-documents.component.html',
  styleUrls: ['./dynamic-documents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DynamicDocumentsComponent implements OnChanges, OnInit {
  @ViewChild('fileInput') fileInput: any;
  @Input() dynamicFormData?: dynamicFormData;
  dynamicFieldData:any;
  selectedOption:any = false;
  showUploadBtn: boolean = false;
  hideme:any = {};
  saveDynamicDataObj:any = {};
  redirectToNext = false;
  completedDocument:any;
  showSubmitBtn: boolean = false;
  selectedLabelName:any;
  selectedOptionValue:any = {};

  public dynamicForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private router: Router, public http: HttpClient, private changeDetection: ChangeDetectorRef, private spinner: NgxSpinnerService, private cookieService: CookieService) { }

  ngOnInit(): void {
    console.log(this.dynamicFormData);
    this.dynamicFieldData = this.dynamicFormData;
  }
  ngOnChanges(changes: SimpleChanges) {
    // if (!changes.dynamicFormData.firstChange) {
    //   this.createForm(this.dynamicFormData.controls);
    // }
  }

  createForm(controls: dynamicFormControls[]) {
    for (const control of controls) {
      const validatorsToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'min':
            validatorsToAdd.push(Validators.min(value));
            break;
          case 'max':
            validatorsToAdd.push(Validators.max(value));
            break;
          case 'required':
            if (value) {
              validatorsToAdd.push(Validators.required);
            }
            break;
          case 'requiredTrue':
            if (value) {
              validatorsToAdd.push(Validators.requiredTrue);
            }
            break;
          case 'email':
            if (value) {
              validatorsToAdd.push(Validators.email);
            }
            break;
          case 'minLength':
            validatorsToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorsToAdd.push(Validators.maxLength(value));
            break;
          case 'pattern':
            validatorsToAdd.push(Validators.pattern(value));
            break;
          case 'nullValidator':
            if (value) {
              validatorsToAdd.push(Validators.nullValidator);
            }
            break;
          default:
            break;
        }
      }

      this.dynamicForm.addControl(
        control.name,
        this.fb.control(control.value, validatorsToAdd)
      );
    }
  }
  
  onSubmit(control:any) {
    this.spinner.show();
    console.log('Form valid: ', this.dynamicForm.valid);
    console.log(this.saveDynamicDataObj);
    let url = "https://biz-search-requirements.dev.ablocal.io/v1/document-session/" + this.dynamicFieldData.id + "/step/save";
    //let dummyUrl = 'data/sequence-1.json';
    if(control.sequence == 1){
        let obj = {
          step: "CHOOSE_NATIONALITY",
          sequence: "1",
          values: [this.saveDynamicDataObj.nationality]
        };
        let strObj = JSON.stringify(obj);
        var formData: any = new FormData();
        formData.append("documentSessionStepRequest", strObj);
        console.log();
        this.http.post(url, formData).subscribe((response:any) => {
        //this.http.get('data/sequence-1.json').subscribe((response:any) => {
          console.log(response);
          this.showSubmitBtn = false;
          this.refreshDocumentUploadSTeps();
          //this.dynamicFieldData = response.nextStep;
         // this.completedDocument = response.currentStep;
          this.changeDetection.detectChanges();
        }, function(error){
          console.log(error);
        });

    } else if(control.sequence == 2 || control.sequence == 3){
      let obj = {
        step: "GROUP1_DOCUMENT_SELECTION",
        sequence: "2",
        values: [this.saveDynamicDataObj.values],
        productSKUs: ["A","B","C"],
        metadata: { documentType: "OTHR" }
      };
      let strObj = JSON.stringify(obj);

      const fileBrowser = this.fileInput.nativeElement;
      var formData: any = new FormData();
      //formData.append("file", this.saveDynamicDataObj.documentName);
      formData.append("file", fileBrowser.files[0]);
      formData.append("documentSessionStepRequest", strObj);

      /*const httpOptions = {
          headers: new HttpHeaders({
          'Content-Type':  'multipart/form-data'
        })
      };*/

      this.http.post(url, formData).subscribe((response: any) => {
        console.log(response);
          //this.dynamicFieldData = response.nextStep;
          //this.completedDocument = response.currentStep;
          this.refreshDocumentUploadSTeps();
          this.changeDetection.detectChanges();
      }, function(error){
          console.log(error);
      });
      
    }
  }

  refreshDocumentUploadSTeps() {
    this.http.get('https://biz-search-requirements.dev.ablocal.io/v1/document-session/' + this.dynamicFieldData.id).subscribe((res) => {
      this.selectedOption = false;
      this.showSubmitBtn = false;
      this.dynamicFieldData = res;
      console.log(this.dynamicFieldData);
      this.spinner.hide();
      this.changeDetection.detectChanges();
    });
  }

  displaySaveBtn(){
    this.showSubmitBtn = true;
  }

  selectOptions(obj: any){
    this.selectedOption = true;
    this.saveDynamicDataObj.values = obj.value;
    this.selectedLabelName = obj.displayLabel;
    this.showSubmitBtn = true;
    console.log('value is ' + this.selectedOption);
    console.log(this.saveDynamicDataObj);
    if(obj){
      delete this.saveDynamicDataObj.documentName;
    }
    this.showUploadBtn = true;
  }

  getFieldErrorClass(fieldName: any){
    if(fieldName){
      //return 'form-error';
    }
  }

  goToNext(){
    this.cookieService.put('redirectedFrom', 'documentPage');
    this.router.navigateByUrl('/document-list');
  }

}