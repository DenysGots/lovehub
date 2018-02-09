import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import {UserSearchComponent} from './components/user-search/user-search.component';
import { RegistrationComponent } from './components/registration/registration.component';

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
    path: 'register',
    component: RegistrationComponent
  },
  {
    path: 'search', component: UserSearchComponent
  }
];
