import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {
  public documents: any;

  constructor(public http: HttpClient, private router: Router) { }
  
  ngOnInit(): void {
    this.getDocuments();
  }

  getDocuments() {
    this.http.get('data/dynamic-documents-step-1.json').subscribe((res) => {
      this.documents = res;
      console.log(this.documents);
    });
  }

}
