import { AuthenticationService } from './../../service/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent implements OnInit {   
  signup_form = new FormGroup({
    full_name: new FormControl<string>('', [Validators.required, Validators.maxLength(30), ]),
    username: new FormControl<string>('', [Validators.required, Validators.maxLength(30), ]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
  });

  constructor(private service: AuthenticationService) { }

  signUpUser(){
    if(this.signup_form.value.username!=null&&this.signup_form.value.full_name!=null&&this.signup_form.value.email!=null&&this.signup_form.value.password!=null)
      this.service.registerAndLogin(this.signup_form.value.username,
        this.signup_form.value.full_name,this.signup_form.value.email,this.signup_form.value.password
      )
      this.signup_form.reset();

  }

  ngOnInit() { }
}
