import { Component, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";
import { AuthenticationToken } from "../shared/models/authentication-token.model";

@Component({
  selector: "app-nav-menu",
  templateUrl: "./nav-menu.component.html",
  styleUrls: ["./nav-menu.component.scss"],
})
export class NavMenuComponent {
  @Output() public sidenavToggle = new EventEmitter();
  isExpanded = false;
  currentUser: AuthenticationToken;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.currentUser.subscribe((x) => (this.currentUser = x));
  }
  logout() {
    this.authService.logout();
    this.router.navigate(["/my-account"]);
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}
