import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import axios from 'axios';
import { Template } from '../../models/template.model';
import { ProjectDataExtended } from '../../models/project-data-extended';
import { Customdoc } from '../../models/customdoc.model';
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

  async getDocumentById(id: string) {
    try {
      const url = `/api/v1/documents/${id}`;
      const response = await this.api.request({
        method: 'get',
        url: url,
        headers: {
          Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`
        }
      });
  
      if (response.status === 200) {
        console.log('Document retrieved successfully:', response.data);
        return response.data;
      } else if (response.status === 404) {
        console.error('Document not found.');
        return null;
      } else {
        console.error('Failed to retrieve document.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving document:', error);
      return null;
    }
  }

  async getDocumentByIdG(id:number){

    const api = axios.create({ baseURL: "http://localhost:8080/" });
    const response=await api.request({
      method: "get",
      url: `api/v1/documents/${id}`,
   
    headers: {
      Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`,
    },
    });
    return new Customdoc(response.data.id,response.data.name,response.data.size,response.data.lastModified,response.data.content,response.data.template,response.data.tag);
  }


  async getDocumentByName(name?: string) {
    try {
      const url = '/api/v1/documents' + (name ? `?name=${name}` : '');
      const response = await this.api.request({
        method: 'get',
        url: url,
        headers: {
          Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`
        }
      });
  
      if (response.status === 200) {
        console.log('Document retrieved successfully:', response.data);
        return response.data;
      } else {
        console.error('Failed to retrieve documents.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving documents:', error);
      return null;
    }
  }

  async deleteDocument(id: string){
    try {
      const response = await this.api.request({
        method: 'delete',
        url: `api/v1/documents/${id}`,
        headers: {
          Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`
        }
      });
  
      if (response.status === 200) {
        console.log(`Document with ID ${id} deleted successfully.`);
      } else {
        console.error('Failed to delete document.');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  }

  async getDocuments2(){
    let response = await this.api.request({
      method: 'get',
      url: 'api/v1/documents',
      headers: {
        Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  }


  async getDocuments(){
    let response= await this.api.request({
      method: "get",
      url: 'api/v1/documents',
      headers: {
        Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`,
        'Content-Type': 'application/json', 
      },
    });

    console.log("noow");
    console.log(response.data);
    console.log("the end");
    const dataArray: ProjectDataExtended[] = response.data.map((item: any) => {
      return new ProjectDataExtended(item.id, item.name,
        item.size,
        item.lastModified,
        item.content,
        item.template,
        (item.tag != null) ? item.tag.id : null,
        (item.tag != null) ? item.tag.name : null);
   });

    return dataArray;
  }


  async getTags(){
    let response = await this.api.request({
      method: 'get',
      url: 'api/v1/tags',
      headers: {
        Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`
      },
    });
    return response;
  }

  


  async changeDocumentTest(id: string, name: string, size: any, lastModified: string, content: string, template: number | null, tag: number|null) {
    try {
      const url = `api/v1/documents/${id}`;
      const response = await this.api.request({
        method: 'put',
        url: url,
        data: {
          "name": name,
          "size": size,
          "lastModified": lastModified,
          "content": content,
          "template": (template==null)? null:{"id":template},
          "tag": (tag==null)? null:{"id":tag}
        },
        headers: {
          Authorization: `Bearer ${this.service.getCurrentUserAcessToken()}`,
        },
      });
      
      console.log('Document updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }
  
}
