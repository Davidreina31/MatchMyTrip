import { Component, OnInit } from '@angular/core';
import { Journey_ActivityDTO } from '../models/Journey_ActivityDTO';
import { Journey_ActivityService } from '../services/Journey_Activity.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JourneyService } from '../services/Journey.service';
import { JourneyDTO } from '../models/JourneyDTO';
import { ActivityDTO } from '../models/ActivityDTO';
import { ActivityService } from '../services/Activity.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-activities-to-profile',
  templateUrl: './add-activities-to-profile.component.html',
  styleUrls: ['./add-activities-to-profile.component.scss']
})
export class AddActivitiesToProfileComponent implements OnInit {

  journeyActivities: Journey_ActivityDTO[] = [];
  journeyActivity: Journey_ActivityDTO;
  activities: ActivityDTO[] = [];
  activitiesByJourney: ActivityDTO[] = [];
  journey: JourneyDTO;
  journeyId: any;
  isFormReady: boolean = false;
  form: FormGroup;
  errorMsg: string;

  constructor(
    private _journeyActivityService: Journey_ActivityService,
    private _journeyService: JourneyService,
    private _route: ActivatedRoute,
    private _activityService: ActivityService,
    private _builder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.journeyId = this._route.snapshot.paramMap.get("id");

    this.form = this._builder.group({
      1: ['', []],

    })
    this.loadData();
  }

  loadData(): any {
    this._journeyService.getOne(this.journeyId).subscribe(data => {
      this.journey = data;
      this._journeyActivityService.getByJourneyId(this.journeyId).subscribe(jData => {
        this.journeyActivities = jData;
        console.log(this.journeyActivities);
        for (let i = 0; i < this.journeyActivities.length; i++) {
          this._activityService.getOne(this.journeyActivities[i].activityId).subscribe(activity => {
            this.activitiesByJourney.push(activity);
          })
        }
        this._activityService.getAll().subscribe(aData => {
          this.activities = aData;
          this.isFormReady = true;
        })
      })
    })
  }


  addActivityToJourney() {
    const selectedActivities = this.activities.filter(item => item.isSelected);
    console.log(selectedActivities);
    for (let i = 0; i < selectedActivities.length; i++) {
      this.journeyActivity = new Journey_ActivityDTO();
      this.journeyActivity.journeyId = this.journeyId;
      this.journeyActivity.activityId = selectedActivities[i].id;
      this.journeyActivity.activity = selectedActivities[i];
      console.log(this.journeyActivity);
      this._journeyActivityService.add(this.journeyActivity).subscribe({
        next: () => this._router.navigate(["/my-profile"]),
        error: (error) => {
          this.errorMsg = error.error;
          console.log(error);
        }
      })
    }
  }

  deleteActivityFromJourney(activityId: string, journeyId: string) {
    this._journeyActivityService.deleteByTwoIds(activityId, journeyId).subscribe({
      next: () => this._router.navigate(["/my-profile"]),
      error: (error) => console.log(error)
    })
  }
}
