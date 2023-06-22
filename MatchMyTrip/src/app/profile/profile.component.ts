import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileDTO } from '../models/ProfileDTO';
import { ProfileService } from '../services/Profile.service';
import { JourneyDTO } from '../models/JourneyDTO';
import { JourneyService } from '../services/Journey.service';
import { SessionService } from '../services/Session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  currentProfile: ProfileDTO;
  profileId: any;
  journeys: JourneyDTO[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _profileService: ProfileService,
    private _journeyService: JourneyService,
    private _router: Router,
    public _sessionService: SessionService
  ) { }

  ngOnInit() {
    this.profileId = this._route.snapshot.paramMap.get("id");

    this._profileService.getById(this.profileId).subscribe(data => {
      this.currentProfile = data;
      this._journeyService.getByProfileId(this.currentProfile.id).subscribe(jData => {
        this.journeys = jData;
        console.log(this.journeys);
      })
    })
  }

  report(id: string){
    this._router.navigate(["/add-report/" + id]);
  }

}
