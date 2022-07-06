import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { FileUploadModule } from 'ng2-file-upload';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DynamicDocumentsComponent } from './components/dynamic-documents/dynamic-documents.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { DigitalSignatureComponent } from './components/digital-signature/digital-signature.component'; 
import { SignaturePadModule } from 'angular2-signaturepad';
import { MustMatchDirective } from './directives/must-match.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DocumentUploadComponent,
    PageNotFoundComponent,
    DocumentListComponent,
    DynamicDocumentsComponent,
    PersonalInformationComponent,
    DigitalSignatureComponent,
    MustMatchDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CookieModule.withOptions(),
    SignaturePadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
