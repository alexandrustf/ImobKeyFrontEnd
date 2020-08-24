import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApartmentsListComponent } from "./apartments-list/apartments-list.component";
import { FiltersComponent } from "./filters/filters.component";
import { ApartmentCardComponent } from "./apartment-card/apartment-card.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { CardsListComponent } from "./cards-list/cards-list.component";
import { RouterModule } from "@angular/router";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MapComponent } from "./map/map.component";
import { AgmCoreModule } from "@agm/core";
import { SpinnerComponent } from "../shared/spinner/spinner.component";
import { SpinnerModule } from "../spinner/spinner.module";

@NgModule({
  declarations: [
    ApartmentsListComponent,
    FiltersComponent,
    ApartmentCardComponent,
    PaginationComponent,
    CardsListComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatPaginatorModule,
    SpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBVmIevOIYNBX1c4ZKEcNArXL04WS_JVO0",
    }),
  ],
  exports: [ApartmentCardComponent],
})
export class ApartmentsListModule {}
