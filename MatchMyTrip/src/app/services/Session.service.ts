import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/LoginCredentials';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  decryptedToken: any;
  result: boolean;
  user: any;
  public loginCredentials: LoginCredentials;
  private _tokenUrl: string = "https://dev-c4fngek5.us.auth0.com/oauth/token"

  constructor(
    private _authService: AuthService,
    private _client: HttpClient
  ) {
    this.loginCredentials = new LoginCredentials();
    this.loginCredentials.client_id = "iHXxZVzXm0cTFFSXnBWQKzQO48qzwFWv";
    this.loginCredentials.client_secret = "xeH0cxhT37VXxrijEsWKUvQa8fqs6HK9__gkTkDJgMwWk5hdSVGXLRo7fiHVMQeh";
    this.loginCredentials.audience = "http://localhost:5038";
    this.loginCredentials.grant_type = "client_credentials";
  }

  public getToken(lc: LoginCredentials): any{
    return this._client.post<LoginCredentials>(this._tokenUrl, lc);
  }

  public getUserName(): string{
    if(sessionStorage.getItem("userInfo") != null)
    {
      let userName;
      userName = JSON.parse(sessionStorage.getItem("userInfo"))
      return userName["userName"];
    }
    return null;
  }

  public isLogged(): boolean{
    // if(sessionStorage.getItem("userInfo")!=null){
    //   return true;
    // }
    // else{
    //   return false;
    // }
    this._authService.isAuthenticated$.subscribe(data =>{
      this.result = data;
    });
    return this.result;
  }

  public logout(){
    // sessionStorage.removeItem("userInfo");
    // sessionStorage.clear();
    // location.reload();
    sessionStorage.removeItem("jwt");
    this._authService.logout();
  }
}
