import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JourneyService } from '../services/Journey.service';
import { JourneyDTO } from '../models/JourneyDTO';
import { Seasons } from '../enums/Seasons.enum';

@Component({
  selector: 'app-add-journey',
  templateUrl: './add-journey.component.html',
  styleUrls: ['./add-journey.component.scss']
})
export class AddJourneyComponent implements OnInit {

  form: FormGroup;
  journey: JourneyDTO;
  profileId: any;

  constructor(
    private _builder: FormBuilder,
    private _router: Router,
    private _journeyService: JourneyService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profileId = this._route.snapshot.paramMap.get("id");
    this.form = this._builder.group({
      destination: ['', [Validators.required]],
      nbrOfDays: ['', [Validators.required]],
      seasons: ['', [Validators.required]]
    })
  }

  public addJourney(){
    if(this.form.valid){
      this.journey = new JourneyDTO();
      this.journey.profileId = this.profileId;
      this.journey.destination = this.form.controls['destination'].value;
      this.journey.nbrOfDays = this.form.controls['nbrOfDays'].value;
      this.journey.seasons = parseInt(this.form.controls['seasons'].value);
      this.journey.journey_Activities = [];
      this._journeyService.add(this.journey).subscribe({
        next: () => this._router.navigate(["/my-profile"]),
        error: (error) => console.log(error)
      })
    }
  }
}
