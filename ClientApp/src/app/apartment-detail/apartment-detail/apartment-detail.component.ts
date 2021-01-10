import { Component, OnInit } from "@angular/core";
import { ApartmentService } from "src/app/shared/services/apartment.service";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { first } from "rxjs/operators";
import { ApartmentDetails } from "src/app/shared/models/apartment-details.model";
import { FavoriteService } from "src/app/shared/services/favorite.service";
import { Favorite } from "src/app/shared/models/favorite.model";

@Component({
  selector: "app-apartment-detail",
  templateUrl: "./apartment-detail.component.html",
  styleUrls: ["./apartment-detail.component.scss"],
})
export class ApartmentDetailComponent implements OnInit {
  public apartment: ApartmentDetails;
  public status: boolean;
  public loading: boolean;
  public srcImages;
  constructor(
    private route: ActivatedRoute,
    private apartmentsService: ApartmentService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.status = false;
    this.loading = true;
    const id: string = this.route.snapshot.paramMap.get("id");
    this.apartmentsService
      .getApartmentById(id)
      .pipe(first())
      .subscribe((res) => {
        this.apartment = res.data;
        this.loading = false;
        console.log(this.apartment);
        this.srcImages = JSON.parse(this.apartment.pathImages);
        console.log(typeof this.apartment.lat)
        this.apartment.lat = JSON.parse(this.apartment.lat);
        this.apartment.lng = JSON.parse(this.apartment.lng);
      });
  }
  dosth(event) {
    console.log(event);
  }

  changeStatus(value) {
    this.status = !this.status;
    console.log(this.status);
    this.addFavorite();
  }
  addFavorite() {
    console.log("adaugam la favorite");
    if (this.status === true) {
      var favorite = new Favorite();
      favorite.idApartment = this.apartment.id;
      favorite.favorite = this.status;
      this.favoriteService.addFavorite(favorite).subscribe();
    } else {
      console.log("aici dam call ca sa scoatem de la favorite");
    }
  }
}
