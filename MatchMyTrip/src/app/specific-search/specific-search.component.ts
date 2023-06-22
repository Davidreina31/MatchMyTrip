import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { MatchService } from '../services/Match.service';
import { FilterDTO } from '../models/FilterDTO';
import { v4 as uuidv4 } from 'uuid';
import { MatchDTO } from '../models/MatchDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JourneyDTO } from '../models/JourneyDTO';
import { ProfileService } from '../services/Profile.service';
import { ProfileDTO } from '../models/ProfileDTO';
import { FilterService } from '../services/Filter.service';
import { ActivityService } from '../services/Activity.service';
import { ActivityDTO } from '../models/ActivityDTO';
import { Match_ProfileDTO } from '../models/Match_ProfileDTO';
import { UserDTO } from '../models/UserDTO';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../services/User.service';
import { Match_ProfileService } from '../services/Match_Profile.service';

@Component({
  selector: 'app-specific-search',
  templateUrl: './specific-search.component.html',
  styleUrls: ['./specific-search.component.scss']
})
export class SpecificSearchComponent implements OnInit {

  destination: string;
  nbrOfDays: number;
  season: number;
  filter: FilterDTO;
  journeys: JourneyDTO[] = [];
  form: FormGroup
  profileList: ProfileDTO[] = [];
  match: MatchDTO;
  matchList: MatchDTO [] = [];
  activities: ActivityDTO [] = [];
  matchProfile: Match_ProfileDTO;
  userInfo: any;
  currentUser: UserDTO;
  currentProfile: ProfileDTO;

  constructor(
    private _searchService: SearchService,
    private _builder: FormBuilder,
    private _profileService: ProfileService,
    private _matchService: MatchService,
    private _filterService: FilterService,
    private _activityService: ActivityService,
    private _authService: AuthService,
    private _userService: UserService,
    private _matchProfileService: Match_ProfileService
  ) { }

  ngOnInit() {
    this._authService.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })

    this.form = this._builder.group({
      seasons: ['', [Validators.required]]
    })

    this._activityService.getAll().subscribe(data => {
      this.activities = data;
    })
  }

  loadData() {
    this._userService.getBySub(this.userInfo.sub).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
      this._profileService.getByUserId(this.currentUser.id).subscribe(profileData => {
        this.currentProfile = profileData;
      })
    })
  }

  addMatch(currentJourney: JourneyDTO){
    let matchScore = 0;
    this.match = new MatchDTO();
    this.match.id = uuidv4();
    this.match.destination = currentJourney.destination;
    this.match.nbrOfDays = currentJourney.nbrOfDays;
    this.match.seasons = currentJourney.seasons;
    this.match.profileId = currentJourney.profileId;
    this.match.journeyId = currentJourney.id;

    if(this.filter.destination == currentJourney.destination){
      matchScore += 1;
    }

    if(this.filter.nbrOfDays == currentJourney.nbrOfDays){
      matchScore += 1;
    }

    if(this.filter.seasons == currentJourney.seasons){
      matchScore += 1;
    }
    this.match.matchScore = matchScore;
    console.log(this.match);

    this._matchService.add(this.match).subscribe();
    this.matchList.push(this.match);
  }

  searchByFilter(destination: string, nbrOfDays: number){
    this.filter = new FilterDTO();
    this.filter.id = uuidv4();
    this.filter.destination = destination;
    this.filter.nbrOfDays = nbrOfDays;
    this.filter.seasons = parseInt(this.form.controls['seasons'].value);
    this._filterService.add(this.filter).subscribe();
    console.log(this.filter);
    this._searchService.searchByFilter(this.filter).subscribe(data => {
      this.journeys = data;
      for(let i =0; i < this.journeys.length; i++){
        this._profileService.getById(this.journeys[i].profileId).subscribe(profileData => {
          this.addMatch(this.journeys[i]);
        })
      }
    })
  }

  resetSearch(){
    window.location.reload();
  }

  addMatchToFavorite(match: MatchDTO){
    console.log(match);
    this.matchProfile = new Match_ProfileDTO();
    this.matchProfile.profileId = this.currentProfile.id;
    this.matchProfile.matchId = match.id;
    this.matchProfile.match = match;
    console.log(this.matchProfile);
    this._matchProfileService.add(this.matchProfile).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }
}
