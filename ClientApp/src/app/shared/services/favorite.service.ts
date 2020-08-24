import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { ServiceResponse } from "../models/service-reponse.model";
import { Observable } from "rxjs";
import { Favorite } from "../models/favorite.model";
import { Apartment } from "../models/apartment.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FavoriteService {
  constructor(private http: HttpClient) {}

  public addFavorite(favorite: Favorite) {
    return this.http.post(
      `${environment.YourApartmentUrl}/users/favorite`,
      favorite
    );
  }

  public getFavorites(): Observable<Apartment[]> {
    return this.http
      .get<Apartment[]>(`${environment.YourApartmentUrl}/users/favorite`)
      .pipe(
        map((apartments) =>
          apartments.map((l) => Object.assign(new Apartment(), l))
        )
      );
  }
}
