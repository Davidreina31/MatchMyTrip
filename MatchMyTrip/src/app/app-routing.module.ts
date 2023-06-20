import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SimpleSearchComponent } from './simple-search/simple-search.component';
import { SpecificSearchComponent } from './specific-search/specific-search.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { AddJourneyComponent } from './add-journey/add-journey.component';
import { ActivitiesComponent } from './activities/activities.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'search',
    component: SimpleSearchComponent
  },
  {
    path: 'specific-search',
    component: SpecificSearchComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
  {
    path: 'my-profile',
    component: MyProfileComponent
  },
  {
    path: 'update-profile/:id',
    component: UpdateProfileComponent
  },
  {
    path: 'profile/:id',
    component: ProfileComponent
  },
  {
    path: 'add-journey/:id',
    component: AddJourneyComponent
  },
  {
    path: 'activities',
    component: ActivitiesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
