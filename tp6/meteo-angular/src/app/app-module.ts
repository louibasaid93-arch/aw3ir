import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Meteo } from './meteo/meteo';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";


@NgModule({
  declarations: [
    App,
    Meteo
  ],
  imports: [
  BrowserModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    [DatePipe],
  ],
  bootstrap: [App]
})
export class AppModule { }




