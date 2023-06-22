import { Component, OnInit } from '@angular/core';
import { MatchDTO } from '../models/MatchDTO';
import { Match_ProfileService } from '../services/Match_Profile.service';
import { ActivatedRoute } from '@angular/router';
import { Match_ProfileDTO } from '../models/Match_ProfileDTO';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  matchList: Match_ProfileDTO[] = [];
  profileId: any;

  constructor(
    private _matchProfileService: Match_ProfileService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profileId = this._route.snapshot.paramMap.get("id");
    this.loadData();
  }

  loadData() {
    this._matchProfileService.getByProfileId(this.profileId).subscribe(data => {
      this.matchList = data;
      console.log(this.matchList);
    })
  }

  deleteMatchProfile(matchId: string, profileId: string){
    console.log(matchId + " " + profileId);
    this._matchProfileService.deleteByTwoIds(matchId, profileId).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }
}
