import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, tap} from "rxjs/operators";
import {environment} from "@environment";
import {EMPTY, throwError} from "rxjs";
import {ConfigResponse} from "./ConfigResponse";

@Injectable()
export class Configuration {
  public apiUrl: string | undefined = undefined;

  constructor(private http: HttpClient) {
  }

  public init(): Promise<any> {
    return this.http.get<ConfigResponse>("_internal/config")
      .pipe(
        tap(response => this.apiUrl = response.apiUrl),
        catchError(() => {
          if (!environment.defaultConfig) {
            return throwError("Couldn\'t retrieve Ui Config. No default config defined for current environment");
          }

          this.apiUrl = environment.defaultConfig!["apiUrl"];

          console.warn("Couldn\'t retrieve Ui Config. It has been set to default one for current environment." +
            "It probably happened due to you hosting the application using dev server");

          return EMPTY;
        })
      ).toPromise()
  }
}