import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SimpleSearchComponent } from './simple-search/simple-search.component';
import { SpecificSearchComponent } from './specific-search/specific-search.component';

@NgModule({
  declarations: [				
    AppComponent,
      HomeComponent,
      NavbarComponent,
      SimpleSearchComponent,
      SpecificSearchComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
