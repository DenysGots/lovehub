import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import {LoginComponent} from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';

import {UserSearchComponent} from './components/user-search/user-search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about' },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'search', component: UserSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent }
];
