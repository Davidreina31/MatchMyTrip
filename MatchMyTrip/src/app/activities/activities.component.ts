import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/Activity.service';
import { ActivityDTO } from '../models/ActivityDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: ActivityDTO[] = [];
  activity: ActivityDTO;
  form: FormGroup;
  errorMsg: string;

  constructor(
    private _activityService: ActivityService,
    private _builder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this._builder.group({
      activityName: ['', [Validators.required]],
    })
    this.loadData();
  }

  loadData(): any{
    this._activityService.getAll().subscribe(data => {
      this.activities = data;
    })
  }

  addActivity(){
    this.activity = new ActivityDTO();
    this.activity.activityName = this.form.controls['activityName'].value;
    this._activityService.add(this.activity).subscribe({
      next: () => this.loadData(),
      error: (error) => {
        this.errorMsg = error.error;
        console.log(error);
      }
    })
  }

  deleteActivity(id: string){
    this._activityService.delete(id).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }
}
