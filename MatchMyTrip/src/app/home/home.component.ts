import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../services/Activity.service';
import { ActivityDTO } from '../models/ActivityDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
