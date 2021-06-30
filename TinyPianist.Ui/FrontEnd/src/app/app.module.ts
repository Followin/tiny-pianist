import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {Configuration} from "./configuration/configuration";

function init(configuration: Configuration): () => Promise<any> {
  return () => configuration.init();
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    Configuration,
    { provide: APP_INITIALIZER, useFactory: init, deps: [Configuration], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
