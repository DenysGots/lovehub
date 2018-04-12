import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { UserMatchComponent } from './components/user-match/user-match.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationFullComponent } from './components/registration-full/registration-full.component';
import { PhotosComponent } from './components/photos/photos.component';
import { ProfilePageComponent } from './components/profile-page/profile-page.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChatComponent } from './components/chat/chat.component';
import { AdministratorDashboardComponent } from './components/administrator/administrator-dashboard/administrator-dashboard.component';
import { AdministratorUsersManagementComponent } from './components/administrator/administrator-users-management/administrator-users-management.component';
import { AdministratorSearchComponent } from './components/administrator/administrator-search/administrator-search.component';
import { AdministratorSendEmailComponent } from './components/administrator/administrator-send-email/administrator-send-email.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthProfileGuardService } from './services/auth-profile-guard.service';

export const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'contact', component: ContactComponent },
  { path: 'search', component: UserSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent},
  { path: 'register-full', component: RegistrationFullComponent},
  { path: 'photo', component: PhotosComponent},
  { path: 'profile/:id', canActivate: [AuthProfileGuardService], component: ProfilePageComponent},
  { path: 'admin', canActivate: [ AuthGuard ],
    children: [
      { path: '', component: AdministratorDashboardComponent },
      { path: 'users-management', component: AdministratorUsersManagementComponent },
      { path: 'search', component: AdministratorSearchComponent },
      { path: 'email', component: AdministratorSendEmailComponent }
    ]
  },
  { path: 'chat', component: ChatComponent },
  { path: 'forgot', component:  RecoverPasswordComponent},
  { path: 'forgot/:token', component: ResetPasswordComponent},
  { path: 'user-match', component: UserMatchComponent, canActivate: [ AuthGuard ] },
];
