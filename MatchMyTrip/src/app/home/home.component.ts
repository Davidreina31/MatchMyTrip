import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/Activity.service';
import { ActivityDTO } from '../models/ActivityDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activities: ActivityDTO[] = [];

  constructor(private _actityService: ActivityService) { }

  ngOnInit() {
    this._actityService.getAll().subscribe(data => {
      this.activities = data;
      console.log(this.activities);
    })
  }

}
