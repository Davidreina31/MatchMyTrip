import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/Profile.service';
import { UserService } from '../services/User.service';
import { UserDTO } from '../models/UserDTO';
import { AuthService } from '@auth0/auth0-angular';
import { ProfileDTO } from '../models/ProfileDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JourneyDTO } from '../models/JourneyDTO';
import { JourneyService } from '../services/Journey.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {

  userInfo: any;
  user: UserDTO;
  currentProfile: ProfileDTO;
  profile: ProfileDTO;
  completed: boolean = false;
  form: FormGroup;
  isFormReady: boolean = false;
  journeys: JourneyDTO[] = [];

  
  constructor(
    private _profileService: ProfileService,
    private _userService: UserService,
    private _auth: AuthService,
    private _builder: FormBuilder,
    private _router: Router,
    private _journeyService: JourneyService
    ) { }

  ngOnInit() {
    this._auth.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
      
    })

    this.form = this._builder.group({
      userName: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  loadData(): any {
    console.log(this.userInfo.sub);
    this._userService.getBySub(this.userInfo.sub).subscribe(data => {
      this.user = data;
      this._profileService.getByUserId(this.user.id).subscribe(profileData => {
        this.currentProfile = profileData;
        if(this.currentProfile != null || this.currentProfile != undefined){
          this.completed = true;
        }
        this._journeyService.getByProfileId(this.currentProfile.id).subscribe(data => {
          this.journeys = data;
        })
      })
    })
    this.isFormReady = true;

  }

  public createProfile() {
    if (this.form.valid) {
      this.profile = new ProfileDTO();
      this.profile.userId = this.user.id;
      this.profile.userName = this.form.controls['userName'].value;
      this.profile.description = this.form.controls['description'].value;
      this._profileService.add(this.profile).subscribe({
        next: () => this.loadData(),
        error: (error) => console.log(error)
      })
    }
  }

  public addJourney(){
    this._router.navigate(["/add-journey/" + this.currentProfile.id]);
  }

  public addActivity(id: string){
    this._router.navigate(["/add-activities/" + id]);
  }

  public deleteJourney(id: string){
    this._journeyService.delete(id).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }
}
