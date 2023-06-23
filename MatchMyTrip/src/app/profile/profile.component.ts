import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDTO } from '../models/ProfileDTO';
import { ProfileService } from '../services/Profile.service';
import { JourneyDTO } from '../models/JourneyDTO';
import { JourneyService } from '../services/Journey.service';
import { SessionService } from '../services/Session.service';
import { UserService } from '../services/User.service';
import { AuthService } from '@auth0/auth0-angular';
import { RequestService } from '../services/Request.service';
import { UserDTO } from '../models/UserDTO';
import { RequestDTO } from '../models/RequestDTO';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentProfile: ProfileDTO;
  profileId: any;
  journeys: JourneyDTO[] = [];
  userInfo: any;
  currentUser: UserDTO;
  profileConnected: ProfileDTO;
  request: RequestDTO;
  requests: RequestDTO[] = [];
  errorMsg: string;
  coolMsg: string;

  constructor(
    private _route: ActivatedRoute,
    private _profileService: ProfileService,
    private _journeyService: JourneyService,
    private _router: Router,
    public _sessionService: SessionService,
    private _userService: UserService,
    private _authService: AuthService,
    private _requestService: RequestService
  ) { }

  ngOnInit() {
    this.profileId = this._route.snapshot.paramMap.get("id");
    this._authService.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })   
  }

  loadData(){
    this._profileService.getById(this.profileId).subscribe(data => {
      this.currentProfile = data;
      console.log(this.currentProfile);
      this._journeyService.getByProfileId(this.currentProfile.id).subscribe(jData => {
        this.journeys = jData;
        console.log(this.journeys);
      })
    })
    this._userService.getBySub(this.userInfo.sub).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
      this._profileService.getByUserId(this.currentUser.id).subscribe(profileData => {
        this.profileConnected = profileData;
        this._requestService.getAll().subscribe(requestData => {
          this.requests = requestData;
          console.log(this.requests);
          for(let i = 0; i < this.requests.length; i++){
            if(this.requests[i].profileReceiverId == this.profileId && this.requests[i].profileSenderId == this.profileConnected.id
               && this.requests[i].isAccepted){
              this.coolMsg = "Votre demande a été acceptée !"
            }
          }
        })
      })
    })
    

    
  }
  report(id: string){
    this._router.navigate(["/add-report/" + id]);
  }

  addRequest(){
    this.request = new RequestDTO();
    this.request.isAccepted = false;
    this.request.profileReceiverId = this.profileId;
    this.request.profileSenderId = this.profileConnected.id;
    console.log(this.profileConnected);
    this.request.profileSender = this.profileConnected;
    this._requestService.add(this.request).subscribe({
      next: () => this.loadData(),
      error: (error) => {
        this.errorMsg = error.error;
        console.log(error);
      }
    })
  }

}
