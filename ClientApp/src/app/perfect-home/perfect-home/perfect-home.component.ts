import { Component, OnInit } from "@angular/core";
import { LocationCoordinates } from "src/app/add-apartment/map-add-apartment/location-coordinates.model";
import { createOfflineCompileUrlResolver } from "@angular/compiler";
import { FindPerfectHomeService } from "../find-perfect-home.service";
import { ChoicesPerfectHome } from "../choices-perfect-home.model";
import { first } from "rxjs/operators";
import { Apartment } from "src/app/shared/models/apartment.model";

@Component({
  selector: "app-perfect-home",
  templateUrl: "./perfect-home.component.html",
  styleUrls: ["./perfect-home.component.scss"],
})
export class PerfectHomeComponent implements OnInit {
  public FavoriteLocations: LocationCoordinates[];
  public apartmentsList: Apartment[];
  public responded: boolean;
  public loading: boolean;
  constructor(private findPerfectHomeService: FindPerfectHomeService) {
    this.FavoriteLocations = [];
    this.responded = false;
  }

  ngOnInit() {
    this.loading = false;
  }

  public addLocationResponse(event) {
    this.FavoriteLocations.push(event);
    console.log(this.FavoriteLocations);
  }

  public GetPerfectHome(response) {
    console.log("iti gasim casa perfecta :)");
    console.log(response);

    this.responded = true;
    this.loading = true;
    const latLocations = this.FavoriteLocations.map((p) => p.lat);
    const lngLocations = this.FavoriteLocations.map((p) => p.lng);

    const choices = new ChoicesPerfectHome(
      response.price,
      response.rooms,
      latLocations,
      lngLocations
    );


    this.findPerfectHomeService
      .FindPerfectHouses(choices)
      .pipe(first())
      .subscribe((res) => {
        this.apartmentsList = res;
        console.log(this.apartmentsList);
        this.loading = false;
      });
  }
}
