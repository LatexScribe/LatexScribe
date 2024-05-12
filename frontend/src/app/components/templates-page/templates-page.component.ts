import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { DocumentsService } from '../../service/documents/documents.service';
import { Template } from '../../models/template.model';

@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrl: './templates-page.component.css'
})
export class TemplatesPageComponent implements OnInit{

  template_categories=["ACADEMIC_JOURNAL", "BIBLIOGRAPHY","BOOK","CALENDER","RESUME","FORMAL_LETTER","HOMEWORK_ASSIGNMENT","NEWSLETTER","POSTER", "PRESENTATION","PROJECT", "THESIS"]
  templates: Promise<Template[]> | undefined;

  constructor(private service: DocumentsService) {  }
  
  ngOnInit(): void {
    this.templates=this.service.getTemplates();
  }


  filterTemplatesByCategoryImitationFunc(cat:string): any{
    return  [new Template("123","Book template",15,"This is the content","BOOK","45USER4")];
  }

  filterTemplatesByCategory(cat:string){
   let  result=[];
    this.templates?.then(arr=>{
      for(var item of arr){
        if(item.templateCategory==cat)
          result.push(item);
      }

      if(result.length==0)return null;
      else
          return result;
    })
  }

   async getTemplates(): Promise<Template[]> {
   return this.service.getTemplatesByCategory("BOOK");
  }


}
