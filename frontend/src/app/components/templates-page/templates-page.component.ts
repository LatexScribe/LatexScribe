import { Component, OnInit } from '@angular/core';
import { DocumentsService } from '../../service/documents/documents.service';
import { Template } from '../../models/template.model';
import axios from 'axios';
import { AuthenticationService } from '../../service/authentication/authentication.service';
@Component({
  selector: 'app-templates-page',
  templateUrl: './templates-page.component.html',
  styleUrl: './templates-page.component.css'
})
export class TemplatesPageComponent implements OnInit{

  template_categories=["ACADEMIC_JOURNAL", "BIBLIOGRAPHY","BOOK","CALENDER","RESUME","FORMAL_LETTER","HOMEWORK_ASSIGNMENT","NEWSLETTER","POSTER", "PRESENTATION","PROJECT", "THESIS"]
  templates: Template[] =[];

  constructor(private service: DocumentsService,private authservice: AuthenticationService ) {  }

  ngOnInit(): void {
    this.service.getTemplates().then((templates: Template[]) => {
      this.templates = templates;
    });
  }


   filterTemplatesByCategory(cat:string){
    let res: Template[]=[];
    for(var i=0;i<this.templates.length;i++){
      console.log(cat)
      console.log(this.templates[i].category)
      if(this.templates[i].category==cat){
        res.push(this.templates[i]);
      }
    }
    return res;
  }

}
