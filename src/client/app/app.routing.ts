import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

export const routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'about'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  }
];
