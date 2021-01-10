import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApartmentDetailComponent } from "./apartment-detail/apartment-detail.component";
import { SpinnerModule } from "../spinner/spinner.module";
import { AgmCoreModule } from "@agm/core";
import { MatCarouselModule } from '@ngmodule/material-carousel';

@NgModule({
  declarations: [ApartmentDetailComponent],
  imports: [CommonModule, SpinnerModule, AgmCoreModule.forRoot({
    apiKey: "AIzaSyBVmIevOIYNBX1c4ZKEcNArXL04WS_JVO0",
  }),
  MatCarouselModule.forRoot()],
})
export class ApartmentDetailModule {}
