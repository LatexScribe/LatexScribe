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
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required]),
  });

  constructor(private service: AuthenticationService) { }

  loginUser(){
    if(this.login_form.value.username!=null&& this.login_form.value.password!=null)
    this.service.login(this.login_form.value.username,this.login_form.value.password)
    this.login_form.reset();

  }

  ngOnInit() { }
}
