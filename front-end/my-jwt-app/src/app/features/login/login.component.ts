import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { BaseComponent } from "../../bases/base-component.component";
import { AuthService } from "../../services/auth.service";
import { LoginFacade } from "./login.facade";

@Component({
    selector: 'app-login',
    templateUrl: `./login.component.html`,
    styleUrls: ['./login.component.scss'],
    standalone: true,
    imports: [BaseComponent, ReactiveFormsModule],
    providers: [LoginFacade, AuthService],
})
export class LoginComponent extends BaseComponent {

    private readonly fb = inject(FormBuilder);
    private readonly loginFacade = inject(LoginFacade);

    constructor() {
        super();
    }

    readonly formLogin = this.fb.group({
        username: '',
        password: ''
    });

    login(){
        this.loginFacade.logIn(this.formLogin.value.username, this.formLogin.value.password);
    }
}