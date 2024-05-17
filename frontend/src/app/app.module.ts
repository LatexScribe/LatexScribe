import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CodemirrorModule

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
