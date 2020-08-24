import { Component, OnInit } from "@angular/core";
import { Apartment } from "src/app/shared/models/apartment.model";
import { ApartmentDetailModule } from "src/app/apartment-detail/apartment-detail.module";
import { FavoriteService } from "src/app/shared/services/favorite.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-favorite-apartments-list",
  templateUrl: "./favorite-apartments-list.component.html",
  styleUrls: ["./favorite-apartments-list.component.scss"],
})
export class FavoriteApartmentsListComponent implements OnInit {
  public apartmentsList: Apartment[];
  public loading: boolean;

  constructor(private favoriteService: FavoriteService) {}

  ngOnInit() {
    this.loading = true;

    this.favoriteService
      .getFavorites()
      .pipe(first())
      .subscribe((res) => {
        this.apartmentsList = res;
        console.log(this.apartmentsList);
        this.loading = false;
      });
  }
}
