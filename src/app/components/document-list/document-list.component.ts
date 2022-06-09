import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.scss']
})
export class DocumentListComponent implements OnInit {
  documents: any = [];
  id: any = '';

  constructor(public http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getTaskLists();
  }

  getTaskLists() {
    this.http.get('data/documentList.json').subscribe((res) => {
      this.documents = res;
      console.log(this.documents);
    });
  }

  collectDocument(document: any){
    console.log(document);
    this.router.navigateByUrl('/documents/'+ document.id);
  } 

}