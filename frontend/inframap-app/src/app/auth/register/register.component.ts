import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private authService: AuthService,
              private router: Router ) {}

  onRegisterNewUser(registerForm: NgForm){
    let userData = {
      'name': registerForm.form.value['name'],
      'email': registerForm.form.value['email'],
      'password': registerForm.form.value['password']
    }
    this.authService.registerNewUser(userData)
  }

  onSignIn(){
    this.router.navigate(['login'])
  }
}
