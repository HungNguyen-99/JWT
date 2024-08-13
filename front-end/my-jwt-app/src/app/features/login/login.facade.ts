import { inject, Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { AuthService } from "../../services/auth.service";


export interface ILoginState {
    message: string;
    accessToken: string;
    refreshToken: string;
}

const initialState: ILoginState = {
    message: '',
    accessToken: '',
    refreshToken: ''
}

@Injectable()
export class LoginFacade extends ComponentStore<ILoginState> {
    private readonly authService = inject(AuthService);
    constructor(){
        super(initialState);
    }

    logIn(username: string | null | undefined, password: string | null | undefined) {
        if(!username || !password) return;
        this.authService.login(username, password).subscribe({
            next: (data) => {
                localStorage.setItem('accessToken', data.accessToken);
            },
            error: (err) => {
                console.log(err);
            }
        })
    }
}