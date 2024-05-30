import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  

  authUrl: string = "http://127.0.0.1:8000/api/user/"

  constructor(private http: HttpClient) { }

  autoLogin(){
    const userData: {
      email:string;
      name: string;
      _token: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData){
      return;
    }else {
      const user = new User(userData.email, userData.name, userData._token)
      this.user.next(user)
    }
  }

  private handleAuthentication(email: string, name: string, token: string){
    const user = new User(email, name, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  registerNewUser(userData: any){
    this.http.post(`${this.authUrl}create/`, userData).subscribe(
      responseData => {
        console.log(responseData)
      }
    );
  }

  onSignIn(email:string, password: string){
    return this.http
      .post(
        `${this.authUrl}token/`, 
        {
          'email': email, 
          'password': password
        }
      )
      .pipe(tap((resData: {email: string, name: string, token: string }) => {
        this.handleAuthentication(resData.email, resData.name, resData.token)
      }))
  }
}
