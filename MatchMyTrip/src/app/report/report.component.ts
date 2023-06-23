import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/Report.service';
import { ReportDTO } from '../models/ReportDTO';
import { UserDTO } from '../models/UserDTO';
import { ProfileDTO } from '../models/ProfileDTO';
import { AuthService } from '@auth0/auth0-angular';
import { UserService } from '../services/User.service';
import { ProfileService } from '../services/Profile.service';
import { JourneyService } from '../services/Journey.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report: ReportDTO[] = [];
  currentUser: UserDTO;
  userInfo: any;
  profile: ProfileDTO;
  reporterUser: UserDTO;

  constructor(
    private _reportService: ReportService,
    private _auth: AuthService,
    private _userService: UserService,

  ) { }

  ngOnInit() {
    this._auth.user$.subscribe(data => {
      this.userInfo = data;
      this.loadData();
    })
  }

  loadData() {
    this._reportService.getAll().subscribe(data => {
      this.report = data;
      console.log(data);
      for (let i = 0; i < this.report.length; i++) {
        this._userService.getById(this.report[i].reporterUserId).subscribe(user => {
          this.report[i].reporterUser = user;
        })
        
      }
    });
  }


  deleteReport(id: string) {
    this._reportService.delete(id).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }
}
