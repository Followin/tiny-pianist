import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Configuration} from "./configuration/configuration";

@Component({
  selector: 'app-root',
  templateUrl: "./app.component.html",
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private configuration: Configuration) {
  }

  title = 'no-name';
  currentDate: string | null = null;

  ngOnInit(): void {
    this.http.get<{date: string}>(`${this.configuration.apiUrl}/api/date`)
      .subscribe(response => this.currentDate = response.date)
  }
}
