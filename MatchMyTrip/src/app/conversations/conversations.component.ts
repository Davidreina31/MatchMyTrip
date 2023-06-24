import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../models/UserDTO';
import { ProfileDTO } from '../models/ProfileDTO';
import { UserService } from '../services/User.service';
import { AuthService } from '@auth0/auth0-angular';
import { ProfileService } from '../services/Profile.service';
import { ConversationService } from '../services/Conversation.service';
import { ConversationDTO } from '../models/ConversationDTO';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss']
})
export class ConversationsComponent implements OnInit {

  userInfo: any;
  currentUser: UserDTO;
  currentProfile: ProfileDTO;
  conversations: ConversationDTO[] = [];
  profileChat: ProfileDTO;
  isFormReady: boolean = false;
  otherProfile: ProfileDTO;
  
  constructor(
     private _userService: UserService,
     private _authService: AuthService, private _profileService: ProfileService,
     private _conversationService: ConversationService
  ) { }

  ngOnInit() {
    this._authService.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })
  }

  loadData() {
    console.log(this.userInfo);
    this._userService.getBySub(this.userInfo.sub).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
      this._profileService.getByUserId(this.currentUser.id).subscribe(profileData => {
        this.currentProfile = profileData;
        this._conversationService.GetAllByProfileConnectedId(this.currentProfile.id).subscribe(convData => {
          this.conversations = convData;
          for(let i = 0; i < this.conversations.length; i++){
            this._profileService.getById(this.conversations[i].profileConnectedId).subscribe(otherProfile => {
              this.otherProfile = otherProfile;
            })
          }
        })
      })
      this.isFormReady = true;
    })
  }
}
