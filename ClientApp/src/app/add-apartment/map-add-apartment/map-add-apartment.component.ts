import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { LocationCoordinates } from "./location-coordinates.model";

@Component({
  selector: "app-map-add-apartment",
  templateUrl: "./map-add-apartment.component.html",
  styleUrls: ["./map-add-apartment.component.scss"],
})
export class MapAddApartmentComponent implements OnInit {
  public lat: number = 47.161494;
  public lng: number = 27.5840504;
  public marker = { lat: 47.161494, lng: 27.5840504, alpha: 1 };
  public locationCoordinates: LocationCoordinates;
  @Output() public selectedLocation: EventEmitter<
    LocationCoordinates
  > = new EventEmitter<LocationCoordinates>();

  ngOnInit(): void {
    this.locationCoordinates = new LocationCoordinates();
    this.locationCoordinates.lat = this.marker.lat;
    this.locationCoordinates.lng = this.marker.lng;
    this.updated();
  }

  addMarker(lat: number, lng: number) {
    this.marker = { lat, lng, alpha: 1 };
    this.locationCoordinates.lat = this.marker.lat;
    this.locationCoordinates.lng = this.marker.lng;
    this.updated();
  }

  updated() {
    this.selectedLocation.emit(Object.assign({}, this.locationCoordinates));
    console.log(this.locationCoordinates);
  }
}
