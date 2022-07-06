import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-digital-signature',
  templateUrl: './digital-signature.component.html',
  styleUrls: ['./digital-signature.component.scss']
})
export class DigitalSignatureComponent implements OnInit {
  title = 'Please sign using your mouse if you are on a computer, or your finger on a mobile device';
  signatureImg:any;
  displaySignatureImg:any;
  showClearSignature:any;
  @ViewChild(SignaturePad) signaturePad!: SignaturePad;

  // Pass OutPut and EventEmitter
  @Output() ParentComponet:EventEmitter<any> = new EventEmitter()

  signaturePadOptions: Object = { 
    'minWidth': 2,
    'canvasWidth': 700,
    'canvasHeight': 150
  };

  constructor() { }

  ngOnInit(): void {
    this.showClearSignature = false;
  }

  
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 2); 
    this.signaturePad.clear(); 
  }

  drawComplete() {
    console.log(this.signaturePad.toDataURL());
    this.showClearSignature = true;
    this.savePad();
  }

  drawStart() {
    console.log('begin drawing');
  }

  clearSignature() {
    this.signaturePad.clear();
    this.showClearSignature = false;
    this.signatureImg = null;
    this.ParentComponet.emit(this.signatureImg)
  }

  savePad() {
    const base64Data = this.signaturePad.toDataURL('image/png');
    //this.signatureImg = base64Data;
    this.displaySignatureImg = base64Data;

    const data = atob(base64Data.substring('data:image/png;base64,'.length)),
    asArray = new Uint8Array(data.length);

    for (var i = 0, len = data.length; i < len; ++i) {
      asArray[i] = data.charCodeAt(i);
    }

    const digitalSignature = new Blob([asArray], { type: 'image/png' });
    this.signatureImg = digitalSignature;

    this.ParentComponet.emit(this.signatureImg)
  }

}
