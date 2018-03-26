import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserMatchComponent } from './components/user-match/user-match.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationFullComponent } from './components/registration-full/registration-full.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import { ChatComponent } from './components/chat/chat.component';
import {ForbiddenComponent} from './components/forbidden/forbidden.component';
import { AdministratorDashboardComponent } from './components/administrator/administrator-dashboard/administrator-dashboard.component';
import { AdministratorUsersManagementComponent } from './components/administrator/administrator-users-management/administrator-users-management.component';
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
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-match', component: UserMatchComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'register-full', component: RegistrationFullComponent },
  { path: 'admin', canActivate: [ AuthGuard ],
    children: [
      { path: '', component: AdministratorDashboardComponent },
      { path: 'users-management', component: AdministratorUsersManagementComponent }
    ]
  },
  { path: 'chat', component: ChatComponent },
  { path: 'forgot', component:  RecoverPasswordComponent},
  { path: 'forgot/:token', component: ResetPasswordComponent},
  { path: 'user-profile', canActivate: [AuthProfileGuardService], component: UserProfileComponent},
  { path: 'user-match', canActivate: [ AuthGuard ], component: UserMatchComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'register-full', component: RegistrationFullComponent},
  { path: 'logout', component: LogoutComponent },
];
