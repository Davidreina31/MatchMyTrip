import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/Report.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReportDTO } from '../models/ReportDTO';
import { UserService } from '../services/User.service';
import { UserDTO } from '../models/UserDTO';
import { AuthService } from '@auth0/auth0-angular';
import { ProfileService } from '../services/Profile.service';
import { ProfileDTO } from '../models/ProfileDTO';
import { JourneyService } from '../services/Journey.service';
import { JourneyDTO } from '../models/JourneyDTO';

@Component({
  selector: 'app-add-report',
  templateUrl: './add-report.component.html',
  styleUrls: ['./add-report.component.scss']
})
export class AddReportComponent implements OnInit {

  journeyId: any;
  form: FormGroup;
  report: ReportDTO;
  currentUser: UserDTO;
  userInfo: any;
  profile: ProfileDTO;
  journey: JourneyDTO;

  constructor(
    private _reportService: ReportService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _builder: FormBuilder,
    private _userService: UserService,
    private _auth: AuthService,
    private _profileService: ProfileService,
    private _journeyService: JourneyService
  ) { }

  ngOnInit() {
    this.journeyId = this._route.snapshot.paramMap.get("id");

    this.form = this._builder.group({
      report: ['', [Validators.required]]
    })
    this._auth.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })
  }

  loadData() {
    this._userService.getBySub(this.userInfo.sub).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
      this._profileService.getByUserId(this.currentUser.id).subscribe(profile => {
        this.profile = profile;
      })

      this._journeyService.getOne(this.journeyId).subscribe(journey => {
        this.journey = journey;
      })
    })
  }

  public insertReport() {
    if (this.form.valid) {
      this.report = new ReportDTO();
      this.report.journeyId = this.journeyId;
      this.report.reporterUserId = this.currentUser.id;
      this.report.reason = this.form.controls['report'].value;
      this.report.journey = this.journey;
      this.report.journey.journey_Activities = [];
      this.report.journey.profile = this.profile;
      this.report.reporterUser = this.currentUser;
      console.log(this.report)
      this._reportService.add(this.report).subscribe({
        next: () => this._router.navigate(["/profile/" + this.profile.id]),
        error: (error) => console.log(error)
      })
    }
  }
}
