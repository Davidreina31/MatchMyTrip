import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileDTO } from '../models/ProfileDTO';
import { ProfileService } from '../services/Profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentProfile: ProfileDTO;
  profileId: any;

  constructor(
    private _route: ActivatedRoute,
    private _profileService: ProfileService,
  ) { }

  ngOnInit() {
    this.profileId = this._route.snapshot.paramMap.get("id");

    this._profileService.getById(this.profileId).subscribe(data => {
      this.currentProfile = data;
    })
  }

}
