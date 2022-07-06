import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { CookieService } from 'ngx-cookie';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  documents: any = [];
  id: any = '';

  constructor(public http: HttpClient, private router: Router, private spinner: NgxSpinnerService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.spinner.show();
    var completed = true;
    this.getTaskLists(completed);
  }

  getTaskLists(completed:any) {
    var redirectedFrom = this.cookieService.get('redirectedFrom');
    if(redirectedFrom == 'documentPage'){
     var url = 'data/documentList-uk-completed.json';
    } else if(redirectedFrom == 'pii'){
      var url = 'data/documentList-pi-completed.json';
    } else {
      var url = 'data/documentList.json';
    }
    this.http.get(url).subscribe((res) => {
      setTimeout(() => {
        this.cookieService.remove('redirectedFrom');
        this.documents = res;
        this.spinner.hide();
      }, 1000);
    });
  }

  collectDocument(document: any){
    if(document.type == 'document'){
      console.log(document);
      this.router.navigateByUrl('/documents/'+ document.id);
    } else if(document.type == 'data') {
      console.log(document);
      this.router.navigateByUrl('/personal-information/'+ document.id);
    }
  }

}