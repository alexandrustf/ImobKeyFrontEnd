import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from "@angular/core";
import {} from "googlemaps";
import { Apartment } from "src/app/shared/models/apartment.model";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements AfterViewInit {
  @Input() apartmentsList: Apartment[];

  public getLat(apartment) {
    console.log(apartment.lat);
    return apartment.lat;
  }
  ngAfterViewInit() {
    // this.mapInitializer();
    console.log(this.apartmentsList);
  }
  infoWindowOpened = null;
  previous_info_window = null;
  close_window() {
    if (this.previous_info_window != null) {
      this.previous_info_window.close();
    }
  }

  select_marker(infoWindow) {
    console.log("aici");
    if (this.previous_info_window == null)
      this.previous_info_window = infoWindow;
    else {
      this.infoWindowOpened = infoWindow;
      this.previous_info_window.close();
    }
    this.previous_info_window = infoWindow;
  }
}
