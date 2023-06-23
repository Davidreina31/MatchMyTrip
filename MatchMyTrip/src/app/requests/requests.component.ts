import { Component, OnInit } from '@angular/core';
import { RequestDTO } from '../models/RequestDTO';
import { RequestService } from '../services/Request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  profileId: any;
  requests: RequestDTO[] = [];

  constructor(
    private _requestService: RequestService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.profileId = this._route.snapshot.paramMap.get("id");
    this.loadData();
  }

  loadData() {
    this._requestService.getAllByProfileId(this.profileId).subscribe(data => {
      this.requests = data;
    })
  }

  acceptRequest(item: RequestDTO){
    item.isAccepted = true;
    this._requestService.update(item.id, item).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }

  deleteRequest(id: string){
    this._requestService.delete(id).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }
}
