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

  constructor(
    private _searchService: SearchService,
    private _builder: FormBuilder,
    private _profileService: ProfileService,
    private _matchService: MatchService,
    private _filterService: FilterService,
    private _activityService: ActivityService
  ) { }

  ngOnInit() {
    this.form = this._builder.group({
      seasons: ['', [Validators.required]]
    })

    this._activityService.getAll().subscribe(data => {
      this.activities = data;
    })
  }

  addMatch(currentJourney: JourneyDTO){
    let matchScore = 0;
    this.match = new MatchDTO();
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
}
