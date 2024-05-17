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

    return new Template(response.data.id,
      response.data.name,
      response.data.size,
      response.data.content,
      response.data.category,
      response.data.codeName,
      response.data.author,
      response.data.description,
      response.data.license);

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
      return new Template(item.id, item.name, item.size, item.content,item.category,item.codeName,item.author,item.description, item.license);
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
      return new Template(item.id, item.name, item.size, item.content,item.category,item.codeName,item.author,item.description, item.license);
    });

     return dataArray;
   }

   async createDocument(name:string,size:any,lastModified:string,content:string,template:any,tag:any){

    const api = axios.create({ baseURL: "http://localhost:8080/" });
    await api.request({
      method: "post",
      url: "api/v1/documents",
   data:   {
        "name": name,
        "size": size,
        "lastModified": lastModified,
        "content": content,
        "template": template,
        "tag": tag
    },
    headers: {
      Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`,
    },
    });
  }

  
}
