import { Routes } from '@angular/router';
import { PostListComponent } from './posts/post-list/post-list.component';
import { PostDetailsComponent } from './posts/post-details/post-details.component';
import { SignOutComponent } from './users/sign-out/sign-out.component';
import { AuthComponent } from './auth/auth.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PostListComponent },
  { path: 'signout', component: SignOutComponent },
  { path: 'search', component: PostListComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'post/:reference', component: PostDetailsComponent }
];
