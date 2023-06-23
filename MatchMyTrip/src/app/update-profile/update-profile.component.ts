import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/Profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileDTO } from '../models/ProfileDTO';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  currentProfile: ProfileDTO;
  newProfile: ProfileDTO;
  profileId: any;
  form: FormGroup;

  constructor(
    private _profileService: ProfileService,
    private _builder: FormBuilder,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    
    this.profileId = this._route.snapshot.paramMap.get("id");
    this._profileService.getById(this.profileId).subscribe(data => {
      this.currentProfile = data;
      this.form = this._builder.group({
        userName: [this.currentProfile.userName, [Validators.required]],
        description: [this.currentProfile.description, [Validators.required]],
        profilePicture: [this.currentProfile.profilePicture, [Validators.required]],
      })
    })

    
  }

  updateProfile(){
    this.newProfile = new ProfileDTO();
    this.newProfile.id = this.profileId;
    this.newProfile.userName = this.form.controls['userName'].value;
    this.newProfile.description = this.form.controls['description'].value;
    this.newProfile.profilePicture = this.form.controls['profilePicture'].value;
    this.newProfile.userId = this.currentProfile.userId
    this._profileService.update(this.profileId, this.newProfile).subscribe({
      next: () => this._router.navigate(["/my-profile"]),
      error: (error) => console.log(error)
    })
  }

}
