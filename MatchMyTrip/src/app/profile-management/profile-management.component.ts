import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/User.service';
import { ProfileService } from '../services/Profile.service';
import { UserDTO } from '../models/UserDTO';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.scss']
})
export class ProfileManagementComponent implements OnInit {

  users: UserDTO [] = [];
  user: UserDTO;
  form: FormGroup;

  constructor(
    private _userService: UserService,
    private _builder: FormBuilder

  ) { }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this._userService.getAll().subscribe(data => {
      this.users = data;
      for(let i = 0; i < this.users.length; i++){
        this.form = this._builder.group({
          role: ['', [Validators.required]]
        })
      }
    })
  }

  deleteUser(id: string){
    this._userService.delete(id).subscribe({
      next: () => this.loadData(),
      error: (error) => console.log(error)
    })
  }

  updateRole(id: string){
    this._userService.getById(id).subscribe(data => {
      this.user = data;
      this.user.role = parseInt(this.form.controls['role'].value);
      this._userService.update(id, this.user).subscribe({
        next: () => this.loadData(),
        error: (error) => console.log(error)
      })
    })
  }

}
