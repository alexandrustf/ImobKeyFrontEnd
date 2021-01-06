import { Component, OnInit, Input } from "@angular/core";
import { Apartment } from "src/app/shared/models/apartment.model";

@Component({
  selector: "app-apartment-card",
  templateUrl: "./apartment-card.component.html",
  styleUrls: ["./apartment-card.component.scss"],
})
export class ApartmentCardComponent implements OnInit {
  @Input() apartment: Apartment;
  srcImage: string;
  constructor() {
  }

  ngOnInit() {
    console.log(this.apartment.pathImages)
    this.srcImage = JSON.parse(this.apartment.pathImages)[0];
  }
}
