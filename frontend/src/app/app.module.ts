import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { TemplatesPageComponent } from './components/templates-page/templates-page.component';
import { TemplatesCategoriesPageComponent } from './components/templates-categories-page/templates-categories-page.component';
import { SelectedTemplatePageComponent } from './components/selected-template-page/selected-template-page.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { LatexParagraphComponent } from './components/latex-paragraph/latex-paragraph.component';
import { LatexEditorComponent } from './components/latex-editor/latex-editor.component';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ProjectTableComponent } from './components/project-table/project-table.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import {MatCardModule} from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';





@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent,
    LandingPageComponent,
    MainPageComponent,
    TemplatesPageComponent,
    TemplatesCategoriesPageComponent,
    SelectedTemplatePageComponent,
    ProjectPageComponent,
    LatexParagraphComponent,
    LatexEditorComponent,
    ProjectTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CodemirrorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSelectModule,
    MatChipsModule,
    MatCardModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    FormsModule,
    MatSortModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
