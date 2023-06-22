import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/Session.service';
import { AuthService } from '@auth0/auth0-angular';
import { UserDTO } from '../models/UserDTO';
import { UserService } from '../services/User.service';
import { ProfileDTO } from '../models/ProfileDTO';
import { ProfileService } from '../services/Profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo: any;
  currentUser: UserDTO;
  currentProfile: ProfileDTO;

  constructor(public _sessionService: SessionService, private _userService: UserService,
     private _authService: AuthService, private _profileService: ProfileService) { }

  ngOnInit() {
    this._authService.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })
  }
  loadData(): any {
    console.log(this.userInfo);
    this._userService.getBySub(this.userInfo.sub).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
      this._profileService.getByUserId(this.currentUser.id).subscribe(profileData => {
        this.currentProfile = profileData;
      })
    })
    // this.user.sub = this.userInfo.sub;
    // this.currentUser.role = 0;
  }

  public getUserRole() {
    return this.currentUser.role;
  }

}
