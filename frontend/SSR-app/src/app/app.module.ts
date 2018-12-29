import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SessionsComponent } from './sessions/sessions.component';
import { CollectionsComponent } from './collections/collections.component';
import { ReportsComponent } from './reports/reports.component';
import { WarriorsComponent } from './warriors/warriors.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SessionsComponent,
    CollectionsComponent,
    ReportsComponent,
    WarriorsComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
