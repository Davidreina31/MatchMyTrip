import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/Activity.service';
import { ActivityDTO } from '../models/ActivityDTO';

@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss']
})
export class SimpleSearchComponent implements OnInit {

  activities: ActivityDTO[] = [];
  
  constructor(private _activityService: ActivityService) { }

  ngOnInit() {
    this._activityService.getAll().subscribe(data => {
      this.activities = data;
      console.log(data);
    })
  }

}
