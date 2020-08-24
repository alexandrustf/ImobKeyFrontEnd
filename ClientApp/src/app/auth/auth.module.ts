import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth/auth.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { RegisterFormComponent } from "./register-form/register-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AuthComponent, LoginFormComponent, RegisterFormComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
