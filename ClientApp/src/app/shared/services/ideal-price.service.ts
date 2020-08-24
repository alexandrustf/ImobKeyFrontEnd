import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApartmentIdealPrice } from "../models/apartment-ideal-price";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class IdealPriceService {
  constructor(private http: HttpClient) {}

  public getIdealPrice(apartment) {
    return this.http.post(`${environment.ApartmentMLUrl}/predict`, apartment);
  }
}
