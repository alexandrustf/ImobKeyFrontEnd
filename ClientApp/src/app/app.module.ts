import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { HomeComponent } from "./home/home.component";
import { AppRoutingModule } from "./app-routing.module";
import { MatPaginatorModule } from "@angular/material/paginator";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ApartmentDetailComponent } from "./apartment-detail/apartment-detail/apartment-detail.component";
import { AddApartmentModule } from "./add-apartment/add-apartment.module";
import { AddApartmentComponent } from "./add-apartment/add-apartment/add-apartment.component";
import { ApartmentDetailModule } from "./apartment-detail/apartment-detail.module";
import { ApartmentsListModule } from "./apartments-list/apartments-list.module";
import { ApartmentsListComponent } from "./apartments-list/apartments-list/apartments-list.component";
import { PerfectHomeComponent } from "./perfect-home/perfect-home/perfect-home.component";
import { PerfectHomeModule } from "./perfect-home/perfect-home.module";
import { AuthComponent } from "./auth/auth/auth.component";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./shared/guards/auth.guard";
import { AuthService } from "./shared/services/auth.service";
import { JwtInterceptor } from "./shared/interceptors/jwt.interceptor";
import { FavoriteApartmentsListComponent } from "./my-account/favorite-apartments-list/favorite-apartments-list.component";
import { MyAccountModule } from "./my-account/my-account.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatListModule } from '@angular/material/list';
import { NavListComponent } from "./nav-list/nav-list.component";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [AppComponent, NavMenuComponent, HomeComponent, NavListComponent, FooterComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FlexLayoutModule,
    MatListModule,
    RouterModule.forRoot([
      {
        path: "",
        component: HomeComponent,
        pathMatch: "full",
      },
      { path: "add-apartment", component: AddApartmentComponent },
      {
        path: "apartments-rent/detail/:id",
        component: ApartmentDetailComponent,
      },
      { path: "apartments-rent", component: ApartmentsListComponent },

      { path: "perfect-home", component: PerfectHomeComponent },
      { path: "my-account", component: AuthComponent },
      {
        path: "favorite-apartments",
        component: FavoriteApartmentsListComponent,
        canActivate: [AuthGuard],
      },
    ]),
    AppRoutingModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    ApartmentsListModule,
    ApartmentDetailModule,
    AddApartmentModule,
    PerfectHomeModule,
    AuthModule,
    MyAccountModule,
    MatToolbarModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
