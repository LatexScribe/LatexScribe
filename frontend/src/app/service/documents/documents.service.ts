import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import axios from 'axios';
import { Template } from '../../models/template.model';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {

  api=axios.create({ baseURL: "http://localhost:8080/"  });
  constructor(private service: AuthenticationService) { }



  async getTemplate(id:number){
    let response= await this.api.request({
      method: "get",
      url: `/api/v1/templates/${id}`,
      headers: {
        Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`,
      },
    });

    return new Template(response.data.id,response.data.name,response.data.size,response.data.content,response.data.templateCategory,response.data.userId);

  }

  async getTemplates(){
   
    let response= await this.api.request({
      method: "get",
      url: "api/v1/templates",
      headers: {
        Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`,
      },
    });


    const dataArray: Template[] = response.data.map((item: any) => {
      // Assuming response data has id, name, and content properties
      return new Template(item.id, item.name, item.size, item.content,item.templateCategory,item.userId);
    });

     return dataArray;

  }

  async getTemplatesByCategory(category:string){
    
 
     let response= await this.api.request({
       method: "get",
       url: `api/v1/templates?category=${category}`,
       headers: {
         Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`,
       },
     });
     

     const dataArray: Template[] = response.data.map((item: any) => {
      // Assuming response data has id, name, and content properties
      return new Template(item.id, item.name, item.size, item.content,item.templateCategory,item.userId);
    });

     return dataArray;
   }
  
}
