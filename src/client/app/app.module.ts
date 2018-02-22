import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { routes } from './app.routing';

import { HomeService }   from './services/home.service';
import { WindowService } from './services/window.service';
import { UsersService } from './services/users.service';
import { UsersProfileService } from './services/users-profile.service';
import { RequestCache, RequestCacheWithMap } from './services/request-cashe.service';
import { httpInterceptorProviders } from './http-interceptors';

import { UsersProfileOrderByPipe } from './pipes/users-profile-orderby.pipe';

import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { UserFilterComponent } from './components/user-filter/user-filter.component';
import { HeaderComponent } from './components/header/header.component';
import { NavigationService } from './services/navigation.service';
import { FooterComponent } from './components/footer/footer.component';
import { SliderComponent } from './components/home-slider/slider.component';
import { PagerComponent } from './components/pager/pager.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    HomeComponent,
    UserSearchComponent,
    UserFilterComponent,
    SidebarMenuComponent,
    HeaderComponent,
    FooterComponent,
    SliderComponent,
    PagerComponent,
    UserProfileComponent,
    UsersProfileOrderByPipe
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'nestJS' }),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    })
  ],
  providers: [
    NavigationService,
    HomeService,
    WindowService,
    UsersService,
    UsersProfileService,
    { provide: RequestCache, useClass: RequestCacheWithMap },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
