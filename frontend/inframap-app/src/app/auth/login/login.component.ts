import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error = null;
  isLoading = false;

  constructor(private router: Router, private authService: AuthService) {}

  onRegister() {
    this.router.navigate(['register'])
  }

  onLogin(loginForm: NgForm){
    let email: string = loginForm.form.value['email'] 
    let password: string = loginForm.form.value['password']
    this.isLoading = true;
    this.authService.onSignIn(email, password).subscribe(
      responseData => {
        this.router.navigate(['']);
      },
      error => {
        this.error = 'An error occurred'
        console.log(error);
      }
    );
    this.isLoading = false;
    loginForm.reset();
  }
}
