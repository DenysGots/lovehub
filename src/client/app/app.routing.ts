import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import {LoginComponent} from './components/login/login.component';

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
    path: 'login',
    component: LoginComponent
  }
];
