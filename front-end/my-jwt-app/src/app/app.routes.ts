import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/posts/posts.component').then((m) => m.PostsComponent),
  },
  {
    path: 'setting',
    loadComponent: () =>
      import('./features/setting/setting.component').then(
        (m) => m.SettingComponent
      ),
  },
];
