import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ProfileDTO } from '../models/ProfileDTO';


@Component({
  selector: 'app-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: ['./simple-search.component.scss']
})
export class SimpleSearchComponent implements OnInit {

  profiles: ProfileDTO[] = [];
  keyWord: string;

  constructor(private _searchService: SearchService) { }

  ngOnInit() {

  }

  searchByKeyWord(keyWord: string){
    this._searchService.searchByKeyWord(keyWord).subscribe(data => {
      this.profiles = data;
      this.loadData();
    })
  }

  loadData(): any{
    console.log(this.profiles);
  }

}
