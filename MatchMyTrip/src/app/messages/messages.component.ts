import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../services/Profile.service';
import { UserDTO } from '../models/UserDTO';
import { ProfileDTO } from '../models/ProfileDTO';
import { UserService } from '../services/User.service';
import { AuthService } from '@auth0/auth0-angular';
import { MessagesService } from '../services/Messages.service';
import { MessagesDTO } from '../models/MessagesDTO';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  conversationId: any;
  msgToSend: string;
  userInfo: any;
  currentUser: UserDTO;
  currentProfile: ProfileDTO;
  message: MessagesDTO;
  messages: MessagesDTO[];

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _authService: AuthService,
    private _profileService: ProfileService,
    private _messageService: MessagesService
  ) { }

  ngOnInit() {
    this.conversationId = this._route.snapshot.paramMap.get("id");
    this._authService.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })
  }

  loadData() {
    this._userService.getBySub(this.userInfo.sub).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
      this._profileService.getByUserId(this.currentUser.id).subscribe(profileData => {
        this.currentProfile = profileData;
        this._messageService.GetAllByConversationId(this.conversationId).subscribe(messagesData => {
          this.messages = messagesData;
        })
      })
    })
  }

  sendMsg(msg: string) {
    this.message = new MessagesDTO();
    this.message.conversationId = this.conversationId;
    this.message.messageText = msg;
    this.message.profileSenderId = this.currentProfile.id;
    this.message.profileSender = this.currentProfile;
    this._messageService.add(this.message).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }

}
