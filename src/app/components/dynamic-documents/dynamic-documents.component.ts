import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

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
  @Input() dynamicFormData?: dynamicFormData;
  dynamicFieldData:any;
  selectedOption:any;
  showUploadBtn: boolean = false;
  hideme:any = {};
  saveDynamicDataObj:any = {};
  redirectToNext = false;

  public dynamicForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private router: Router, public http: HttpClient, private changeDetection: ChangeDetectorRef) { }

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

  onSubmit() {
    console.log('Form valid: ', this.dynamicForm.valid);
    console.log(this.saveDynamicDataObj);

    if(this.dynamicFieldData.step == 1){
      this.http.get('data/dynamic-documents-step-2.json').subscribe((res) => {
        this.dynamicFieldData = res;
        this.changeDetection.detectChanges();
        // console.log(this.dynamicFieldData);
      });
    } else if(this.dynamicFieldData.step == 2){
      this.http.get('data/dynamic-documents-step-3.json').subscribe((res) => {
        this.dynamicFieldData = res;
        this.changeDetection.detectChanges();
        // console.log(this.dynamicFieldData);
      });
    } else if(this.dynamicFieldData.step == 3){
      this.http.get('data/dynamic-documents-step-4.json').subscribe((res) => {
        this.dynamicFieldData = res;
        this.changeDetection.detectChanges();
        // console.log(this.dynamicFieldData);
        this.redirectToNext = true;
      });
    }
  }

  selectOptions(fileType: any, index: number){
    this.selectedOption = index;
    console.log('value is ' + this.selectedOption);
    console.log(this.saveDynamicDataObj);
    if(fileType){
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
    this.router.navigateByUrl('/document-list');
  }

}