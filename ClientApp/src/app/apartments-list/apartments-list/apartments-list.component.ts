import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { FilterModel } from "src/app/shared/models/filter.model";
import { ApartmentService } from "src/app/shared/services/apartment.service";

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
  public buy: boolean = false;

  constructor(private router: Router, private apartmentsService: ApartmentService) {
  }

  ngOnInit() {
    this.filterModel = new FilterModel();
    this.filterModel.pageSize = 8;
    this.filterModel.page = 1;
    this.mapToggle = false;
    this.apartmentsService.category = this.router.url.replace("/", "");
  }
}
