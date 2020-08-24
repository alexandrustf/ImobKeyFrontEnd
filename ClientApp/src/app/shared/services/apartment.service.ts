import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Apartment } from "../models/apartment.model";
import { map, filter } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { PageModel } from "../models/page.model";
import { FilterModel } from "../models/filter.model";
import { ConditionalExpr } from "@angular/compiler";
import { ApartmentDetails } from "../models/apartment-details.model";

@Injectable({
  providedIn: "root",
})
export class ApartmentService {
  public constructor(private http: HttpClient) { }

  public getApartmentById(id: string): Observable<ApartmentDetails> {
    return this.http.get<ApartmentDetails>(
      `${environment.YourApartmentUrl}/Apartments/${id}`
    );
  }

  public getApartments(
    filterModel: FilterModel
  ): Observable<PageModel<Apartment>> {
    let filters: string = "";

    filters = filterModel.searchBar
      ? filters.concat(this.evaluateSearchBar(filterModel.searchBar))
      : filters.concat();
    filters = filterModel.priceMin
      ? filters.concat(`price>=${filterModel.priceMin},`)
      : filters.concat();
    filters = filterModel.priceMax
      ? filters.concat(`price<=${filterModel.priceMax},`)
      : filters.concat();
    filters = filterModel.areaMin
      ? filters.concat(`area>=${filterModel.areaMin},`)
      : filters.concat();
    filters = filterModel.areaMax
      ? filters.concat(`area<=${filterModel.areaMax},`)
      : filters.concat();
    for (let property of Object.keys(filterModel)) {
      if (
        property !== "page" &&
        property !== "pageSize" &&
        property !== "searchBar" &&
        property !== "priceMin" &&
        property !== "priceMax" &&
        property !== "areaMin" &&
        property !== "areaMax"
      )
        filters = filters.concat(`${property}==${filterModel[property]},`);
    }
    console.log(filters);

    let params: HttpParams = new HttpParams().append("filters", filters);

    params = filterModel.page
      ? params.append("page", filterModel.page.toString())
      : params;
    params = filterModel.pageSize
      ? params.append("pageSize", filterModel.pageSize.toString())
      : params;

    return this.http
      .get<PageModel<Apartment>>(`https://xinrbkooui.execute-api.eu-central-1.amazonaws.com/alpha/apartments`, {
        params: params,
      })
      .pipe(
        map((res) => {
          const pageModel: PageModel<Apartment> = new PageModel<Apartment>();
          pageModel.totalNumberOfRecords = res.totalNumberOfRecords;
          pageModel.records = res.records.map((s) =>
            Object.assign(new Apartment(), s)
          );
          return pageModel;
        })
      );
  }

  private evaluateSearchBar(value: string): string {
    var splitted = value.split(" ");
    console.log(splitted);
    var result = "";
    var listFilters = ["locationName"];
    var ok = 0;
    listFilters.forEach((element) => {
      for (let index = 0; index < splitted.length; index++) {
        console.log("wtf" + splitted[index]);
        if (ok === 0) {
          ok = 1;
          result = result.concat(`${element}@=${splitted[index]}`);
        } else {
          result = result.concat(`|${element}@=${splitted[index]}`);
        }
      }
    });

    result = result.concat(",");
    console.log(result);
    return result;
  }
}
