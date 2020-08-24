import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FilterModel } from "src/app/shared/models/filter.model";
import { PaginationModel } from "./pagination.model";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"],
})
export class PaginationComponent implements OnInit {
  @Input() public filterModel: FilterModel;
  @Input() totalNumberOfRecords: number;
  @Output() public pageEmit: EventEmitter<PaginationModel> = new EventEmitter<
    PaginationModel
  >();
  public localFilterModel: FilterModel;

  constructor() {}

  ngOnInit() {}

  public paginateResults(event): void {
    console.log("eventu este:");
    console.log(event);
    var paginationModel = new PaginationModel();
    paginationModel.pageSize = event.pageSize;
    paginationModel.pageIndex = event.pageIndex + 1;
    this.pageEmit.emit(paginationModel);
  }
}
