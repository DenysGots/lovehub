import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routing';

import { UsersService } from './services/users.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { UserFilterComponent } from './components/user-filter/user-filter.component';
import {LoginComponent} from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationService } from './services/navigation.service';
import { LoginService } from './services/login.service';
import { FooterComponent } from './components/footer/footer.component';

// test

import { IUserStorage } from './services/IUserStorage';
import { UserLocalStorageService } from './services/user-local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HomeComponent,
    UserSearchComponent,
    UserFilterComponent,
    SidebarMenuComponent,
    HeaderComponent,
    FooterComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'nestJS' }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    })
  ],
  providers: [UsersService, NavigationService, LoginService,
    { provide: 'IUserStorage', useClass: UserLocalStorageService}],
  bootstrap: [AppComponent]
})
export class AppModule { }
