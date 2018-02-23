import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routing';

import { UsersService } from './services/users.service';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { SidebarMenuComponent } from './components/sidebar-menu/sidebar-menu.component';
import { UserFilterComponent } from './components/user-filter/user-filter.component';
import {UserMatchComponent} from './components/user-match/user-match.component';
import {AgmCoreModule} from '@agm/core';
import {MatchingService} from './services/matching.service';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    UserSearchComponent,
    UserFilterComponent,
    SidebarMenuComponent,
    UserProfileComponent,
    UserMatchComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'nestJS' }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCdhaZA2fOUM-rLoI95dNDssEdiaGiLDtM'
    })
  ],
  providers: [UsersService, MatchingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
