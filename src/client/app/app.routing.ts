import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserMatchComponent } from './components/user-match/user-match.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationFullComponent } from './components/registration-full/registration-full.component';
import { PhotosComponent } from './components/photos/photos.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import {ForbiddenComponent} from './components/forbidden/forbidden.component';
import { AdministratorUsersManagementComponent } from './components/administrator/administrator-users-management/administrator-users-management.component';

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'contact', component: ContactComponent },
  { path: 'search', component: UserSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-match', component: UserMatchComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'register-full', component: RegistrationFullComponent},
  { path: 'photo', component: PhotosComponent},
  { path: 'profile', component: ProfilePageComponent},
  { path: 'admin', component: AdministratorUsersManagementComponent,
    children: [{
      path: 'users-management' , component: AdministratorUsersManagementComponent
    }]
  }
];
