import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";
import { AuthenticationToken } from "../shared/models/authentication-token.model";

@Component({
  selector: "app-nav-list",
  templateUrl: "./nav-list.component.html",
  styleUrls: ["./nav-list.component.scss"],
})
export class NavListComponent implements OnInit {
  currentUser: AuthenticationToken;
  onSidenavClose;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/my-account"]);
  }

  ngOnInit() {}
}
