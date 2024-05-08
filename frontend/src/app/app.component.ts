import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-latex';
  
 currentUserUsername:string="";
  constructor(private service: AuthenticationService) { 
  }
  ngOnInit(): void {
    this.service.onAuthenticationChanged().subscribe((username:string) =>{
      this.currentUserUsername=username;
    })
  }

   

  logoutUser(){
    this.service.logout();
  }

}
