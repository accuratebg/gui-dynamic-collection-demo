import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentListComponent } from './components/document-list/document-list.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { PersonalInformationComponent } from './components/personal-information/personal-information.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';


const routes: Routes = [
  { path: 'document-list', component: DocumentListComponent },
  { path: 'documents/:id', component: DocumentUploadComponent },
  { path: 'personal-information/:id', component: PersonalInformationComponent },
  { path: '',   redirectTo: '/document-list', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
  { path: 'example-pdf', component: ExamplePdfViewerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
