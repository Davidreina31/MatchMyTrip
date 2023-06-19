import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/Activity.service';
import { ActivityDTO } from '../models/ActivityDTO';
import { UserDTO } from '../models/UserDTO';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../services/User.service';
import { Router } from '@angular/router';
import { SessionService } from '../services/Session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userInfo: any;
  user: UserDTO;
  constructor(private auth: AuthService
    , private _sessionService: SessionService
    ) { }

  ngOnInit() {
    this.auth.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })
    
  }
  loadData(): any {
    this.user = new UserDTO();
    this.user.userName = this.userInfo.nickname;
    this.user.email = this.userInfo.name;
    // this.user.sub = this.userInfo.sub;
    this.user.role = 0;
    console.log(this.user);
    this._sessionService.getToken(this._sessionService.loginCredentials).subscribe(data=> {
      console.log(data);
      sessionStorage.setItem("jwt", data.access_token);
    })
    console.log(this._sessionService.isLogged());
  }

}
