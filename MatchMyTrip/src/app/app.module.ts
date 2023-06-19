import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SimpleSearchComponent } from './simple-search/simple-search.component';
import { SpecificSearchComponent } from './specific-search/specific-search.component';
import { AuthModule } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';
import { InterceptorService } from './services/Interceptor.service';

@NgModule({
  declarations: [					
    AppComponent,
      HomeComponent,
      NavbarComponent,
      SimpleSearchComponent,
      SpecificSearchComponent,
      LoginComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: 'dev-c4fngek5.us.auth0.com',
      clientId: 'WwZoTGLDv2VeqfsEM23hasNVRMb1RdzF'
    }),
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
