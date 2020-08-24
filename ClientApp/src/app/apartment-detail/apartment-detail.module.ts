import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApartmentDetailComponent } from "./apartment-detail/apartment-detail.component";
import { SpinnerModule } from "../spinner/spinner.module";

@NgModule({
  declarations: [ApartmentDetailComponent],
  imports: [CommonModule, SpinnerModule],
})
export class ApartmentDetailModule {}
