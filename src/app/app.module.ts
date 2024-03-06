import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarModuleModule } from './navbar/navbar-module.module';
import { SupportModule } from './navbar/pages/support/support.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NavbarModuleModule,
    SupportModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
