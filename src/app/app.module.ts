// import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModuleModule } from './navbar/navbar-module.module';
import { NgModule } from '@angular/core';
import { CampaignComponent } from './navbar/pages/campaigns/campaigns.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavbarModuleModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }