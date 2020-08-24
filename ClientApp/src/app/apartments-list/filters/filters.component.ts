import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LocationService } from "src/app/shared/services/location.service";
import { FilterModel } from "src/app/shared/models/filter.model";
import { first } from "rxjs/operators";
import { LocationModel } from "src/app/shared/models/location.model";

@Component({
  selector: "app-filters",
  templateUrl: "./filters.component.html",
  styleUrls: ["./filters.component.scss"],
})
export class FiltersComponent implements OnInit {
  public locations: LocationModel[];
  public filterModel: FilterModel;
  @Output() public filteredModel: EventEmitter<FilterModel> = new EventEmitter<
    FilterModel
  >();
  constructor(private locationService: LocationService) {
    this.filterModel = new FilterModel();
    this.filterModel.pageSize = 8;
    this.filterModel.page = 1;
    this.filtered();
  }

  ngOnInit() {
    this.getZoneLocations();
  }

  private getZoneLocations() {
    this.locationService
      .getZoneLocations()
      .pipe(first())
      .subscribe((res) => (this.locations = res));
    console.log(this.locations);
  }

  public filterByRooms(event) {
    this.filterModel.numberOfRooms = event;
    this.filtered();
  }
  public filterByMinPrice(event) {
    this.filterModel.priceMin = event;
    this.filtered();
  }

  public filterByMaxPrice(event) {
    this.filterModel.priceMax = event;
    this.filtered();
  }

  public filterByMinArea(event) {
    this.filterModel.areaMin = event;
    this.filtered();
  }

  public filterByMaxArea(event) {
    this.filterModel.areaMax = event;
    this.filtered();
  }

  public filterByLocation(event) {
    this.filterModel.location = event;
    this.filtered();
  }

  filtered() {
    this.filteredModel.emit(Object.assign({}, this.filterModel));
    console.log("Am emis : " + this.filteredModel);
    console.log(this.filterModel);
  }
  update(value: string) {
    this.filterModel.searchBar = value;
    this.filtered();
  }
}
