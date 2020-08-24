import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Validators } from "@angular/forms";
import { CreateApartmentModel } from "src/app/shared/models/add-apartment.model";
import { AddApartmentService } from "src/app/shared/services/add-apartment.service";
import { first } from "rxjs/operators";
import { ServiceResponse } from "src/app/shared/models/service-reponse.model";
import { ApartmentIdealPrice } from "../../shared/models/apartment-ideal-price";
import { IdealPriceService } from "src/app/shared/services/ideal-price.service";
import { LocationService } from "src/app/shared/services/location.service";
import { LocationModel } from "src/app/shared/models/location.model";
import { LocationCoordinates } from "../map-add-apartment/location-coordinates.model";

export const NAME_MAX_LENGTH: number = 50;
export const DESCRIPTION_MAX_LENGTH: number = 1000;
@Component({
  selector: "app-add-apartment-form",
  templateUrl: "./add-apartment-form.component.html",
  styleUrls: ["./add-apartment-form.component.scss"],
})
export class AddApartmentFormComponent implements OnInit {
  public response: ServiceResponse;
  public PreciseLocation: LocationCoordinates;
  public selectedLocation: string;
  public added: boolean;
  public loading: boolean;
  public apartmentForm: FormGroup = new FormGroup({
    image: new FormControl("", {
      validators: [Validators.required],
      updateOn: "change",
    }),
    title: new FormControl("", {
      validators: [Validators.required, Validators.maxLength(NAME_MAX_LENGTH)],
      updateOn: "change",
    }),
    price: new FormControl("", {
      validators: [Validators.required, Validators.min(0)],
      updateOn: "change",
    }),
    area: new FormControl("", {
      validators: [Validators.required, Validators.min(0)],
      updateOn: "change",
    }),
    numberOfRooms: new FormControl("", {
      validators: [Validators.required],
      updateOn: "change",
    }),
    description: new FormControl("", {
      validators: [Validators.maxLength(DESCRIPTION_MAX_LENGTH)],
      updateOn: "change",
    }),
    compartimentare: new FormControl("", {
      validators: [Validators.required],
      updateOn: "change",
    }),
    floor: new FormControl("", {
      validators: [],
      updateOn: "change",
    }),
    totalNumberOfFloors: new FormControl("", {
      validators: [],
      updateOn: "change",
    }),
    numberOfBathRooms: new FormControl("", {
      validators: [Validators.min(0), Validators.max(20)],
      updateOn: "change",
    }),
    exactAdress: new FormControl("", {
      validators: [],
      updateOn: "change",
    }),
    confort: new FormControl("", {
      validators: [Validators.maxLength(NAME_MAX_LENGTH)],
      updateOn: "change",
    }),
    constructionYear: new FormControl("", {
      validators: [Validators.min(1920), Validators.max(2020)],
      updateOn: "change",
    }),
    phone: new FormControl("", {
      validators: [],
      updateOn: "change",
    }),
  });
  constructor(
    private locationService: LocationService,
    private addApartmentService: AddApartmentService,
    private idealPriceService: IdealPriceService
  ) {}

  public locations: LocationModel[];

  ngOnInit() {
    this.getZoneLocations();
    this.added = false;
    this.loading = false;
  }

  private getZoneLocations() {
    this.locationService
      .getZoneLocations()
      .pipe(first())
      .subscribe((res) => (this.locations = res));
  }

  imageContent: string;

  onFileChanged(event) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      var imageResult = event.target["result"].toString();
      this.imageContent = imageResult.slice(23, imageResult.length - 4);
    };
  }

  selectChangeHandler(event: any) {
    this.selectedLocation = event.target.value;
    console.log(
      this.locations.filter((p) => p.id == this.selectedLocation)[0].name
    );
  }

  public idealPrice: number;
  public checkIdealPrice() {
    var apartment = new ApartmentIdealPrice();
    apartment.Area = [this.apartmentForm.get("area").value];
    apartment.Rooms = [this.apartmentForm.get("numberOfRooms").value];
    apartment.Location = [
      this.locations.filter((p) => p.id == this.selectedLocation)[0].name,
    ];
    if (+this.apartmentForm.get("constructionYear").value > 2015)
      apartment.BlocNou = ["Bloc Nou"];
    else apartment.BlocNou = ["Bloc Vechi"];
    console.log("compartimentare");
    console.log(this.apartmentForm.get("compartimentare").value);
    apartment.Compartimentare = [
      this.apartmentForm.get("compartimentare").value,
    ];
    apartment.Ap_Etaj = [this.apartmentForm.get("floor").value];

    this.idealPriceService
      .getIdealPrice(apartment)
      .pipe(first())
      .subscribe(
        (res) => (this.idealPrice = Math.ceil(Number(res.toString())))
      );
  }

  onSubmit() {
    this.loading = true;
    // console.warn(this.apartmentForm.value);
    // window.alert("A fost apasat butonu de submit" + this.apartmentForm.value);
    var apartment = new CreateApartmentModel();
    apartment.title = this.apartmentForm.get("title").value;
    apartment.area = this.apartmentForm.get("area").value;
    apartment.numberOfRooms = this.apartmentForm.get("numberOfRooms").value;
    apartment.totalNumberOfFloors = this.apartmentForm.get(
      "totalNumberOfFloors"
    ).value
      ? (apartment.totalNumberOfFloors = this.apartmentForm.get(
          "totalNumberOfFloors"
        ).value)
      : 0;
    apartment.numberOfBathrooms = this.apartmentForm.get("numberOfBathRooms")
      .value
      ? (apartment.numberOfBathrooms = this.apartmentForm.get(
          "numberOfBathRooms"
        ).value)
      : 0;
    apartment.exactAdress = this.apartmentForm.get("exactAdress").value
      ? this.apartmentForm.get("exactAdress").value
      : "";
    apartment.description = this.apartmentForm.get("description").value
      ? this.apartmentForm.get("description").value
      : "";
    apartment.confort = this.apartmentForm.get("confort").value
      ? (apartment.confort = this.apartmentForm.get("confort").value)
      : 0;
    apartment.constructionYear = this.apartmentForm.get("constructionYear")
      .value
      ? (apartment.constructionYear = this.apartmentForm.get(
          "constructionYear"
        ).value)
      : 0;

    apartment.locationId = this.selectedLocation;
    console.log("aici");
    console.log(apartment.locationId);
    apartment.lat = this.PreciseLocation.lat;
    apartment.lng = this.PreciseLocation.lng;
    apartment.price = this.apartmentForm.get("price").value;
    apartment.imagesBytes = this.imageContent;
    console.log(apartment);
    this.added = true;
    this.loading = false;

    this.addApartmentService
      .AddApartment(apartment)
      .pipe(first())
      .subscribe((res) => {
        this.response = res;
        console.log(this.response);
        this.added = true;
        this.loading = false;
      });
  }
}
