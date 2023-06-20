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
    , private _userService: UserService
    , private _router: Router
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
    this.user.sub = this.userInfo.sub;
    this.user.role = 0;
    this.user.firstName = this.userInfo.name;
    this.user.lastName = this.userInfo.name;
    console.log(this.user);

    this._userService.add(this.user).subscribe({
      next: () => this._router.navigate(["/home"]),
      error: (error) => console.log(error)
    });

    this._sessionService.getToken(this._sessionService.loginCredentials).subscribe(data=> {
      console.log(data);
      sessionStorage.setItem("jwt", data.access_token);
    })
    console.log(this._sessionService.isLogged());
  }

}
