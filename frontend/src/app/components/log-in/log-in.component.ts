import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication/authentication.service';


@Component({
  selector: 'app-log-in', 
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit{
  login_form = new FormGroup({
    email: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(private service: AuthenticationService) { }

  loginUser(){
    if(this.login_form.value.email!=null&& this.login_form.value.password!=null)
    this.service.login(this.login_form.value.email,this.login_form.value.password);
  }

  ngOnInit() { }
}
