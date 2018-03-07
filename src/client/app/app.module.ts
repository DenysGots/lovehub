import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routing';

import { HomeService } from './services/home.service';
import { WindowService } from './services/window.service';
import { UsersService } from './services/users.service';
import { UsersProfileService } from './services/users-profile.service';
import { RequestCache, RequestCacheWithMap } from './services/request-cashe.service';
import { httpInterceptorProviders } from './http-interceptors';

import { UsersProfileOrderByPipe } from './pipes/users-profile-orderby.pipe';

import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { RegistrationFullComponent } from './components/registration-full/registration-full.component';
import { Step0Component } from './components/registration-full/step0/step0.component';
import { Step1Component } from './components/registration-full/step1/step1.component';
import { Step2Component } from './components/registration-full/step2/step2.component';
import { Step3Component } from './components/registration-full/step3/step3.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { UserFilterComponent } from './components/user-filter/user-filter.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationService } from './services/navigation.service';
import { LoginService } from './services/login.service';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/home-slider/slider.component';
import { PagerComponent } from './components/pager/pager.component';

import {UserMatchComponent} from './components/user-match/user-match.component';
import {AgmCoreModule} from '@agm/core';
import {MatchingService} from './services/matching.service';

import { PhotosService } from './services/photos.service';
import { PhotosComponent } from './components/photos/photos.component';

// test

import { IUserStorage } from './services/IUserStorage';
import { UserLocalStorageService } from './services/user-local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    RegistrationFullComponent,
    Step0Component,
    Step1Component,
    Step2Component,
    Step3Component,
    UserSearchComponent,
    UserFilterComponent,
    SidebarMenuComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    PagerComponent,
    UserProfileComponent,
    UsersProfileOrderByPipe,
    UserMatchComponent,
    PhotosComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'nestJS' }),
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdhaZA2fOUM-rLoI95dNDssEdiaGiLDtM'
    })
  ],
  providers: [
    PhotosService,
    NavigationService,
    HomeService,
    LoginService,
    WindowService,
    UsersService,
    UsersProfileService,
    MatchingService,
    { provide: 'IUserStorage', useClass: UserLocalStorageService},
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
