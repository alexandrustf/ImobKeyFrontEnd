import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { LocationModel } from "../models/location.model";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LocationService {
  public constructor(private http: HttpClient) {}

  public getZoneLocations(): Observable<LocationModel[]> {
    return this.http
      .get<LocationModel[]>(`${environment.LocationsUrl}/locations`)
      .pipe(
        map((locations) =>
          locations.map((l) => Object.assign(new LocationModel(), l))
        )
      );
  }
}
