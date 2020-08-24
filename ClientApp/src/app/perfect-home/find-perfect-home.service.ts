import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Apartment } from "../shared/models/apartment.model";
import { ChoicesPerfectHome } from "./choices-perfect-home.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class FindPerfectHomeService {
  constructor(private http: HttpClient) {}

  public FindPerfectHouses(
    choices: ChoicesPerfectHome
  ): Observable<Apartment[]> {
    return this.http.post<Apartment[]>(
      `${environment.YourApartmentUrl}/PerfectHome`,
      choices
    );
  }
}
