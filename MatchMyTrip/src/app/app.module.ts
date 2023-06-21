import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SimpleSearchComponent } from './simple-search/simple-search.component';
import { SpecificSearchComponent } from './specific-search/specific-search.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';
import { InterceptorService } from './services/Interceptor.service';
import { ReportComponent } from './report/report.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { ProfileComponent } from './profile/profile.component';
import { AddJourneyComponent } from './add-journey/add-journey.component';
import { ActivitiesComponent } from './activities/activities.component';
import { AddActivitiesToProfileComponent } from './add-activities-to-profile/add-activities-to-profile.component';

export function tokenGetter() {
  return sessionStorage.getItem("jwt");
}

@NgModule({
  declarations: [														
    AppComponent,
      HomeComponent,
      NavbarComponent,
      SimpleSearchComponent,
      SpecificSearchComponent,
      LoginComponent,
      ReportComponent,
      MyProfileComponent,
      UpdateProfileComponent,
      ProfileComponent,
      AddJourneyComponent,
      ActivitiesComponent,
      AddActivitiesToProfileComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule.forRoot({
      domain: 'dev-c4fngek5.us.auth0.com',
      clientId: 'WwZoTGLDv2VeqfsEM23hasNVRMb1RdzF',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
