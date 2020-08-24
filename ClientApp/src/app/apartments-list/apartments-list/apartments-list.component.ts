import { Component, OnInit, Input } from "@angular/core";
import { FilterModel } from "src/app/shared/models/filter.model";

@Component({
  selector: "app-apartments-list",
  templateUrl: "./apartments-list.component.html",
  styleUrls: ["./apartments-list.component.scss"],
})
export class ApartmentsListComponent implements OnInit {
  public filterModel: FilterModel;
  public mapToggle: boolean;
  public apartmentsPageModel;
  public apartmentsList;
  constructor() {}

  ngOnInit() {
    this.filterModel = new FilterModel();
    this.filterModel.pageSize = 8;
    this.filterModel.page = 1;
    this.mapToggle = false;
  }
}
