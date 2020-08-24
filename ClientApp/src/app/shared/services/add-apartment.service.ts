import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { CreateApartmentModel } from "../models/add-apartment.model";
import { ServiceResponse } from "../models/service-reponse.model";

@Injectable({
  providedIn: "root",
})
export class AddApartmentService {
  public constructor(private http: HttpClient) {}

  public AddApartment(
    createApartment: CreateApartmentModel
  ): Observable<ServiceResponse> {
    console.log("din serviciu");
    console.log(createApartment);
    return this.http.post<ServiceResponse>(
      `${environment.YourApartmentUrl}/apartments`,
      createApartment
    );
  }
}
