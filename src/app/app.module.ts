import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { QvaBroCamLibModule } from 'qva-bro-cam-lib';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    QvaBroCamLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }