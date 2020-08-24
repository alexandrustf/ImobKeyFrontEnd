import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AuthenticationToken } from "../models/authentication-token.model";
import { environment } from "src/environments/environment";
import { User } from "../models/user.model";
@Injectable({ providedIn: "root" })
export class AuthService {
  protected static expiresAtKey: string = "expiresAt";
  protected static tokenKey: string = "token";

  private currentUserSubject: BehaviorSubject<AuthenticationToken>;
  public currentUser: Observable<AuthenticationToken>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<AuthenticationToken>(
      JSON.parse(localStorage.getItem("currentUser"))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthenticationToken {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string): Observable<AuthenticationToken> {
    return this.http
      .post<any>(`${environment.YourApartmentUrl}/users/authenticate`, {
        email,
        password,
      })
      .pipe(
        map((authToken) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.storeToken(authToken);
          this.currentUserSubject.next(authToken);
          return authToken;
        })
      );
  }
  private storeToken(token: AuthenticationToken): void {
    localStorage.setItem(AuthService.expiresAtKey, token.expiresAt);
    localStorage.setItem(AuthService.tokenKey, token.token);
  }

  logout() {
    console.log('-----se face logout')
    localStorage.removeItem("currentUser");
    localStorage.clear();
    this.currentUserSubject.next(null);
  }

  register(user: User) {
    return this.http.post(
      `${environment.YourApartmentUrl}/users/register`,
      user
    );
  }

  public tokenExists(): boolean {
    return !!localStorage.getItem(AuthService.tokenKey);
  }

  public getToken(): string {
    return localStorage.getItem(AuthService.tokenKey);
  }
}
