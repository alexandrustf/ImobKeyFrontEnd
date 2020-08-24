import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FavoriteApartmentsListComponent } from "./favorite-apartments-list/favorite-apartments-list.component";
import { ApartmentsListModule } from "../apartments-list/apartments-list.module";
import { RouterModule } from "@angular/router";
import { SpinnerModule } from "../spinner/spinner.module";

@NgModule({
  declarations: [FavoriteApartmentsListComponent],
  imports: [CommonModule, ApartmentsListModule, RouterModule, SpinnerModule],
})
export class MyAccountModule {}
