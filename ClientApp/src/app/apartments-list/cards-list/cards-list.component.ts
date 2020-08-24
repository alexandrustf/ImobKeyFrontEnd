import {
  Component,
  OnInit,
  Input,
  SimpleChange,
  Output,
  EventEmitter,
} from "@angular/core";
import { ApartmentService } from "src/app/shared/services/apartment.service";
import { FilterModel } from "src/app/shared/models/filter.model";
import { PageModel } from "src/app/shared/models/page.model";
import { Apartment } from "src/app/shared/models/apartment.model";
import { first } from "rxjs/operators";
import { PaginationModel } from "../pagination/pagination.model";

@Component({
  selector: "app-cards-list",
  templateUrl: "./cards-list.component.html",
  styleUrls: ["./cards-list.component.scss"],
})
export class CardsListComponent implements OnInit {
  public filterModel: FilterModel;
  public apartmentsPageModel: PageModel<Apartment>;
  public apartmentsList: Apartment[];
  public pagination: PaginationModel;
  public showSpinner: boolean = true;

  @Output() public apartmentsListEmit: EventEmitter<
    Apartment[]
  > = new EventEmitter<Apartment[]>();

  constructor(private apartmentsService: ApartmentService) { }

  ngOnInit() {
    console.log(this.filterModel);
  }

  private getFilteredApartments() {
    console.log(
      "FACEM CALL din GET APARTMENTS----------------------------------"
    );
    this.showSpinner = true;
    this.apartmentsService
      .getApartments(this.filterModel)
      .pipe(first())
      .subscribe((res) => {
        this.apartmentsPageModel = res;
        this.apartmentsList = this.apartmentsPageModel.records;
        this.apartmentsListEmit.emit(this.apartmentsList);
        this.showSpinner = false;
      });
  }

  @Input()
  set filteredModel(filteredModel: FilterModel) {
    console.log("suntem in setter " + filteredModel);
    this.filterModel = filteredModel;
    this.getFilteredApartments();
  }

  get filteredModel(): FilterModel {
    return this.filterModel;
  }

  @Input()
  set pageSizeChanged(pageSizeChanged: number) {
    this.filterModel.pageSize = pageSizeChanged;
    this.getFilteredApartments();
  }

  get pageSizeChanged(): number {
    return this.filterModel.pageSize;
  }

  @Input()
  set pageIndexChanged(pageIndexChanged: number) {
    this.filterModel.page = pageIndexChanged;
    this.getFilteredApartments();
  }

  get pageIndexChanged(): number {
    return this.filterModel.page;
  }

  @Input()
  set pageChanged(pageChanged: PaginationModel) {
    this.pagination = new PaginationModel();
    this.pagination.pageSize = pageChanged.pageSize;
    this.pagination.pageIndex = pageChanged.pageIndex;

    this.filterModel.pageSize = this.pagination.pageSize;
    this.filterModel.page = this.pagination.pageIndex;

    this.getFilteredApartments();
  }

  get pageChanged(): PaginationModel {
    return this.pagination;
  }
}
