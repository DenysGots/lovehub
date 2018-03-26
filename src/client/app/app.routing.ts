import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserMatchComponent} from './components/user-match/user-match.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationFullComponent } from './components/registration-full/registration-full.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AuthGuard } from './services/auth-guard.service';
import { LogoutComponent } from './components/login/logout.component';
import { AuthProfileGuardService } from './services/auth-profile-guard.service';

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'contact', component: ContactComponent },
  { path: 'search', component: UserSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', canActivate: [AuthProfileGuardService], component: UserProfileComponent},
  { path: 'user-match', canActivate: [ AuthGuard ], component: UserMatchComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'register-full', component: RegistrationFullComponent},
  { path: 'logout', component: LogoutComponent },
];
