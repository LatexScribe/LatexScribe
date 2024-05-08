import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from '../../models/user.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private currentUsername: string ="";
  private authenticationChanged = new Subject<string>();

  currentUser: User;
  api=axios.create({ baseURL: "http://localhost:8080/"  });
  constructor() { 
  this.currentUser=new User("","","","",null,null);
  }

  async registerAndLogin(username: string, fullname:string,email: string,password:string){
    

      let response= await this.api.request({
      method: "post",
      url: "api/v1/auth/register",
      headers: {
    "Content-Type": "application/json" // Set the correct Content-Type header
    },
      data: JSON.stringify({
          "username": username,
          "fullName": fullname,
          "email": email,
          "password": password
        
    }),
    }) ;
    this.currentUser=new User(username,response.data.accessToken,response.data.refreshToken,password,new Date(response.data.refreshTokenExpiration),new Date(response.data.accessTokenExpiration));
    console.log(this.currentUser );
    this.authenticationChanged.next(username);
  }


  async login(username: string,password:string){
   let response= await this.api.request({
  method: "post",
  url: "api/v1/auth/login",
  // headers: {
  //   "Content-Type": "application/json" // Set the correct Content-Type header
  // },
  data: {
    "username": username,
    "password": password
  }
  
});

this.currentUser.refreshToken=response.data.refreshToken;
    this.currentUser.accessToken=response.data.accessToken;
   this.currentUser.accessTokenExpiration=new Date(response.data.accessTokenExpiration);
   this.currentUser.refreshTokenExpiration=new Date(response.data.refreshTokenExpiration);

    console.log("after login"+this.currentUser);

    this.authenticationChanged.next(username);

  }

  async logout(){
    
    await this.api.request({
  method:"post",
  url:"api/v1/auth/logout",
  headers: {
    Authorization: `Bearer ${this.currentUser.accessToken}`,
  },
  data:{}
}

);

this.currentUser=new User("","","","",null,null);
this.authenticationChanged.next("");

  }


  onAuthenticationChanged() {
    return this.authenticationChanged.asObservable();
  }
}
