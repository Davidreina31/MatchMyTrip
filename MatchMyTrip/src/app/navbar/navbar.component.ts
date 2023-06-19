import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/Session.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserDTO } from '../models/UserDTO';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo: any;
  currentUser: UserDTO

  constructor(public _sessionService: SessionService, private _authService: AuthService) { }

  ngOnInit() {
    this._authService.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })
  }
  loadData(): any {
    console.log(this.userInfo);
    this.currentUser = new UserDTO();
    this.currentUser.userName = this.userInfo.nickname;
    this.currentUser.email = this.userInfo.name;
    // this.user.sub = this.userInfo.sub;
    this.currentUser.role = 0;
  }

  public getUserRole() {
    return this.currentUser.role;
  }

}
