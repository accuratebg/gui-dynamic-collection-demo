import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { FileUploadModule } from 'ng2-file-upload';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DynamicDocumentsComponent } from './components/dynamic-documents/dynamic-documents.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DocumentUploadComponent,
    PageNotFoundComponent,
    DocumentListComponent,
    DynamicDocumentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
