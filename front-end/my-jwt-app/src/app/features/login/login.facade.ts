import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export interface ILoginState {
  message: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: ILoginState = {
  message: '',
  accessToken: '',
  refreshToken: '',
};

@Injectable()
export class LoginFacade extends ComponentStore<ILoginState> {
  private readonly authService = inject(AuthService);
  private router = inject(Router);
  constructor() {
    super(initialState);
  }

  logIn(username?: string | null, password?: string | null) {
    username &&
      password &&
      this.authService.login(username, password).subscribe({
        next: (data) => {
          localStorage.setItem('accessToken', data.accessToken);
          this.router.navigate(['/posts']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
