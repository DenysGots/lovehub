import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationFullComponent } from './components/registration-full/registration-full.component';

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'contact', component: ContactComponent },
  { path: 'search', component: UserSearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'register-full', component: RegistrationFullComponent},
];
