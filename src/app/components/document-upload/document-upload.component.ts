import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {
  public documents: any;
  public sessionId: any;

  constructor(public http: HttpClient, private router: Router, private activeRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.activeRoute.queryParams.subscribe((qp) => {
      console.log('Get Router Params:', this.activeRoute.snapshot.params['id']);
      this.sessionId = this.activeRoute.snapshot.params['id'];
    });
  }
  
  ngOnInit(): void {
    this.spinner.show();
    this.getDocuments();
  }

  getDocuments() {
    //completed id - 62b05b0c67b9ca08366c6c9e
    this.http.get('https://biz-search-requirements.dev.ablocal.io/v1/document-session/' + this.sessionId).subscribe((res) => {
      this.documents = res;
      console.log(this.documents);
      this.spinner.hide();
    });
  }

}
