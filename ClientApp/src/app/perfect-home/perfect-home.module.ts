import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PerfectHomeComponent } from "./perfect-home/perfect-home.component";
import { PerfectHomeQuestionComponent } from "./perfect-home-question/perfect-home-question.component";
import { AddApartmentModule } from "../add-apartment/add-apartment.module";
import { MatButtonModule } from "@angular/material/button";
import { ApartmentsListModule } from "../apartments-list/apartments-list.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { SpinnerModule } from "../spinner/spinner.module";


@NgModule({
  declarations: [PerfectHomeComponent, PerfectHomeQuestionComponent],
  imports: [
    CommonModule,
    ApartmentsListModule,
    AddApartmentModule,
    MatButtonModule,
    BrowserAnimationsModule,
    RouterModule,
    ApartmentsListModule,
    SpinnerModule,

  ],
})
export class PerfectHomeModule {}
