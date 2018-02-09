import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { RegistrationComponent } from './components/registration/registration.component';

import { routes } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'nestJS' }),
    HttpClientModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
