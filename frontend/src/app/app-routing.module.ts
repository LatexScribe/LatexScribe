import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { SelectedTemplatePageComponent } from './components/selected-template-page/selected-template-page.component';
import { TemplatesCategoriesPageComponent } from './components/templates-categories-page/templates-categories-page.component';
import { TemplatesPageComponent } from './components/templates-page/templates-page.component';
import { LatexEditorComponent } from './components/latex-editor/latex-editor.component';


const routes: Routes = [
  { path: 'login', component: LogInComponent },
  { path: 'signup', component: SignUpComponent },
  {path:'',component:LandingPageComponent},
  {path:'mainpage',component:MainPageComponent},
  {path:'project',component:ProjectPageComponent},
  {path:"selectedtemplate/:id",component:SelectedTemplatePageComponent},
  {path:"selectedProject/:id",component:LatexEditorComponent},
  {path:'templates/categories', component:TemplatesCategoriesPageComponent},
  {path:'templates', component:TemplatesPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }