import { Component, OnInit, ViewChild, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
//(<any>window).pdfWorkerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';

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
  signatureImage:any;
  selectStaticToken:any = false;
  pdfSrc: any = '';
  pdfSrcHardCoded: any = '';
  showPdfView: any = false;

  public dynamicForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private router: Router, public http: HttpClient, private changeDetection: ChangeDetectorRef, private spinner: NgxSpinnerService, private cookieService: CookieService) { }

  ngOnInit(): void {
    console.log(this.dynamicFormData);
    this.dynamicFieldData = this.dynamicFormData;
    pdfDefaultOptions.assetsFolder = 'assets';

    this.pdfSrcHardCoded = '/data/F_Australia_AFP_Form.pdf';
    // if(this.dynamicFieldData.category == "PROOF_OF_ID"){
    //   this.showSubmitBtn = true;
    // }
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
      let obj = {};
      if(control.step == "STATIC_TOKEN_COLLECTION_STEP"){
        obj = {
          step: "STATIC_TOKEN_COLLECTION_STEP",
          sequence: "1",
          tokens:[{
            token: "Current Family Name",
              value: "SHIVA"
            },
            {
              token: "All Given Names",
              value: "RAM"
            },
            {
              token: "Place of Birth Town",
              value: "TUMKUR"
            },
            {
              token: "Country",
              value: "INDIA"
            },
            {
              token: "State",
              value: "KARNATAKA"
            },
            {
              token: "Post Code",
              value: "572 103"
            }
          ]
        };

      } else {
        obj = {
          step: "CHOOSE_NATIONALITY",
          sequence: "1",
          values: [this.saveDynamicDataObj.nationality]
        };
      }
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

    } else if(control.sequence == 2 || control.sequence == 3) {
      let obj = {};
      if(control.step == "SIGNATURE_COLLECTION_STEP"){
        obj = {
          step: "SIGNATURE_COLLECTION_STEP",
          sequence: "2",
          values:["1"],
          metadata:{"documentType":"OTHR"}
        };
      } else {
        obj = {
          step: "GROUP1_DOCUMENT_SELECTION",
          sequence: "2",
          values: [this.saveDynamicDataObj.values],
          productSKUs: ["A","B","C"],
          metadata: { documentType: "OTHR" }
        };
      }

      let strObj = JSON.stringify(obj);
      var formData: any = new FormData();
      //formData.append("file", this.saveDynamicDataObj.documentName);
      //formData.append("file", fileBrowser.files[0]);
      if(control.step == "SIGNATURE_COLLECTION_STEP"){
        formData.append("file", this.signatureImage);
      } else {
        const fileBrowser = this.fileInput.nativeElement;
        formData.append("file", fileBrowser.files[0]);
      }
      
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
          this.spinner.hide();
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
    }, (error)=>{
      console.log(error);
      this.spinner.hide();
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
    //this.cookieService.put('redirectedFrom', 'documentPage');
    //var redirectedFrom = this.cookieService.get('redirectedFrom');
    this.router.navigateByUrl('/document-list');
  }

  ParentComponent(data:any) {
    console.log(data); // this data of child will show in parent console window 
    this.signatureImage = data;
    if(this.signatureImage) {
      this.showSubmitBtn = true;
    } else {
      this.showSubmitBtn = false;
    }
  }

  selectStaticTokenFn(event:any){
    this.selectStaticToken = !this.selectStaticToken;
    if(this.selectStaticToken) {
      this.showSubmitBtn = true;
    } else {
      this.showSubmitBtn = false;
    }
  }

  getPdfFile(file: any){
    //this.pdfSrc = new Uint8Array(file);

    // let pdfSrc = new Blob([file], { type: 'application/pdf' });            
    // var fileURL = URL.createObjectURL(pdfSrc);
    // this.pdfSrc = fileURL;
    //this.pdfSrc = '';
    var binary_string = window.atob(file);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i <len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    this.pdfSrc = file;
    if(file){
      this.showPdfView = true;
    }
    console.log(this.pdfSrc);

    // var blob = new Blob([file], {type: "application/pdf"});
    // var link = document.createElement("a");
    // link.href = window.URL.createObjectURL(blob);
    // link.download = "myFileName.pdf";
    // link.click();
  }

}